import React, { Component } from 'react';
import './subscriptionPaymentKeypad.css';
import RandomNumpad from "react-random-numpad";

export default class SubscriptionPaymentKeypad extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
        return <div className="component-subscription-payment-keypad">
            <div className="mt-4 mb-3">
                <input type="password" className='form-control password-keypad-value' value={this.props.secretCodeValue} disabled />
            </div>

            <div className={`random-numpad-container`}>
                <RandomNumpad
                    supportDecimal={false}
                    onChange={(e) => this.props.handleChangeSecretCode(e)}
                    classNames="custom-class"
                />
            </div>
        </div>;
    }
}
