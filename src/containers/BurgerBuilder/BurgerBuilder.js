import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Aux/aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component {
  
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    axios.get('https://react-burger-builder-8b6bb.firebaseio.com/ingredients.json')
  .then(response => {
    this.setState({ingredients: response.data});
  })
  .catch(error => {
    this.setState({error: true});
  })
  }

  updatePurchaseState (ingredients) {
    // console.log(ingredients);
    const sum = Object.keys(ingredients)
        .map(igKey => {
            // console.log(ingredients[igKey]);
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);
        return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  purchaseContinueHandler =() =>{
    this.props.history.push('/checkout');
  }
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded :( </p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
                  ingredientAdded={this.props.onAddIngredient}
                  ingredientRemoved={this.props.onRemoveIngredient}
                  disabled={disabledInfo}
                  price={this.props.price}
                  purchasable = {this.updatePurchaseState(this.props.ings)}
                  ordered = {this.purchaseHandler}
          />
      </Aux>
      );
      orderSummary = <OrderSummary 
            price = {this.props.price}
            ingredients = {this.props.ings}
            purchaseCancel = {this.purchaseCancelHandler}
            purchaseContinue = {this.purchaseContinueHandler}
          />
    };
     
    if(this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}> 
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToprops = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToprops,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
