import React, { Component } from 'react';
import './subscriptionPaymentKeypad.css';
import FreemoneyIcon from '../../images/freemoney.png';
import { FiDelete } from 'react-icons/fi';

export default class SubscriptionPaymentKeypad extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.onGetRandomKeypad()
    }

    render() {
        return <div className="component-subscription-payment-keypad">
            <div className={`random-numpad-container`}>
                <img src={FreemoneyIcon} alt="Free money" />
                <p className='random-numpad-message'>Veuillez renseigner votre code secret Free money</p>
                <div className="mt-4 mb-4 password-keypad-value-container">
                    <input type="password" className='password-keypad-value' value={this.props.secretCodeArrayValue[0] === 0 ? 0 : this.props.secretCodeArrayValue[0] || ""} readOnly />
                    <input type="password" className='password-keypad-value' value={this.props.secretCodeArrayValue[1] === 0 ? 0 : this.props.secretCodeArrayValue[1] || ""} readOnly />
                    <input type="password" className='password-keypad-value' value={this.props.secretCodeArrayValue[2] === 0 ? 0 : this.props.secretCodeArrayValue[2] || ""} readOnly />
                    <input type="password" className='password-keypad-value' value={this.props.secretCodeArrayValue[3] === 0 ? 0 : this.props.secretCodeArrayValue[3] || ""} readOnly />
                </div>
                <div className='btn-random-keypad-container'>
                    {this.props.randomKeyboard.map((value, index) => (
                        <button
                            key={index}
                            onClick={(e) => this.props.handleChangeSecretCode(e, index)}
                            className='btn-random-keypad'
                        >
                            {value}
                        </button>
                    ))}
                    <button className='btn-random-keypad' onClick={(e) => this.props.onEraseSecretCode(e)}><FiDelete /></button>
                </div>
            </div>
        </div>;
    }
}
