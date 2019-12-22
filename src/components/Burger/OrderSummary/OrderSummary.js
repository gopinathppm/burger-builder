import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';



class OrderSummary extends Component {
    // componentWillUpdate(){
    //     console.log("[OrderSummary] componentWillUpdate");
    // }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
                    .map(igKey => {
                        return (
                        <li key= {igKey}>
                            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                        </li>
                        );
                    });

        return (
            <Aux>
                <div className = {classes.Ordersummary}>
                <h3>Your Order Summary:</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Ready to order?</p>
                <Button btnType = "Danger" clicked = {this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType = "Success" clicked = {this.props.purchaseContinue}>CONTINUE</Button>
                </div>
            </Aux>
        )
    }
    
}

export default OrderSummary;