import React, { Component } from 'react';
import './subscriptionPaymentFields.css';
import Checkbox from 'rsuite/Checkbox';

export default class SubscriptionPaymentFields extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
        return <div className="component-subscription-payment-fields">
            <div className="row">
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="identifiant" className="form-label">Identifiant</label>
                        <input
                            type="text"
                            name='identifiant'
                            className={`form-control`}
                            id="identifiant"
                            value={this.props.subscription.number}
                            disabled
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="redevance_mensuel" className="form-label">Redevance mensuel</label>
                        <div className="price-input">
                            <input
                                type="text"
                                name='redevance_mensuel'
                                className={`form-control`}
                                id="redevance_mensuel"
                                value={Intl.NumberFormat('fr-FR').format(parseInt(this.props.subscription.offer.monthly_payment))}
                                disabled
                            />
                            <span>FCFA</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="timbre" className="form-label">Timbre</label>
                        <div className="price-input">
                            <input
                                type="text"
                                name='timbre'
                                className={`form-control`}
                                id="timbre"
                                value={Intl.NumberFormat('fr-FR').format(parseInt(this.props.subscription.offer.stamp))}
                                disabled
                            />
                            <span>FCFA</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-1">
                    <div className="form-group">
                        <label htmlFor="frais_installation" className="form-label">
                            Frais d'installation
                            <span className='ms-auto'>
                                <Checkbox
                                    className='checkbox-subscription'
                                    checked={this.props.installationCostStatus}
                                    onChange={(value) => this.props.handleInstallationCostStatus(value)}
                                    value={this.props.installationCostStatus}
                                />
                            </span>
                        </label>

                        <div className="price-input">
                            <input
                                type="text"
                                name='frais_installation'
                                className={`form-control`}
                                id="frais_installation"
                                value={Intl.NumberFormat('fr-FR').format(parseInt(this.props.installationCost))}
                                disabled
                            />
                            <span>FCFA</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Montant total</td>
                            <td className='text-right fw-600'>{Intl.NumberFormat('fr-FR').format(parseInt(this.props.totalMount))}{' '}FCFA</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
