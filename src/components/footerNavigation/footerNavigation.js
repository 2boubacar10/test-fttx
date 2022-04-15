import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './footerNavigation.css';
import { IoHomeOutline, IoCreateOutline, IoCashOutline } from 'react-icons/io5';


export default class FooterNavigation extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
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
            <NavLink className={"nav-button trans-0-2"} to={"/liste-des-paiements"}>
                <IoCashOutline />
                <span>Paiement</span>
            </NavLink>
        </div>;
    }
}
