import React, { Component } from 'react';
import './postpaiedSubscriptionFields.css';
import { Radio, RadioGroup, SelectPicker, InputPicker } from 'rsuite';
import PhoneInput from 'react-phone-input-2';

export default class PostpaiedSubscriptionFields extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChangeSubscriptionPhone = this.handleChangeSubscriptionPhone.bind(this);
    }
    handleChangeSubscriptionPhone = (phone_number, data, event, formattedValue) => {
        this.props.onSetSubscriberPhone(phone_number, data);
    }
    render() {
        return <div className="component-postpaied-subscription-fields">
            <p className='title-step'>Informations de l'entreprise</p>
            <div className="row">
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="social_reason" className="form-label">Raison Social</label>
                        <input
                            type="text"
                            name='social_reason'
                            onChange={this.props.handleChangeSubscription}
                            className={`form-control ${this.props.is_empty_social_reason && 'is-invalid'}`}
                            id="social_reason"
                            value={this.props.subscription.social_reason}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="ninea" className="form-label">Ninea</label>
                        <input
                            type="text"
                            name='ninea'
                            onChange={this.props.handleChangeSubscription}
                            className={`form-control ${this.props.is_empty_ninea && 'is-invalid'}`}
                            id="ninea"
                            value={this.props.subscription.ninea}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="commercial_register_number" className="form-label">Numéro du registre de commerce</label>
                        <input
                            type="text"
                            name='commercial_register_number'
                            onChange={this.props.handleChangeSubscription}
                            className={`form-control ${this.props.is_empty_commercial_register_number && 'is-invalid'}`}
                            id="commercial_register_number"
                            value={this.props.subscription.commercial_register_number}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="commercial_register_file" className="form-label">Registre de commerce</label>
                        <div className={`custom-file ${this.props.is_empty_commercial_register_file && 'is-invalid'}`}>
                            <input
                                type="file"
                                name="commercial_register_file"
                                className={`custom-file-input`}
                                id="commercial_register_file"
                                onChange={this.props.handleChangeSubscriptionFile}
                                accept="image/*,.pdf"
                            />
                            <label className="custom-file-label" htmlFor="customFileInput">{this.props.subscription.commercial_register_file_name}</label>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="zone_id" className="form-label">Zone</label>
                        <SelectPicker
                            data={this.props.areas || []}
                            onSelect={this.props.handleChangeSelectArea}
                            name="zone_id"
                            labelKey="ref"
                            valueKey="id"
                            style={{ width: "100%" }}
                            className={`check-picker-custom-input ${this.props.is_empty_zone_id && 'is-invalid-custom'}`}
                            placeholder={'Séléctionner la zone'}
                            value={this.props.subscription.zone_id}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">Adresse</label>
                        <input
                            type="text"
                            name='address'
                            onChange={this.props.handleChangeSubscription}
                            className={`form-control ${this.props.is_empty_address && 'is-invalid'}`}
                            id="address"
                            value={this.props.subscription.address}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="building_id" className="form-label">Plaque</label>
                        <SelectPicker
                            disabled={this.props.buildings.length > 0 ? false : true}
                            data={this.props.buildings || []}
                            onSelect={(value, item) => {
                                let subscription = this.props.subscription
                                subscription['building_id'] = value;
                                subscription['building_name'] = item.name;

                                this.setState({ subscription })
                            }}
                            name="building_id"
                            labelKey="name"
                            valueKey="id"
                            style={{ width: "100%" }}
                            className={`check-picker-custom-input ${this.props.is_empty_building_id && 'is-invalid-custom'}`}
                            placeholder={'Séléctionner la plaque'}
                            value={this.props.subscription.building_id}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="offer_id" className="form-label">Offre</label>
                        <SelectPicker
                            data={this.props.offers || []}
                            onSelect={(value, item) => {
                                let subscription = this.props.subscription
                                subscription['offer_id'] = value;
                                subscription['offer_name'] = item.name;

                                this.setState({ subscription })
                            }}
                            name="offer_id"
                            labelKey="name"
                            valueKey="id"
                            style={{ width: "100%" }}
                            className={`check-picker-custom-input ${this.props.is_empty_offer_id && 'is-invalid-custom'}`}
                            placeholder={'Séléctionner l\'offre'}
                            value={this.props.subscription.offer_id}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="phone_number" className="form-label">Téléphone</label>
                        <PhoneInput
                            country={'sn'}
                            value={this.props.subscription.phone_number}
                            placeholder={"Numéro de téléphone professionnel"}
                            onChange={this.handleChangeSubscriptionPhone}
                            defaultMask={".. ... .. .."}
                            inputProps={{
                                name: 'phone_number',
                                required: true,
                            }}
                            className={`phone-input-custom ${this.props.is_empty_phone_number && 'is-invalid-custom'}`}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Adresse e-mail</label>
                        <input
                            type="email"
                            name='email'
                            onChange={this.props.handleChangeSubscription}
                            className={`form-control ${this.props.is_empty_email && 'is-invalid'}`}
                            id="email"
                            value={this.props.subscription.email}
                            required
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="photoContrat" className="form-label">Photo du contrat</label>
                        <div className={`custom-file ${this.props.is_empty_contract_photo && 'is-invalid'}`}>
                            <input
                                type="file"
                                name="contract_photo"
                                className={`custom-file-input`}
                                id="contract_photo"
                                onChange={this.props.handleChangeSubscriptionFile}
                                accept="image/*,.pdf"
                            />
                            <label className="custom-file-label" htmlFor="customFileInput">{this.props.subscription.contract_photo_filename}</label>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="identity_type" className="form-label">Pièce d'identité</label>
                        <RadioGroup
                            value={this.props.subscription.identity_type}
                            name="identity_type"
                            inline
                            onChange={(value) => {
                                let subscription = this.props.subscription
                                subscription['identity_type'] = value;
                                this.setState({ subscription })
                            }}
                        >
                            <Radio value="cni">Pièce d'identité</Radio>
                            <Radio value="passport">Passeport</Radio>
                        </RadioGroup>

                        <div className="form-group">
                            <label htmlFor="identity_number" className="form-label">Numéro pièce</label>
                            <input
                                type="text"
                                name='identity_number'
                                onChange={this.props.handleChangeSubscription}
                                className={`form-control ${this.props.is_empty_identity_number && 'is-invalid'}`}
                                id="identity_number"
                                value={this.props.subscription.identity_number}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="cni_compte" className="form-label">CNI compte</label>
                        <input
                            type="text"
                            name='cni_compte'
                            onChange={this.props.handleChangeSubscription}
                            className={`form-control`}
                            id="cni_compte"
                            value={this.props.subscription.cni_compte}
                        />
                    </div>
                </div>
                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <p>{this.props.subscription.identity_type === "cni" ? "Recto de la pièce" : "Photo du passeport"} </p>
                        <div className={`custom-file ${this.props.is_empty_identity_photo_recto && 'is-invalid'}`}>
                            <input
                                type="file"
                                name="identity_photo_recto"
                                className={`custom-file-input`}
                                id="identity_photo_recto"
                                onChange={this.props.handleChangeSubscriptionFile}
                                accept="image/*,.pdf"
                            />
                            <label className="custom-file-label" htmlFor="customFileInput">{this.props.subscription.identity_photo_recto_filename}</label>
                        </div>
                    </div>
                </div>
                {this.props.subscription.identity_type === "cni" &&
                    <div className="col-sm-6 mb-4">
                        <div className="mb-3">
                            <p>Verso de la pièce</p>
                            <div className={`custom-file ${this.props.is_empty_identity_photo_verso && 'is-invalid'}`}>
                                <input
                                    type="file"
                                    name="identity_photo_verso"
                                    className={`custom-file-input`}
                                    id="identity_photo_verso"
                                    onChange={this.props.handleChangeSubscriptionFile}
                                    accept="image/*,.pdf"
                                />
                                <label className="custom-file-label" htmlFor="customFileInput">{this.props.subscription.identity_photo_verso_filename}</label>
                            </div>
                        </div>
                    </div>
                }

                <div className="col-sm-6 mb-4">
                    <div className="form-group">
                        <label htmlFor="payment_method" className="form-label">Moyen de paiement</label>
                        <InputPicker
                            data={this.props.paymentMethod}
                            onChange={(value) => {
                                let subscription = this.props.subscription
                                subscription['payment_method'] = value;
                                this.setState({ subscription })
                            }}
                            name="payment_method"
                            labelKey="name"
                            valueKey="name"
                            searchable={false}
                            style={{ width: "100%" }}
                            className={`check-picker-custom-input ${this.props.is_empty_payment_method && 'is-invalid-custom'}`}
                            placeholder={'Séléctionner le moyen de paiement'}
                            value={this.props.subscription.payment_method}
                        />
                    </div>
                </div>
            </div>

        </div>;
    }
}
