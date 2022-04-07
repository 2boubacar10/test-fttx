import React, { Component } from 'react';
import './paymentView.css';
import { Loader } from 'rsuite';
import SubscriptionPaymentFields from '../subscriptionPaymentFields/index';
import SubscriptionPaymentRecapitulatif from '../subscriptionPaymentRecapitulatif/index';
import SubscriptionPaymentKeypad from '../subscriptionPaymentKeypad/index';
import { connect } from 'react-redux';
import { fetchSubscriptionById } from '../../redux/Subscription/subscription-actions';
import LoadingPage from '../loadingPage/index';
import api from '../../config/global-vars';
import axios from 'axios';
import Swal from 'sweetalert2';

class PaymentView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: api,
            userToken: window.localStorage.getItem('userToken'),
            requestConfig: {
                headers: { Authorization: `Bearer ${window.localStorage.getItem('userToken')}` }
            },
            step: 0,
            subscriptionPaymentByFreelancerInProcess: false,
            subscriptionPaymentByCustomerInProcess: false,
            subscriptionID: this.props.match.params.id,
            secretCodeValue: "",
            subscriptionFetchingProgress: false,
            subscription: {},
            installationCostStatus: true,
            installationCost: 0,
            totalMount: 0,
            paymentData: { customer_number: "" },
            is_empty_customer_number: false,
            no_correct_format_customer_number: false

        };
    }

    componentWillMount() {
        this.setState({ subscriptionFetchingProgress: true })
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
        if (step <= 1) {
            if (this.onValidateCustomerNumber()) {
                this.changePercent(this.state.step + 1);
            }
        }
    }

    componentDidMount() {
        var config = this.state.requestConfig;
        var subscriptionID = this.state.subscriptionID

        if (subscriptionID && config) {
            this.props.fetchSubscriptionById(subscriptionID, config)
        }
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.subscriptionById) {
            let subscription = prevProps.subscriptionById;
            let installationCost = this.state.installationCost;
            installationCost = parseInt(prevProps.subscriptionById.offer.installation_costs)
            let totalMount = this.state.totalMount;
            totalMount = (
                parseInt(prevProps.subscriptionById.offer.installation_costs) +
                parseInt(prevProps.subscriptionById.offer.monthly_payment) +
                parseInt(prevProps.subscriptionById.offer.stamp)
            )

            this.setState({
                subscription: subscription,
                totalMount,
                installationCost,
                subscriptionFetchingProgress: false
            })
        }
    }

    handleInstallationCostStatus = (value) => {
        let installationCostStatus = this.state.installationCostStatus;
        let subscription = this.state.subscription
        let totalMount = this.state.totalMount;
        let installationCost = this.state.installationCost;

        if (installationCostStatus === true) {
            totalMount = totalMount - parseInt(subscription.offer.installation_costs)
            installationCost = 0
            this.setState({ installationCostStatus: false, totalMount, installationCost })
        }
        if (installationCostStatus === false) {
            totalMount = totalMount + parseInt(subscription.offer.installation_costs)
            installationCost = parseInt(subscription.offer.installation_costs)
            this.setState({ installationCostStatus: true, totalMount, installationCost })
        }
    }

    handleCustomerPhone = (customer_number, data) => {
        let paymentData = this.state.paymentData
        paymentData['customer_number'] = customer_number;

        this.setState({ paymentData })
    }

    onValidateCustomerNumber = () => {
        let paymentData = this.state.paymentData
        var isValidForm = true
        var subscription = this.state.subscription

        if (subscription.payment_method === "Free Money") {
            if (!paymentData['customer_number']) {
                isValidForm = false
                this.setState({ is_empty_customer_number: true })
                setTimeout(() => {
                    this.setState({ is_empty_customer_number: false })
                }, 10000);
            }
            if (paymentData['customer_number'].length > 0 && paymentData['customer_number'].length < 12) {
                isValidForm = false
                this.setState({ no_correct_format_customer_number: true })
                setTimeout(() => {
                    this.setState({ no_correct_format_customer_number: false })
                }, 10000);
            }
        }

        return isValidForm
    }

    onCustomerInitSubscriptionPayment = (e) => {
        e.preventDefault();

        if (this.onValidateCustomerNumber()) {
            this.setState({ subscriptionPaymentByCustomerInProcess: true })
            setTimeout(() => {
                this.openPaymentFailure()
                this.setState({ subscriptionPaymentByCustomerInProcess: false })
            }, 1000);
        }
    }

    onFreelancerInitSubscriptionPayment() {
        if (this.onValidateCustomerNumber()) {
            this.setState({ subscriptionPaymentByFreelancerInProcess: true })

            var api = this.state.api;
            var config = this.state.requestConfig;
            var paymentData = this.state.paymentData;
            paymentData['pin'] = this.state.secretCodeValue;
            paymentData['amount'] = this.state.totalMount;
            this.setState({ paymentData })

            console.log('data', this.state.paymentData)
            // axios.post(api+ "subscriptions/create_payment", paymentData, config )
            //     .then(response=>{
            //         console.log('response', response)
            //     })
            //     .catch(error=>{
            //         if (error) {
            //             console.log("error", error.response)
            //         }
            //     })

            setTimeout(() => {
                this.setState({ subscriptionPaymentByFreelancerInProcess: false })
                this.openPaymentConfirmation()
            }, 3000);
        }

    }

    handleChangeSecretCode = (secretCode) => {
        this.setState({ secretCodeValue: secretCode })
        if (secretCode.length === 4) {
            setTimeout(() => {
                this.onFreelancerInitSubscriptionPayment()
            }, 200);
        }
    }

    openPaymentConfirmation = () => {
        Swal.fire({
            icon: 'success',
            title: 'Paiement effectué!',
            html:
                'Le paiement a bien été encaissé. <br/>',
            confirmButtonText: 'Fermer',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/liste-des-souscriptions"
            }
        })
    }

    openPaymentFailure = () => {
        Swal.fire({
            icon: 'error',
            title: 'Paiement echoué!',
            html:
                'Le paiement a échoué. Merci de réessayé. <br/>',
            confirmButtonText: 'Réessayer',
        }).then((result) => {
            if (result.isConfirmed) {
                this.openPaymentConfirmation()
            }
        })
    }

    render() {
        const { step, subscription, paymentData } = this.state;

        if (this.state.subscriptionFetchingProgress || this.state.subscriptionPaymentByFreelancerInProcess) {
            return <LoadingPage subscriptionPaymentByFreelancerInProcess={this.state.subscriptionPaymentByFreelancerInProcess} />
        } else {
            console.log('first render', paymentData)
            return <div className="component-create-subscription-request component-payment-view">
                <div className="py-5">
                    <div className="container">
                        <h5 className='theme-title mb-5 text-left'>Paiement</h5>
                        <div>
                            {/* <Steps current={step} vertical>
                                <Steps.Item title={`Informations du paiement`} />
                                <Steps.Item title="Récapitulatif" />
                                <Steps.Item title="Paiement" />
                            </Steps> */}

                            <div>
                                {step === 0 ?
                                    <SubscriptionPaymentFields
                                        subscription={subscription}
                                        installationCostStatus={this.state.installationCostStatus}
                                        handleInstallationCostStatus={this.handleInstallationCostStatus}
                                        totalMount={this.state.totalMount}
                                        installationCost={this.state.installationCost}
                                        paymentData={paymentData}
                                        onSetCustomerPhone={this.handleCustomerPhone}
                                        is_empty_customer_number={this.state.is_empty_customer_number}
                                        no_correct_format_customer_number={this.state.no_correct_format_customer_number}

                                    />
                                    :
                                    step === 1 ?
                                        <SubscriptionPaymentRecapitulatif
                                            subscription={subscription}
                                            totalMount={this.state.totalMount}
                                            installationCost={this.state.installationCost}
                                            paymentData={paymentData}
                                        />
                                        :
                                        step === 2 &&
                                        < SubscriptionPaymentKeypad
                                            handleChangeSecretCode={this.handleChangeSecretCode}
                                            secretCodeValue={this.state.secretCodeValue}
                                        />
                                }
                            </div>
                            <div className="d-flex mt-5">
                                <span className={step === 0 ? 'd-none' : 'btn-theme-step-reverse trans-0-2'}
                                    onClick={(e) => this.precedent(e)}
                                    disabled={step === 0}
                                >
                                    Retour
                                </span>

                                {subscription.payment_method === "Free Money" ?
                                    step < 1 ?
                                        <span className={step < 1 ? 'ms-auto btn-theme-step trans-0-2' : 'd-none'}
                                            onClick={(e) => this.suivant(e)}
                                        >
                                            Suivant
                                        </span>
                                        :
                                        this.state.subscriptionPaymentByCustomerInProcess ?
                                            <button className=" ms-auto btn-theme-step in-progress-btn" disabled>
                                                Paiement &nbsp; <Loader />
                                            </button>
                                            :
                                            <button onClick={(e) => this.onCustomerInitSubscriptionPayment(e)} className="ms-auto btn-theme-step">Payer</button>

                                    :
                                    <span className={step < 2 ? 'ms-auto btn-theme-step trans-0-2' : 'd-none'}
                                        onClick={(e) => this.suivant(e)}
                                    >
                                        Suivant
                                    </span>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div >;
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSubscriptionById: (subscriptionId, config) => dispatch(fetchSubscriptionById(subscriptionId, config)),
    };

}

const mapStateToProps = state => {
    return {
        subscriptionById: state.subscriptions.subscriptionById,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentView);
