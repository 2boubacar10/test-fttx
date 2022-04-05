import React, { Component } from 'react';
import './paymentView.css';
import { Steps } from 'rsuite';
import SubscriptionPaymentFields from '../subscriptionPaymentFields/index';
import SubscriptionPaymentRecapitulatif from '../subscriptionPaymentRecapitulatif/index';
import SubscriptionPaymentKeypad from '../subscriptionPaymentKeypad/index';
import { connect } from 'react-redux';
import { fetchSubscriptionById } from '../../redux/Subscription/subscription-actions';
import LoadingPage from '../loadingPage/index';
import api from '../../config/global-vars';
import axios from 'axios';
import { Modal } from 'rsuite';
import IconConfirm from '../../images/icons/icon-check.png';

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
            subscriptionPaymentInProcess: false,
            subscriptionID: this.props.match.params.id,
            secretCodeValue: "",
            subscriptionFetchingProgress: false,
            subscription: {},
            installationCostStatus: true,
            installationCost: 0,
            totalMount: 0,
            paymentData: { customer_number: "" },
            showConfirmation: false,
            is_empty_customer_number: false,
            no_correct_format_customer_number: false

        };
        this.closeConformation = this.closeConformation.bind(this);
        this.openConfirmation = this.openConfirmation.bind(this);
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


    onSubmitSubscriptionPayment() {
        if (this.onValidateCustomerNumber()) {
            this.setState({ subscriptionPaymentInProcess: true })

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
                this.setState({ subscriptionPaymentInProcess: false })
                this.openConfirmation()
            }, 3000);
        }

    }

    handleChangeSecretCode = (secretCode) => {
        this.setState({ secretCodeValue: secretCode })
        if (secretCode.length === 4) {
            setTimeout(() => {
                this.onSubmitSubscriptionPayment()
            }, 200);
        }
    }

    closeConformation(e) {
        this.setState({ showConfirmation: false });
        setTimeout(() => {
            window.location = '/liste-des-souscriptions'
        }, 200);
    }

    openConfirmation() {
        setTimeout(() => {
            this.setState({ showConfirmation: true });
        }, 200);
    }

    render() {
        const { step } = this.state;

        if (this.state.subscriptionFetchingProgress || this.state.subscriptionPaymentInProcess) {
            return <LoadingPage subscriptionPaymentInProcess={this.state.subscriptionPaymentInProcess} />
        } else {
            console.log('first render', this.state.paymentData)
            return <div className="component-create-subscription-request component-payment-view">
                <div className="py-5">
                    <div className="container">
                        <h5 className='theme-title mb-5 text-left'>Paiement</h5>
                        <div>
                            <Steps current={step} vertical>
                                <Steps.Item title={`Informations du paiement`} />
                                <Steps.Item title="Récapitulatif" />
                                <Steps.Item title="Paiement" />
                            </Steps>

                            <div>
                                {step === 0 ?
                                    <SubscriptionPaymentFields
                                        subscription={this.state.subscription}
                                        installationCostStatus={this.state.installationCostStatus}
                                        handleInstallationCostStatus={this.handleInstallationCostStatus}
                                        totalMount={this.state.totalMount}
                                        installationCost={this.state.installationCost}
                                        paymentData={this.state.paymentData}
                                        onSetCustomerPhone={this.handleCustomerPhone}
                                        is_empty_customer_number={this.state.is_empty_customer_number}
                                        no_correct_format_customer_number={this.state.no_correct_format_customer_number}

                                    />
                                    :
                                    step === 1 ?
                                        <SubscriptionPaymentRecapitulatif
                                            subscription={this.state.subscription}
                                            totalMount={this.state.totalMount}
                                            installationCost={this.state.installationCost}
                                            paymentData={this.state.paymentData}
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

                                <span className={step > 1 ? 'd-none' : 'ms-auto btn-theme-step trans-0-2'}
                                    onClick={(e) => this.suivant(e)}
                                >
                                    Suivant
                                </span>

                                {/* <div className={step <= 1 ? 'd-none' : 'ms-auto'}>
                                {this.state.subscriptionPaymentInProcess ?
                                    <button className=" ms-auto btn-theme-step in-progress-btn" disabled>
                                        Paiement &nbsp; <Loader />
                                    </button>
                                    :
                                    <button className="ms-auto btn-theme-step" > Payer </button>
                                }
                            </div> */}
                            </div>
                        </div>

                        {/* Modal confirmation de paiement  */}
                        <div className="modal-container message-confirmation">
                            <Modal size="xs" open={this.state.showConfirmation} backdrop={true} onClose={this.closeConformation} className="rsuite-content-modal-custom">
                                <form>
                                    <Modal.Header>
                                        <Modal.Title></Modal.Title>
                                    </Modal.Header>
                                    <div className="mt-5 mb-3 flex-col itm-center">
                                        <img src={IconConfirm} className="icon-confirmation-modal mb-5" alt="icon-confirmation" />
                                        <p className="title-confirmation-modal mb-3">Le paiement a bien été encaissé!</p>
                                    </div>
                                    <Modal.Footer className="text-center">
                                        <div className="row px-5">
                                            <div className="col-12 mb-3 d-flex justify-content-center">
                                                <button type='button' onClick={this.closeConformation} className="btn-theme-step trans-0-2">
                                                    Fermer
                                                </button>
                                            </div>
                                        </div>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>;
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
