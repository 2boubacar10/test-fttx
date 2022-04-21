import React, { Component } from 'react';
import './prepaymentSubscriptionRecapitulatif.css';

export default class PrepaymentSubscriptionRecapitulatif extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    render() {
        return <div className="component-prepayment-subscription-recapitulatif">
            <table className="table table-recapitulatif">
                <tbody>
                    <tr>
                        <td className='fw-600'>Civilité</td>
                        <td>{this.props.subscription.civility}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Nom</td>
                        <td>{this.props.subscription.firstname}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Prénom</td>
                        <td>{this.props.subscription.lastname}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Zone</td>
                        <td>{this.props.subscription.zone_ref}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Adresse</td>
                        <td>{this.props.subscription.address}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Plaque</td>
                        <td>{this.props.subscription.building_name}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Offre</td>
                        <td>{this.props.subscription.offer_name}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Téléphone</td>
                        <td>+{this.props.subscription.phone_number_formated}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Adresse e-mail</td>
                        <td>{this.props.subscription.email}</td>
                    </tr>
                    {/* <tr>
                        <td className='fw-600'>Photo du contrat</td>
                        <td>{this.props.subscription.contract_photo}</td>
                    </tr> */}
                    <tr>
                        <td className='fw-600'>Type de pièce</td>
                        <td>{this.props.subscription.identity_type}</td>
                    </tr>
                    {/* <tr>
                        <td className='fw-600'>Pièce d'identité</td>
                        <td>{this.props.subscription.identity_photo}</td>
                    </tr> */}
                    <tr>
                        <td className='fw-600'>Moyen de paiement</td>
                        <td>{this.props.subscription.payment_method}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}
