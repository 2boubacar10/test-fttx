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
            secretCodeArrayValue: [],
            secretCodeValue: "",
            subscriptionFetchingProgress: false,
            subscription: {},
            installationCostStatus: true,
            installationCost: 0,
            totalMount: 0,
            paymentData: { customer_number: "" },
            is_empty_customer_number: false,
            no_correct_format_customer_number: false,
            randomKeyboard: [],
            getRandomKeyboardProgress: false,
            user: {}

        };
    }

    componentWillMount() {
        this.setState({ subscriptionFetchingProgress: true })
        var userToken = this.state.userToken;
        if (!userToken) {
            window.location.reload()
        }
    }

    changePercent(nextstep) {
        const step = nextstep < 0 ? 0 : nextstep > 3 ? 3 : nextstep;
        this.setState({ step });
    }

    precedent = (e) => {
        e.preventDefault()

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.changePercent(this.state.step - 1);
        this.setState({ secretCodeArrayValue: [], secretCodeValue: "" })
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
        var subscriptionID = this.state.subscriptionID;
        var userToken = this.state.userToken;

        this.onGetRandomKeypad()
        if (subscriptionID && userToken) {
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

            var config = this.state.requestConfig;
            var subscription = this.state.subscription;
            const url = this.state.api + "setDemandePaiementClient";

            var paymentData = this.state.paymentData;
            paymentData['subscription_number'] = subscription.number;
            paymentData['phone_number'] = paymentData.customer_number;

            console.log('pay', paymentData)
            this.setState({ paymentData })

            axios.post(url, paymentData, config)
                .then(response => {
                    if (response.status === 201) {
                        this.setState({ subscriptionPaymentByCustomerInProcess: false })
                        this.openPaymentConfirmation("Paiement initialisé!", "Le paiement de la souscription a bien été initialisé par USSD.")
                    }
                })
                .catch(error => {
                    this.setState({ subscriptionPaymentByCustomerInProcess: false })
                    if (error) {
                        this.openPaymentFailure()
                    }
                })

        }
    }

    onFreelancerInitSubscriptionPayment() {
        if (this.onValidateCustomerNumber()) {
            this.setState({ subscriptionPaymentByFreelancerInProcess: true })

            var config = this.state.requestConfig;
            var subscription = this.state.subscription;
            const url = this.state.api + "subscriptions/merchant_payment";

            var paymentData = this.state.paymentData;
            paymentData['pin'] = this.state.secretCodeValue;
            paymentData['prix_offre'] = subscription.offer.monthly_payment;
            paymentData['frais_timbre'] = subscription.offer.stamp;
            paymentData['tax'] = 0;
            paymentData['frais_installation'] = this.state.installationCost;
            paymentData['subscription_number'] = subscription.number;
            paymentData['montant_ttc'] = this.state.totalMount;

            this.setState({ paymentData })

            axios.post(url, paymentData, config)
                .then(response => {
                    this.setState({ subscriptionPaymentByFreelancerInProcess: false })
                    if (response.data.resultCode === 1) {
                        this.openPaymentConfirmation("Paiement effectué!", "Le paiement a bien été encaissé.")
                    }
                    console.log('response', response)
                })
                .catch(error => {
                    this.setState({ subscriptionPaymentByFreelancerInProcess: false })
                    console.log("error", error.response)
                    if (error && error.response.data.resultCode === -1) {
                        // this.openPaymentFailure()
                        this.openPaymentConfirmation("Paiement effectué!", "Le paiement a bien été encaissé.")
                    }
                })
        }

    }

    handleChangeSecretCode = (e, index) => {
        e.preventDefault();

        var secretCodeArrayValue = this.state.secretCodeArrayValue;
        var secretCodeValue = this.state.secretCodeValue;
        secretCodeArrayValue.push(index);
        secretCodeValue = secretCodeValue + index;
        this.setState({ secretCodeArrayValue, secretCodeValue })

        if (secretCodeArrayValue.length === 4) {
            setTimeout(() => {
                this.onFreelancerInitSubscriptionPayment()
                this.setState({ secretCodeArrayValue: [], secretCodeValue: "" })
            }, 200);
        }
    }

    onEraseSecretCode = (e) => {
        e.preventDefault();

        var secretCodeArrayValue = this.state.secretCodeArrayValue;
        var secretCodeValue = this.state.secretCodeValue;
        secretCodeArrayValue.pop();
        secretCodeValue = secretCodeValue.substring(0, secretCodeValue.length - 1)
        this.setState({ secretCodeArrayValue, secretCodeValue })

    }

    onGetRandomKeypad = () => {
        this.setState({ getRandomKeyboardProgress: true })

        var config = this.state.requestConfig;
        const url = this.state.api + "keypad/generate";
        axios.get(url, config)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ randomKeyboard: response.data.data, getRandomKeyboardProgress: false })
                }
            }).catch((error) => {
                if (error) {
                    this.setState({ getRandomKeyboardProgress: false })
                }
            });
    }

    openPaymentConfirmation = (title, message) => {
        Swal.fire({
            icon: 'success',
            title: title,
            html: '' + message + ' <br/>',
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
            html: 'Le paiement a échoué. Merci de réessayé. <br/>',
            confirmButtonText: 'Réessayer',
            showDenyButton: true,
            denyButtonColor: "#b6b8ba",
            denyButtonText: `Fermer`,
        }).then((result) => {
            if (result.isDenied) {
                window.location.href = "/liste-des-paiements"
            }
        })

    }

    render() {
        const { step, subscription, paymentData, randomKeyboard } = this.state;

        if (this.state.subscriptionFetchingProgress || this.state.subscriptionPaymentByFreelancerInProcess) {
            return <LoadingPage subscriptionPaymentByFreelancerInProcess={this.state.subscriptionPaymentByFreelancerInProcess} />
        } else {
            return <div className="component-create-subscription-request component-payment-view">
                <div className="py-5">
                    <div className="container">
                        {step < 2 && <h5 className='theme-title mb-5'>Paiement</h5>}
                        <div>
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
                                        step === 2 && randomKeyboard &&
                                        < SubscriptionPaymentKeypad
                                            handleChangeSecretCode={this.handleChangeSecretCode}
                                            onEraseSecretCode={this.onEraseSecretCode}
                                            secretCodeArrayValue={this.state.secretCodeArrayValue}
                                            randomKeyboard={randomKeyboard}
                                            getRandomKeyboardProgress={this.state.getRandomKeyboardProgress}
                                            onGetRandomKeypad={this.onGetRandomKeypad}
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
                                        Suivant {this.state.getRandomKeyboardProgress && <>"&nbsp;" <Loader /></>}
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
