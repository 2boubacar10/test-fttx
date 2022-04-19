import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './contentNavigation.css';
import { IoPower } from 'react-icons/io5';
import { connect } from 'react-redux';
import { fetchPaymentsByFreelancer } from '../../redux/Payment/payment-actions';
import { IoHomeOutline, IoCreateOutline, IoCashOutline } from 'react-icons/io5';

class ContentNavigation extends Component {
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


    onLogoutUser = (e) => {
        e.preventDefault();
        window.localStorage.removeItem('userToken');

        setTimeout(() => {
            window.location = '/';
        }, 500);
    }

    render() {
        return <div className="component-content-navigation">
            <ul>
                <li>
                    <NavLink className={'trans-0-2'} to={"/dashboard"}><IoHomeOutline /> Tableau de bord</NavLink>
                </li>
                <li>
                    <NavLink className={'trans-0-2'} to={"/liste-des-souscriptions"}><IoCreateOutline />Souscription</NavLink>
                </li>
                {this.props.paymentsByFreelancer &&
                    <li>
                        <NavLink className={"trans-0-2"} to={"/liste-des-paiements"}><IoCashOutline />Paiement</NavLink>
                    </li>
                }
                <li className='mt-5'>
                    <button onClick={this.onLogoutUser} className='logout-btn trans-0-2'><IoPower />Déconnexion</button>
                </li>
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentNavigation);
