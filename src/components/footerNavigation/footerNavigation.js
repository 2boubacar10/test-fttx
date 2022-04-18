import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './footerNavigation.css';
import { IoHomeOutline, IoCreateOutline, IoCashOutline } from 'react-icons/io5';
import { connect } from 'react-redux';
import { fetchPaymentsByFreelancer } from '../../redux/Payment/payment-actions';


class FooterNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: window.localStorage.getItem('userToken'),
            requestConfig: {
                headers: { Authorization: `Bearer ${window.localStorage.getItem('userToken')}` }
            },
            userID: window.localStorage.getItem('userID'),
        };
    }

    componentDidMount() {
        var config = this.state.requestConfig;
        var userID = this.state.userID;
        var userToken = this.state.userToken;

        if (userID && userToken) {
            this.props.fetchPaymentsByFreelancer(userID, config)
        }
    }

    render() {
        return <div className="component-footer-navigation fixed-bottom box-shadow">
            <NavLink className={"nav-button trans-0-2"} to={"/dashboard"}>
                <IoHomeOutline />
                <span>Accueil</span>
            </NavLink>
            <NavLink className={"nav-button trans-0-2"} to={"/liste-des-souscriptions"}>
                <IoCreateOutline />
                <span>Souscription</span>
            </NavLink>
            {this.props.paymentsByFreelancer &&
                <NavLink className={"nav-button trans-0-2"} to={"/liste-des-paiements"}>
                    <IoCashOutline />
                    <span>Paiement</span>
                </NavLink>
            }
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPaymentsByFreelancer: (userId, config) => dispatch(fetchPaymentsByFreelancer(userId, config)),
    };

}

const mapStateToProps = state => {
    return {
        paymentsByFreelancer: state.payments.paymentsByFreelancer,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterNavigation);
