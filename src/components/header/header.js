import React, { Component } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/free.png'
import ContentNavigation from '../contentNavigation/index';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenSize: window.screen.width
        };
        this.openThemeSidebar = this.openThemeSidebar.bind(this);
        this.closeThemeSidebar = this.closeThemeSidebar.bind(this);
    }

    openThemeSidebar(e) {
        e.preventDefault();

        let themeSidenav = null;
        let themeBackdrop = null

        themeSidenav = document.getElementById("themeSidenav");
        themeSidenav.style.left = "0";

        themeBackdrop = document.getElementById("themeBackdrop");
        if (themeBackdrop) {
            themeBackdrop.setAttribute(
                "style", "position: fixed; display: block; background: #000000; opacity: 0.5; left: 0; right: 0; top: 0; bottom: 0; z-index: 1031; cursor: pointer;"
            );
        }
    }

    closeThemeSidebar(e) {
        e.preventDefault();

        let themeBackdrop = null
        let themeSidenav = document.getElementById("themeSidenav")

        themeSidenav.style.left = "-250px";

        themeBackdrop = document.getElementById("themeBackdrop");
        if (themeBackdrop) {
            themeBackdrop.setAttribute(
                "style", "display: none; transition: .5s ease;"
            );
        }
    }

    render() {
        return <div className="component-header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light box-shadow fixed-top">
                <div className="container-fluid">

                    <button className="btnCloseOpenThemeSidenavMobile open-icon" onClick={(e) => this.openThemeSidebar(e)}><HiOutlineMenuAlt1 /></button>
                    <NavLink className="" to={"/"}>
                        <img src={Logo} className="app-logo header" alt="Free Sénégal" />
                    </NavLink>
                    <div id="themeBackdrop" onClick={(e) => this.closeThemeSidebar(e)}></div>
                    <div id="themeSidenav" className="theme-sidenav">
                        <button className="btnCloseOpenThemeSidenavMobile close-icon" onClick={(e) => this.closeThemeSidebar(e)}><IoMdClose /></button>

                        <div className="content-sidebar-theme">
                            <ContentNavigation />
                        </div>
                    </div >
                </div>
            </nav>
        </div>;
    }
}
