import React, { Component } from 'react';
import './subscriptionDetailsRows.css';

export default class SubscriptionDetailsRows extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
        let subscription = this.props.subscription

        return <div className="component-subscription-details-rows">
            <table className="table table-striped table-customer-subscription-details">
                <tbody>
                    <tr>
                        <td className='fw-600'>Numéro de la demande</td>
                        <td className='text-capitalize td-value'>{subscription.number}</td>
                    </tr>
                    {subscription.civility ?
                        <tr>
                            <td className='fw-600'>Civilité</td>
                            <td className='text-capitalize td-value'>{subscription.civility}</td>
                        </tr> : null
                    }
                    {subscription.firstname ?
                        <tr>
                            <td className='fw-600'>Nom</td>
                            <td className='text-capitalize td-value'>{subscription.firstname}</td>
                        </tr> : null
                    }
                    {subscription.lastname ?
                        <tr>
                            <td className='fw-600'>Prénom</td>
                            <td className='text-capitalize td-value'>{subscription.lastname}</td>
                        </tr> : null
                    }
                    {subscription.social_reason ?
                        <tr>
                            <td className='fw-600'>Raison Social</td>
                            <td className='text-capitalize td-value'>{subscription.social_reason}</td>
                        </tr> : null
                    }
                    {subscription.ninea ?
                        <tr>
                            <td className='fw-600'>Ninea</td>
                            <td className='text-capitalize td-value'>{subscription.ninea}</td>
                        </tr> : null
                    }
                    {subscription.commercial_register_number ?
                        <tr>
                            <td className='fw-600'>Numéro du registre de commerce</td>
                            <td className='text-capitalize td-value'>{subscription.commercial_register_number}</td>
                        </tr> : null
                    }
                    {subscription.commercial_register_url ?
                        <tr>
                            <td className='fw-600'>Registre de commerce</td>
                            <td className='text-capitalize td-value'><span className="badge bg-success">Disponible</span></td>
                        </tr> : null
                    }
                    <tr>
                        <td className='fw-600'>Zone</td>
                        <td className='text-capitalize td-value'>{subscription.zone ? subscription.zone.ref : subscription.zone_id}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Adresse</td>
                        <td className='text-capitalize td-value'>{subscription.address}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Plaque</td>
                        <td className='text-capitalize td-value'>{subscription.building ? subscription.building.name : subscription.building_id}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Offre</td>
                        <td className='text-capitalize td-value'>{subscription.offer ? subscription.offer.name : subscription.offer_id}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Téléphone</td>
                        <td>+{subscription.phone_number}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Adresse e-mail</td>
                        <td className='text-capitalize td-value'>{subscription.email}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Photo du contrat</td>
                        <td className='text-capitalize'>
                            <span className={`badge ${subscription.contract_photo_url ? "bg-success" : "bg-danger"}`}>{subscription.contract_photo_url ? "Disponible" : "Non disponible"}</span>
                            {/* <div className='image-responsive image-thumbnail' style={{ background: `url(${subscription.contract_photo_url})` }}></div> */}
                        </td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Type de pièce</td>
                        <td className='text-capitalize td-value'>{subscription.identity_type}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>{subscription.identity_type === "cni" ? "Pièce d'identité(recto)" : "Passeport"}</td>
                        <td className='text-capitalize'>
                            <span className={`badge ${subscription.identity_photo_recto_url ? "bg-success" : "bg-danger"}`}>{subscription.identity_photo_recto_url ? "Disponible" : "Non disponible"}</span>
                            {/* <div className='image-responsive image-thumbnail' style={{ background: `url(${subscription.identity_photo_recto_url})` }}></div> */}
                        </td>
                    </tr>
                    {subscription.identity_photo_verso_url &&
                        <tr>
                            <td className='fw-600'>Pièce d'identité(verso)</td>
                            <td>
                                <span className={`badge ${subscription.identity_photo_verso_url ? "bg-success" : "bg-danger"}`}>{subscription.identity_photo_verso_url ? "Disponible" : "Non disponible"}</span>
                            </td>
                            {/* <td className='text-capitalize td-value'>{subscription.identity_photo_verso_url}</td> */}
                        </tr>
                    }
                    <tr>
                        <td className='fw-600'>Moyen de paiement</td>
                        <td className='text-capitalize td-value'>{subscription.payment_method}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}
