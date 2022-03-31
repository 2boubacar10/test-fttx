import React, { Component } from 'react';
import './subscriptionPaymentRecapitulatif.css';

export default class SubscriptionPaymentRecapitulatif extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
        return <div className="component-subscription-payment-recapitulatif">
            <table className="table">
                <tbody>
                    <tr>
                        <td>Identifiant</td>
                        <td className='text-right fw-600'>{this.props.subscription.offer.number}</td>
                    </tr>
                    <tr>
                        <td>Redevance mensuel</td>
                        <td className='text-right fw-600'>{Intl.NumberFormat('fr-FR').format(parseInt(this.props.subscription.offer.monthly_payment))}{' '}FCFA</td>
                    </tr>
                    <tr>
                        <td>Timbre</td>
                        <td className='text-right fw-600'>{Intl.NumberFormat('fr-FR').format(parseInt(this.props.subscription.offer.stamp))}{' '}FCFA</td>
                    </tr>
                    <tr>
                        <td>Frais d'installation</td>
                        <td className='text-right fw-600'>{Intl.NumberFormat('fr-FR').format(parseInt(this.props.installationCost))}{' '}FCFA</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Montant total</td>
                        <td className='text-right fw-600'>{Intl.NumberFormat('fr-FR').format(parseInt(this.props.totalMount))}{' '}FCFA</td>
                    </tr>
                </tfoot>
            </table>
        </div>;
    }
}