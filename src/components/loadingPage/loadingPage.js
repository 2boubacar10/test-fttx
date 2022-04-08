import React, { Component } from 'react';
import './loadingPage.css';
import ClipLoader from "react-spinners/ClipLoader";

export default class LoadingPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
        return <div className="component-loading-page">
            <ClipLoader color='#ffffff' />
            <p>
                {this.props.subscriptionPaymentByFreelancerInProcess ? "Paiement" : "Chargement"}{" "}
                en cours
            </p>
        </div>;
    }
}
