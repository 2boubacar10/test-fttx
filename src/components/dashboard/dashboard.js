import React, { Component } from 'react';
import './dashboard.css'
import Header from '../header/index';
import FooterNavigation from '../footerNavigation/index';
import ReturnedSubscriptionModal from '../returnedSubscriptionModal/index';
import Swal from 'sweetalert2';
import axios from 'axios';
import api from '../../config/global-vars';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: api,
            userToken: window.localStorage.getItem('userToken'),
            requestConfig: {
                headers: { Authorization: `Bearer ${window.localStorage.getItem('userToken')}` }
            },
            userID: window.localStorage.getItem('userID'),
            showReturnedSubscription: false,
            subscriptionByNumberFetchingProgress: false,
            subscriptionByNumber: {},
            subscriptionNumber: "",
            disableSearchAction: true,
            searchInputLength: ""
        };
    }

    componentWillMount() {
        var userToken = this.state.userToken;

        if (!userToken) {
            window.location.reload()
        }
    }

    handleChangeSubscriptionNumber = (e) => {
        const re = /^[0-9\b]+$/;
        const { value, maxLength } = e.target;
        const subscriptionNumber = value.slice(0, maxLength);
        const searchInputLength = this.state.searchInputLength;

        if (e.target.value === '' || re.test(e.target.value)) {
            const searchInputLength = maxLength;
            this.setState({ subscriptionNumber, searchInputLength });
        }

        if (subscriptionNumber.length === searchInputLength) {
            this.setState({ disableSearchAction: false })
        } else {
            this.setState({ disableSearchAction: true })
        }
    };

    onSearchSubscriptionBuNumber = (e) => {
        e.preventDefault()

        var config = this.state.requestConfig;
        var userToken = this.state.userToken;
        var subscriptionNumber = this.state.subscriptionNumber;
        const url = this.state.api + 'subscriptions/search_by_number/' + subscriptionNumber;


        if (subscriptionNumber && userToken) {
            this.setState({ subscriptionByNumberFetchingProgress: true })

            axios.get(url, config)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ subscriptionByNumber: response.data.data, subscriptionByNumberFetchingProgress: false })
                        this.openSubscriptionDetails()
                    }
                })
                .catch((error) => {
                    this.setState({ subscriptionByNumberFetchingProgress: false })
                    if (error.response.status === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Souscription introuvable!',
                            html: 'La demande de souscription #' + this.state.subscriptionNumber + ' est introuvable',
                            confirmButtonText: 'Fermer',
                        })
                    }
                });
        }
    }

    openSubscriptionDetails = () => {
        this.setState({ showReturnedSubscription: true });
    }

    closeSubscriptionDetails = (e) => {
        this.setState({ showReturnedSubscription: false });
    }

    render() {
        return <div className="component-dashboard">
            <Header />
            <div className="content-section">
                <div className="container">
                    <form className="search-block" onSubmit={(e) => this.onSearchSubscriptionBuNumber(e)}>
                        <input
                            onChange={this.handleChangeSubscriptionNumber}
                            value={this.state.subscriptionNumber}
                            maxLength="5"
                            className="form-control number-input-custom"
                            placeholder="ID souscription"
                        />
                        <button type='submit' className="btn trans-0-2 btn-danger" disabled={this.state.disableSearchAction}><i className="fa fa-search"></i></button>
                    </form>
                    {this.state.showReturnedSubscription &&
                        <ReturnedSubscriptionModal
                            showReturnedSubscription={this.state.showReturnedSubscription}
                            closeSubscriptionDetails={this.closeSubscriptionDetails}
                            subscription={this.state.subscriptionByNumber}
                        />
                    }
                </div>
            </div>
            <FooterNavigation />
        </div>;
    }
}

export default Dashboard;