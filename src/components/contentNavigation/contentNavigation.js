import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './contentNavigation.css';
import { IoPower } from 'react-icons/io5'

export default class ContentNavigation extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

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
                    <NavLink className={'trans-0-2'} to={"/dashboard"}>Tableau de bord</NavLink>
                </li>
                <li>
                    <NavLink className={'trans-0-2'} to={"/liste-des-souscriptions"}>Liste des demandes de souscriptions</NavLink>
                </li>
                <li>
                    <NavLink className={'trans-0-2'} to={"/souscription"}>Créer une demande de souscription</NavLink>
                </li>
                <li className='mt-5'>
                    <button onClick={this.onLogoutUser} className='logout-btn trans-0-2'><IoPower />Déconnexion</button>
                </li>
            </ul>
        </div>;
    }
}
