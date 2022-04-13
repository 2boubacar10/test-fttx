import React, { Component } from 'react';
import './dashboard.css'
import Header from '../header/index';
import FooterNavigation from '../footerNavigation/index';

class Dashboard extends Component {
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

    componentWillMount() {
        var userToken = this.state.userToken;
        if (!userToken) {
            window.location.reload()
        }
    }

    render() {
        return <div className="component-dashboard">
            <Header />
            <div className="content-section">

            </div>
            <FooterNavigation />
        </div>;
    }
}
export default Dashboard;