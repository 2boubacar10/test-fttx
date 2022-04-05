import React, { Component } from 'react';
import './subscriptionPaymentFields.css';
import Checkbox from 'rsuite/Checkbox';
import PhoneInput from 'react-phone-input-2';

export default class SubscriptionPaymentFields extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChangeCustomerPhone = this.handleChangeCustomerPhone.bind(this);
    }

    handleChangeCustomerPhone = (phone_number, data, event, formattedValue) => {
        this.props.onSetCustomerPhone(phone_number, data);
    }

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
            <div className="col-sm-6 mb-4">
                <div className="form-group">
                    <label htmlFor="phone_number" className="form-label">Téléphone</label>
                    <PhoneInput
                        country={'sn'}
                        onlyCountries={['sn']}
                        regions={['africa']}
                        countryCodeEditable={false}
                        defaultMask={'.. ... .. ..'}
                        placeholder={"Numéro de téléphone Free Money"}
                        value={this.props.paymentData.customer_number}
                        onChange={this.handleChangeCustomerPhone}
                        inputProps={{
                            name: 'phone_number',
                            required: true,
                        }}
                        className={`phone-input-custom ${this.props.is_empty_customer_number || this.props.no_correct_format_customer_number ? 'is-invalid-custom' : ""}`}
                    />
                    {this.props.is_empty_customer_number && <span className='badge bg-danger'>Veuillez renseigner le numéro Free Money du client!</span>}
                    {this.props.no_correct_format_customer_number && <span className='badge bg-danger'>Le numéro renseigné n'est pas au bon format!</span>}

                </div>
            </div>
        </div>;
    }
}
