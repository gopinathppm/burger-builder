import React , { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state ={
           orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value : '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest' , displayValue: 'Fastest'},
                        {value: 'cheapest' , displayValue: 'Cheapest'},
                    ]
                },
                value : '',
                validation: {},
                valid: true,
                touched: false
            }
           },
            formIsValid: false,
            loading: false
        }
    
    OrderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const orders = {
    price: this.props.price,
    ingredients: this.props.ingredients,
    orderData: formData
    }
    console.log('orders:' , orders);
    axios.post('/orders.json',orders)
    .then(response => this.setState({loading: false}))
    .catch(error => this.setState({loading: false}));

    this.props.history.push('/');
    }

    checkValidity (value, rules) {

        if(!rules) {
            return true;
        }

        // console.log("value, rules" , value , rules);
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        // console.log("isValid:" , isValid);
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        // console.log("inputIdentifier", inputIdentifier);
        const updatedForm = {
            ...this.state.orderForm
        }
        // console.log("updatedForm", updatedForm);
        const updatedElement = {
            ...updatedForm[inputIdentifier]
        }
        // console.log("updatedElement", updatedElement)
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;

        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        console.log("formIsValid", formIsValid);
        updatedForm[inputIdentifier] = updatedElement;
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
    }

    render(){
        const formElementsArray =[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.OrderHandler}>              
                {formElementsArray.map(formElement =>
                    <Input 
                        key={formElement.id}
                        elementType= {formElement.config.elementType}
                        elementConfig= {formElement.config.elementConfig}
                        value= {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        touched = {formElement.config.touched}
                        shouldValidate = {formElement.config.validation}
                        valueType = {formElement.config.elementConfig.placeholder}
                        changed= {(event) => this.inputChangeHandler(event, formElement.id)}/>
                    )}
                <Button btnType = "Success" disabled = {!this.state.formIsValid}>Order</Button>
            </form>);
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h1> Enter your contact details</h1>
                {form}
            </div>
        )
    }
}
export default ContactData;