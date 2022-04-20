import React, { Component } from 'react';
import './subscriptionRecapitulatif.css';

export default class SubscriptionRecapitulatif extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
        return <div className="component-subscription-recapitulatif">
            <p className='title-step'>Récapitulatif</p>
            <table className="table table-recapitulatif">
                <tbody>
                    {this.props.subscription.civility ?
                        <tr>
                            <td className='fw-600'>Civilité</td>
                            <td className='text-capitalize value'>{this.props.subscription.civility}</td>
                        </tr> : null
                    }
                    {this.props.subscription.firstname ?
                        <tr>
                            <td className='fw-600'>Nom</td>
                            <td className='text-capitalize value'>{this.props.subscription.firstname}</td>
                        </tr> : null
                    }
                    {this.props.subscription.lastname ?
                        <tr>
                            <td className='fw-600'>Prénom</td>
                            <td className='text-capitalize value'>{this.props.subscription.lastname}</td>
                        </tr> : null
                    }
                    {this.props.subscription.social_reason ?
                        <tr>
                            <td className='fw-600'>Raison Social</td>
                            <td className='text-capitalize value'>{this.props.subscription.social_reason}</td>
                        </tr> : null
                    }
                    {this.props.subscription.ninea ?
                        <tr>
                            <td className='fw-600'>Ninea</td>
                            <td className='text-capitalize value'>{this.props.subscription.ninea}</td>
                        </tr> : null
                    }
                    {this.props.subscription.commercial_register_number ?
                        <tr>
                            <td className='fw-600'>Numéro du registre de commerce</td>
                            <td className='text-capitalize value'>{this.props.subscription.commercial_register_number}</td>
                        </tr> : null
                    }
                    {this.props.subscription.commercial_register_file ?
                        <tr>
                            <td className='fw-600'>Registre de commerce</td>
                            <td className='text-capitalize value'>{this.props.subscription.commercial_register_file_name}</td>
                        </tr> : null
                    }
                    <tr>
                        <td className='fw-600'>Zone</td>
                        <td className='text-capitalize value'>{this.props.subscription.zone_ref}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Adresse</td>
                        <td className='text-capitalize value'>{this.props.subscription.address}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Plaque</td>
                        <td className='text-capitalize value'>{this.props.subscription.building_name}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Offre</td>
                        <td className='text-capitalize value'>{this.props.subscription.offer_name}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Téléphone</td>
                        <td>+{this.props.subscription.phone_number_formated}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Adresse e-mail</td>
                        <td className='text-capitalize value'>{this.props.subscription.email}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Photo du contrat</td>
                        <td className='text-capitalize value'>{this.props.subscription.contract_photo_filename}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Type de pièce</td>
                        <td className='text-capitalize value'>{this.props.subscription.identity_type}</td>
                    </tr>
                    <tr>
                        <td className='fw-600'>Numero pièce</td>
                        <td className='text-capitalize value'>{this.props.subscription.identity_number}</td>
                    </tr>
                    {this.props.subscription.cni_compte ?
                        <tr>
                            <td className='fw-600'>CNI compte</td>
                            <td className='text-capitalize value'>{this.props.subscription.cni_compte}</td>
                        </tr> : null
                    }
                    <tr>
                        <td className='fw-600'>{this.props.subscription.identity_type === "cni" ? "Pièce d'identité(recto)" : "Passeport"}</td>
                        <td className='text-capitalize value'>{this.props.subscription.identity_photo_recto_filename}</td>
                    </tr>
                    {this.props.subscription.identity_photo_verso_filename && this.props.subscription.identity_photo_verso_filename !== "Choisir un fichier" ?
                        <tr>
                            <td className='fw-600'>Pièce d'identité(verso)</td>
                            <td className='text-capitalize value'>{this.props.subscription.identity_photo_verso_filename}</td>
                        </tr> : null
                    }
                    <tr>
                        <td className='fw-600'>Moyen de paiement</td>
                        <td className='text-capitalize value'>{this.props.subscription.payment_method}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}
