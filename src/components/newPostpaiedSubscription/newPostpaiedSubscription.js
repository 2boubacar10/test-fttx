import React, { Component } from 'react';
import './newPostpaiedSubscription.css';
import { Loader } from 'rsuite';
import api from '../../config/global-vars';
import axios from 'axios';
import PostpaiedSubscriptionFields from '../postpaiedSubscriptionFields/postpaiedSubscriptionFields';
import SubscriptionRecapitulatif from '../subscriptionRecapitulatif/subscriptionRecapitulatif';

export default class NewPostpaiedSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: api,
            step: 0,
            postpaiedSubscriptionInProgress: false,
            requestConfig: {
                headers: { Authorization: `Bearer ${window.localStorage.getItem('userToken')}` }
            },
            userID: window.localStorage.getItem('userID'),
        };
    }

    changePercent(nextstep) {
        const step = nextstep < 0 ? 0 : nextstep > 3 ? 3 : nextstep;
        this.setState({ step });
    }

    precedent = (e) => {
        e.preventDefault()

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.changePercent(this.state.step - 1);
    }

    suivant = (e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' });
        var step = this.state.step
        if (step === 0) {
            if (this.props.onValidatePostpaiedSubscriptionFields()) {
                this.changePercent(this.state.step + 1);
            }
        }
    }

    onSavePostpaiedSubscription = (e) => {
        e.preventDefault();

        if (this.props.onValidatePostpaiedSubscriptionFields()) {
            this.setState({ postpaiedSubscriptionInProgress: true })


            var api = this.state.api;
            const url = api + 'subscriptions';
            var config = this.state.requestConfig;

            var data = new FormData()
            data.append('social_reason', this.props.subscription.social_reason)
            data.append('company_name', this.props.subscription.company_name)
            data.append('ninea', this.props.subscription.ninea)
            data.append('commercial_register_file', this.props.subscription.commercial_register_file)
            data.append('commercial_register_number', this.props.subscription.commercial_register_number)
            data.append('zone_id', this.props.subscription.zone_id)
            data.append('address', this.props.subscription.address)
            data.append('offer_id', this.props.subscription.offer_id)
            data.append('building_id', this.props.subscription.building_id)
            data.append('phone_number', this.props.subscription.phone_number)
            data.append('email', this.props.subscription.email)
            data.append('contract_photo', this.props.subscription.contract_photo)
            data.append('identity_type', this.props.subscription.identity_type)
            data.append('identity_photo_recto', this.props.subscription.identity_photo_recto)
            data.append('identity_photo_verso', this.props.subscription.identity_photo_verso)
            data.append('payment_method', this.props.subscription.payment_method)
            data.append('user_id', this.state.userID)
            data.append('profile_type', "professionnel")

            axios.post(url, data, config)
                .then(response => {
                    this.setState({ postpaiedSubscriptionInProgress: false })
                    if (response.status === 200) {
                        this.props.openConfirmation(response.data.data)
                    }
                })
                .catch(error => {
                    this.setState({ postpaiedSubscriptionInProgress: false })
                    if (error) {
                        this.props.openSubscriptionFailed()
                    }
                });
        }
    }

    render() {
        const { step } = this.state;

        return <div className="component-new-postpaied-subscription">
            <form onSubmit={(e) => this.onSavePostpaiedSubscription(e)}>
                <div>
                    {step === 0 ?
                        (
                            <PostpaiedSubscriptionFields
                                subscription={this.props.subscription}
                                handleChangeSubscription={this.props.handleChangeSubscription}
                                handleChangeSubscriptionFile={this.props.handleChangeSubscriptionFile}
                                handleChangeSelectArea={this.props.handleChangeSelectArea}
                                is_empty_social_reason={this.props.is_empty_social_reason}
                                is_empty_ninea={this.props.is_empty_ninea}
                                is_empty_zone_id={this.props.is_empty_zone_id}
                                is_empty_address={this.props.is_empty_address}
                                is_empty_building_id={this.props.is_empty_building_id}
                                is_empty_offer_id={this.props.is_empty_offer_id}
                                is_empty_phone_number={this.props.is_empty_phone_number}
                                is_empty_email={this.props.is_empty_email}
                                is_empty_contract_photo={this.props.is_empty_contract_photo}
                                is_empty_identity_type={this.props.is_empty_identity_type}
                                is_empty_identity_photo_recto={this.props.is_empty_identity_photo_recto}
                                is_empty_identity_photo_verso={this.props.is_empty_identity_photo_verso}
                                is_empty_payment_method={this.props.is_empty_payment_method}
                                is_empty_commercial_register_file={this.props.is_empty_commercial_register_file}
                                is_empty_commercial_register_number={this.props.is_empty_commercial_register_number}
                                onSetSubscriberPhone={this.props.handleSubscriptionPhone}
                                areas={this.props.areas}
                                buildings={this.props.buildings}
                                offers={this.props.offers}
                                paymentMethod={this.props.paymentMethod}
                            />
                        ) :
                        step === 1 ? (
                            <SubscriptionRecapitulatif
                                subscription={this.props.subscription}

                            />
                        ) : ("")
                    }
                </div>
                <div className="d-flex mt-5">
                    <span className={step === 0 ? 'd-none' : 'btn-theme-step-reverse trans-0-2'}
                        onClick={(e) => this.precedent(e)}
                        disabled={step === 0}
                    >
                        Retour
                    </span>

                    <span className={step === 1 ? 'd-none' : 'ms-auto btn-theme-step trans-0-2'}
                        onClick={(e) => this.suivant(e)}
                    >
                        Passer l’étape
                    </span>

                    <div className={step === 0 ? 'd-none' : 'ms-auto'}>
                        {this.state.postpaiedSubscriptionInProgress ?
                            <button className="ms-auto btn-theme-step in-progress-btn" disabled>
                                Souscription &nbsp; <Loader />
                            </button>
                            :
                            <button type='submit' className="ms-auto btn-theme-step" > Souscrire </button>
                        }
                    </div>
                </div>
            </form>
        </div>;
    }
}
