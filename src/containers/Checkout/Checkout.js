import React , { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';



class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    } 
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return (
            <div>
                <CheckoutSummary 
                ingredients= {this.props.ings}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinue = {this.checkoutContinueHandler}
                
                />
                <Route path={this.props.match.path + '/contact-data'} 
                component = {ContactData} />
            </div>
        )
    }
}

const mapStateToProp = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProp)(Checkout);