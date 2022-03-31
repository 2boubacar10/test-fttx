import React, { Component } from 'react';
import './dashboard.css'
import Header from '../header/index';
import FooterNavigation from '../footerNavigation/index';

class Dashboard extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    render() {
        return <div className="component-dashboard">
            <Header />
            <div className="content-section">
                <h5 className='theme-title'>Tableau de bord</h5>

            </div>
            <FooterNavigation />
        </div>;
    }
}
export default Dashboard;