import React, { Component } from 'react';
import './createSubscriptionRequest.css';
import FooterNavigation from '../footerNavigation/index';
import Header from '../header/index';
import NewPrepaymentSubscription from '../newPrepaymentSubscription/index';
import NewPostpaiedSubscription from '../newPostpaiedSubscription/index';
import { connect } from 'react-redux';
import { fetchAllAreas } from '../../redux/Area/area-actions';
import { fetchBuildingByArea } from '../../redux/Building/building-actions';
import { fetchOffersByOfferType } from '../../redux/Offer/offer-actions';
import { fetchUserConnected } from '../../redux/User/user-actions';
import Swal from 'sweetalert2';

const paymentMethod = [
    { name: "Free Money" },
    { name: "Cash" }
];


class CreateSubscriptionRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: window.localStorage.getItem('userToken'),
            requestConfig: {
                headers: { Authorization: `Bearer ${window.localStorage.getItem('userToken')}` }
            },
            subscription: {
                social_reason: "",
                company_name: "",
                ninea: "",
                civility: "mr",
                firstname: "",
                lastname: "",
                zone_id: "",
                address: "",
                building_id: "",
                offer_id: "",
                phone_number: "",
                email: "",
                contract_photo: "",
                contract_photo_filename: "Choisir un fichier",
                identity_type: "cni",
                identity_number: "",
                cni_compte: "",
                identity_photo_recto: "",
                identity_photo_recto_filename: "Choisir un fichier",
                identity_photo_verso: "",
                identity_photo_verso_filename: "Choisir un fichier",
                payment_method: "",
                commercial_register_file: "",
                commercial_register_file_name: "Choisir un fichier",
                commercial_register_number: "",
            },
            is_empty_social_reason: false,
            is_empty_company_name: false,
            is_empty_ninea: false,
            is_empty_civility: false,
            is_empty_firstname: false,
            is_empty_lastname: false,
            is_empty_zone_id: false,
            is_empty_address: false,
            is_empty_building_id: false,
            is_empty_offer_id: false,
            is_empty_phone_number: false,
            is_empty_email: false,
            is_empty_contract_photo: false,
            is_empty_identity_type: false,
            is_empty_identity_number: false,
            is_empty_identity_photo_recto: false,
            is_empty_identity_photo_verso: false,
            is_empty_payment_method: false,
            is_empty_commercial_register_file: false,
            is_empty_commercial_register_number: false,
            dialCode: {},
            buildings: [],
            aPostpaiedHasBeenSubscribed: false,
            newSubscription: {}
        };
        this.handleChangeSelectArea = this.handleChangeSelectArea.bind(this);
        this.handleChangeSubscription = this.handleChangeSubscription.bind(this);
        this.handleChangeSubscriptionFile = this.handleChangeSubscriptionFile.bind(this);
    }

    componentWillMount() {
        var userToken = this.state.userToken;
        if (!userToken) {
            window.location.reload()
        }
    }

    componentDidMount() {
        var config = this.state.requestConfig;
        var userToken = this.state.userToken;

        if (userToken) {
            this.props.fetchAllAreas(config);
            this.props.fetchOffersByOfferType("particulier", config)
            this.props.fetchUserConnected(config)
        }
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.buildings) {
            this.setState({ buildings: prevProps.buildings })
        }
    }

    handleChangeSelectArea = (value, item) => {
        var config = this.state.requestConfig;
        var userToken = this.state.userToken;

        if (userToken) {
            this.props.fetchBuildingByArea(value, config)
        }

        let subscription = this.state.subscription
        subscription['zone_id'] = value;
        subscription['zone_ref'] = item.ref;

        this.setState({ subscription })
    }

    handleChangeSubscription = (e) => {
        let subscription = this.state.subscription
        subscription[e.target.name] = e.target.value
        this.setState({ subscription })
    }

    handleChangeSubscriptionFile(e) {
        let subscription = this.state.subscription

        if (e.target.name === "contract_photo") {
            subscription['contract_photo'] = e.target.files[0]
            subscription['contract_photo_filename'] = e.target.files[0].name
        }
        if (e.target.name === "identity_photo_recto") {
            subscription['identity_photo_recto'] = e.target.files[0]
            subscription['identity_photo_recto_filename'] = e.target.files[0].name
        }
        if (e.target.name === "identity_photo_verso") {
            subscription['identity_photo_verso'] = e.target.files[0]
            subscription['identity_photo_verso_filename'] = e.target.files[0].name
        }
        if (e.target.name === "commercial_register_file") {
            subscription['commercial_register_file'] = e.target.files[0]
            subscription['commercial_register_file_name'] = e.target.files[0].name
        }
        this.setState({ subscription });
    }

    handleSubscriptionPhone = (phone_number, data) => {
        // var numberToDisplay = phone_number.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
        let subscription = this.state.subscription
        subscription['phone_number'] = phone_number;
        subscription['phone_number_formated'] = phone_number;

        this.setState({ subscription: subscription, dialCode: data })
    }

    openConfirmation = (subscription) => {
        if (subscription.profile_type === "professionnel") {
            Swal.fire({
                icon: 'success',
                title: 'Souscription enregistr??e',
                html:
                    `La demande de souscription postpay??e a bien ??t?? effectu?? <br/><br/>` +
                    'Veuillez ?? present passer au paiement.',
                confirmButtonText: 'Continuer',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/paiement/" + subscription.id
                }
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Souscription enregistr??e',
                html:
                    `La demande de souscription pr??pay??e a bien ??t?? effectu?? <br/><br/>` +
                    'Veuillez ?? present passer au paiement.',
                confirmButtonText: 'Continuer',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/paiement/" + subscription.id
                }
            })
        }
    }

    openSubscriptionFailed = () => {
        Swal.fire({
            icon: 'error',
            title: 'Souscription echou??!',
            html: 'Oups! Une erreur est survenue.<br/><br/>' +
                'La demande de souscription n\'a pas ??t?? enregistr??.  Veuillez r??essayer. <br/>',
            confirmButtonText: 'R??essayer',
        })
    }

    onValidatePrepaiedSubscriptionFields = () => {
        let subscription = this.state.subscription
        var isValidForm = true

        if (!subscription['civility']) {
            isValidForm = false
            this.setState({ is_empty_civility: true })
            setTimeout(() => {
                this.setState({ is_empty_civility: false })
            }, 10000);
        }
        if (!subscription['firstname']) {
            isValidForm = false
            this.setState({ is_empty_firstname: true })
            setTimeout(() => {
                this.setState({ is_empty_firstname: false })
            }, 10000);
        }

        if (!subscription['lastname']) {
            isValidForm = false
            this.setState({ is_empty_lastname: true })
            setTimeout(() => {
                this.setState({ is_empty_lastname: false })
            }, 10000);
        }

        if (!subscription['zone_id']) {
            isValidForm = false
            this.setState({ is_empty_zone_id: true })
            setTimeout(() => {
                this.setState({ is_empty_zone_id: false })
            }, 10000);
        }

        if (!subscription['address']) {
            isValidForm = false
            this.setState({ is_empty_address: true })
            setTimeout(() => {
                this.setState({ is_empty_address: false })
            }, 10000);
        }

        if (!subscription['building_id']) {
            isValidForm = false
            this.setState({ is_empty_building_id: true })
            setTimeout(() => {
                this.setState({ is_empty_building_id: false })
            }, 10000);
        }

        if (!subscription['offer_id']) {
            isValidForm = false
            this.setState({ is_empty_offer_id: true })
            setTimeout(() => {
                this.setState({ is_empty_offer_id: false })
            }, 10000);
        }

        if (!subscription['phone_number']) {
            isValidForm = false
            this.setState({ is_empty_phone_number: true })
            setTimeout(() => {
                this.setState({ is_empty_phone_number: false })
            }, 10000);
        }

        if (!subscription['email']) {
            isValidForm = false
            this.setState({ is_empty_email: true })
            setTimeout(() => {
                this.setState({ is_empty_email: false })
            }, 10000);
        }

        if (!subscription['contract_photo']) {
            isValidForm = false
            this.setState({ is_empty_contract_photo: true })
            setTimeout(() => {
                this.setState({ is_empty_contract_photo: false })
            }, 10000);
        }

        if (!subscription['identity_type']) {
            isValidForm = false
            this.setState({ is_empty_identity_type: true })
            setTimeout(() => {
                this.setState({ is_empty_identity_type: false })
            }, 10000);
        }

        if (!subscription['identity_number']) {
            isValidForm = false
            this.setState({ is_empty_identity_number: true })
            setTimeout(() => {
                this.setState({ is_empty_identity_number: false })
            }, 10000);
        }

        if (!subscription['identity_photo_recto']) {
            isValidForm = false
            this.setState({ is_empty_identity_photo_recto: true })
            setTimeout(() => {
                this.setState({ is_empty_identity_photo_recto: false })
            }, 10000);
        }

        if (subscription['identity_type'] === "cni") {
            if (!subscription['identity_photo_verso']) {
                isValidForm = false
                this.setState({ is_empty_identity_photo_verso: true })
                setTimeout(() => {
                    this.setState({ is_empty_identity_photo_verso: false })
                }, 10000);
            }
        }

        if (!subscription['payment_method']) {
            isValidForm = false
            this.setState({ is_empty_payment_method: true })
            setTimeout(() => {
                this.setState({ is_empty_payment_method: false })
            }, 10000);
        }

        return isValidForm
    }

    onValidatePostpaiedSubscriptionFields = () => {
        let subscription = this.state.subscription
        var isValidForm = true

        if (!subscription['social_reason']) {
            isValidForm = false
            this.setState({ is_empty_social_reason: true })
            setTimeout(() => {
                this.setState({ is_empty_social_reason: false })
            }, 10000);
        }

        if (!subscription['ninea']) {
            isValidForm = false
            this.setState({ is_empty_ninea: true })
            setTimeout(() => {
                this.setState({ is_empty_ninea: false })
            }, 10000);
        }

        if (!subscription['zone_id']) {
            isValidForm = false
            this.setState({ is_empty_zone_id: true })
            setTimeout(() => {
                this.setState({ is_empty_zone_id: false })
            }, 10000);
        }

        if (!subscription['address']) {
            isValidForm = false
            this.setState({ is_empty_address: true })
            setTimeout(() => {
                this.setState({ is_empty_address: false })
            }, 10000);
        }

        if (!subscription['building_id']) {
            isValidForm = false
            this.setState({ is_empty_building_id: true })
            setTimeout(() => {
                this.setState({ is_empty_building_id: false })
            }, 10000);
        }

        if (!subscription['offer_id']) {
            isValidForm = false
            this.setState({ is_empty_offer_id: true })
            setTimeout(() => {
                this.setState({ is_empty_offer_id: false })
            }, 10000);
        }

        if (!subscription['phone_number']) {
            isValidForm = false
            this.setState({ is_empty_phone_number: true })
            setTimeout(() => {
                this.setState({ is_empty_phone_number: false })
            }, 10000);
        }

        if (!subscription['email']) {
            isValidForm = false
            this.setState({ is_empty_email: true })
            setTimeout(() => {
                this.setState({ is_empty_email: false })
            }, 10000);
        }

        if (!subscription['contract_photo']) {
            isValidForm = false
            this.setState({ is_empty_contract_photo: true })
            setTimeout(() => {
                this.setState({ is_empty_contract_photo: false })
            }, 10000);
        }

        if (!subscription['identity_type']) {
            isValidForm = false
            this.setState({ is_empty_identity_type: true })
            setTimeout(() => {
                this.setState({ is_empty_identity_type: false })
            }, 10000);
        }

        if (!subscription['identity_number']) {
            isValidForm = false
            this.setState({ is_empty_identity_number: true })
            setTimeout(() => {
                this.setState({ is_empty_identity_number: false })
            }, 10000);
        }

        if (!subscription['identity_photo_recto']) {
            isValidForm = false
            this.setState({ is_empty_identity_photo_recto: true })
            setTimeout(() => {
                this.setState({ is_empty_identity_photo_recto: false })
            }, 10000);
        }

        if (subscription['identity_type'] === "cni") {
            if (!subscription['identity_photo_verso']) {
                isValidForm = false
                this.setState({ is_empty_identity_photo_verso: true })
                setTimeout(() => {
                    this.setState({ is_empty_identity_photo_verso: false })
                }, 10000);
            }
        }

        if (!subscription['payment_method']) {
            isValidForm = false
            this.setState({ is_empty_payment_method: true })
            setTimeout(() => {
                this.setState({ is_empty_payment_method: false })
            }, 10000);
        }

        if (!subscription['commercial_register_file']) {
            isValidForm = false
            this.setState({ is_empty_commercial_register_file: true })
            setTimeout(() => {
                this.setState({ is_empty_commercial_register_file: false })
            }, 10000);
        }

        if (!subscription['commercial_register_number']) {
            isValidForm = false
            this.setState({ is_empty_commercial_register_number: true })
            setTimeout(() => {
                this.setState({ is_empty_commercial_register_number: false })
            }, 10000);
        }

        return isValidForm
    }

    navigationButtonSubscriptionButton = (e, param) => {
        e.preventDefault();
        var config = this.state.requestConfig;
        var userToken = this.state.userToken;

        if (userToken) {
            this.props.fetchOffersByOfferType(param, config)
        }

    }

    render() {
        return <div className="component-create-subscription-request">
            <Header />
            <div className="content-section">
                <div className="container">
                    <h5 className='theme-title'>Nouvelle souscription</h5>
                    <nav>
                        <div className="theme-tabs nav nav-tabs  justify-content-center mt-4" id="nav-tab" role="tablist">
                            <button onClick={(e) => this.navigationButtonSubscriptionButton(e, 'particulier')} className="nav-link active" id="nav-particulier-tab" data-bs-toggle="tab" data-bs-target="#nav-particulier" type="button" role="tab" aria-controls="nav-particulier" aria-selected="true">Particulier</button>
                            <button onClick={(e) => this.navigationButtonSubscriptionButton(e, 'professionnel')} className="nav-link" id="nav-professionnel-tab" data-bs-toggle="tab" data-bs-target="#nav-professionnel" type="button" role="tab" aria-controls="nav-professionnel" aria-selected="false">Professionnel</button>
                        </div>
                    </nav>
                    <div className="tab-content pt-5" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-particulier" role="tabpanel" aria-labelledby="nav-particulier-tab">
                            <NewPrepaymentSubscription
                                subscription={this.state.subscription}
                                handleChangeSubscription={this.handleChangeSubscription}
                                handleChangeSubscriptionFile={this.handleChangeSubscriptionFile}
                                handleChangeSelectArea={this.handleChangeSelectArea}
                                is_empty_civility={this.state.is_empty_civility}
                                is_empty_firstname={this.state.is_empty_firstname}
                                is_empty_lastname={this.state.is_empty_lastname}
                                is_empty_zone_id={this.state.is_empty_zone_id}
                                is_empty_address={this.state.is_empty_address}
                                is_empty_building_id={this.state.is_empty_building_id}
                                is_empty_offer_id={this.state.is_empty_offer_id}
                                is_empty_phone_number={this.state.is_empty_phone_number}
                                is_empty_email={this.state.is_empty_email}
                                is_empty_contract_photo={this.state.is_empty_contract_photo}
                                is_empty_identity_type={this.state.is_empty_identity_type}
                                is_empty_identity_number={this.state.is_empty_identity_number}
                                is_empty_identity_photo_recto={this.state.is_empty_identity_photo_recto}
                                is_empty_identity_photo_verso={this.state.is_empty_identity_photo_verso}
                                is_empty_payment_method={this.state.is_empty_payment_method}
                                handleSubscriptionPhone={this.handleSubscriptionPhone}
                                areas={this.props.areas}
                                buildings={this.state.buildings}
                                offers={this.props.offerByOfferType}
                                paymentMethod={paymentMethod}
                                openConfirmation={this.openConfirmation}
                                openSubscriptionFailed={this.openSubscriptionFailed}
                                onValidatePrepaiedSubscriptionFields={this.onValidatePrepaiedSubscriptionFields}
                                dialCode={this.state.dialCode}
                            />
                        </div>
                        <div className="tab-pane fade" id="nav-professionnel" role="tabpanel" aria-labelledby="nav-professionnel-tab">
                            <NewPostpaiedSubscription
                                subscription={this.state.subscription}
                                handleChangeSubscription={this.handleChangeSubscription}
                                handleChangeSubscriptionFile={this.handleChangeSubscriptionFile}
                                handleChangeSelectArea={this.handleChangeSelectArea}
                                is_empty_social_reason={this.state.is_empty_social_reason}
                                is_empty_ninea={this.state.is_empty_ninea}
                                is_empty_zone_id={this.state.is_empty_zone_id}
                                is_empty_address={this.state.is_empty_address}
                                is_empty_building_id={this.state.is_empty_building_id}
                                is_empty_offer_id={this.state.is_empty_offer_id}
                                is_empty_phone_number={this.state.is_empty_phone_number}
                                is_empty_email={this.state.is_empty_email}
                                is_empty_contract_photo={this.state.is_empty_contract_photo}
                                is_empty_identity_type={this.state.is_empty_identity_type}
                                is_empty_identity_number={this.state.is_empty_identity_number}
                                is_empty_identity_photo_recto={this.state.is_empty_identity_photo_recto}
                                is_empty_identity_photo_verso={this.state.is_empty_identity_photo_verso}
                                is_empty_payment_method={this.state.is_empty_payment_method}
                                is_empty_commercial_register_file={this.state.is_empty_commercial_register_file}
                                is_empty_commercial_register_number={this.state.is_empty_commercial_register_number}
                                handleSubscriptionPhone={this.handleSubscriptionPhone}
                                areas={this.props.areas}
                                buildings={this.state.buildings}
                                offers={this.props.offerByOfferType}
                                paymentMethod={paymentMethod}
                                openConfirmation={this.openConfirmation}
                                openSubscriptionFailed={this.openSubscriptionFailed}
                                onValidatePostpaiedSubscriptionFields={this.onValidatePostpaiedSubscriptionFields}
                                dialCode={this.state.dialCode}

                            />
                        </div>
                    </div>
                </div>
            </div>
            <FooterNavigation />
        </div>;
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchAllAreas: (config) => dispatch(fetchAllAreas(config)),
        fetchBuildingByArea: (areaId, config) => dispatch(fetchBuildingByArea(areaId, config)),
        fetchOffersByOfferType: (offerType, config) => dispatch(fetchOffersByOfferType(offerType, config)),
        fetchUserConnected: (config) => dispatch(fetchUserConnected(config)),
    };

}

const mapStateToProps = state => {
    return {
        areas: state.areas.allAreas,
        buildings: state.buildings.buildingsByArea,
        offerByOfferType: state.offers.offerByOfferType,
        user: state.users.connectedUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubscriptionRequest);