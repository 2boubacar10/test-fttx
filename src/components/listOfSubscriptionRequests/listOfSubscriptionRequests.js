import React, { Component } from 'react';
import './listOfSubscriptionRequests.css';
import FooterNavigation from '../footerNavigation/index';
import Header from '../header/index';
import PrepaidSubscriptionList from '../prepaidSubscriptionList/index';
import PostpaiedSubscriptionList from '../postpaiedSubscriptionList/index';
import { connect } from 'react-redux';
import { fetchParticularSubscriptionsByFreelancer, fetchProfessionnelSubscriptionsByFreelancer } from '../../redux/Subscription/subscription-actions';
import { NavLink } from "react-router-dom";
import { IoAddOutline } from 'react-icons/io5';
import LoadingPage from '../loadingPage/index';

class ListOfSubscriptionRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestConfig: {
                headers: { Authorization: `Bearer ${window.localStorage.getItem('userToken')}` }
            },
            userID: window.localStorage.getItem('userID'),
            particularSubscriptions: [],
            professionnalSubscriptions: [],
            fetchingSubscriptionProgress: false
        };
    }

    componentDidMount() {
        var config = this.state.requestConfig;
        var userID = this.state.userID;
        
        this.setState({ fetchingSubscriptionProgress: true })

        if (userID && config) {
            this.props.fetchParticularSubscriptionsByFreelancer(userID, config)
            this.props.fetchProfessionnelSubscriptionsByFreelancer(userID, config)
        }
    }

    UNSAFE_componentWillReceiveProps(prevProps) {
        if (prevProps.particularSubscriptions) {
            this.setState({ particularSubscriptions: prevProps.particularSubscriptions, fetchingSubscriptionProgress: false })
        }
        if (prevProps.professionnalSubscriptions) {
            this.setState({ professionnalSubscriptions: prevProps.professionnalSubscriptions, fetchingSubscriptionProgress: false  })
        }
    }

    render() {
        if (this.state.fetchingSubscriptionProgress) {
            return <LoadingPage />
        } else {
            return <div className="component-list-of-subscription-requests">
                <Header />
                <div className="content-section">
                    <div className="container-fluid">
                        <h5 className='theme-title'>Liste des souscriptions</h5>
                        <div className="mt-3"><nav>
                            <div className="theme-tabs nav nav-tabs  justify-content-center mt-4" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-particulier-tab" data-bs-toggle="tab" data-bs-target="#nav-particulier" type="button" role="tab" aria-controls="nav-particulier" aria-selected="true">Particulier</button>
                                <button className="nav-link" id="nav-professionnel-tab" data-bs-toggle="tab" data-bs-target="#nav-professionnel" type="button" role="tab" aria-controls="nav-professionnel" aria-selected="false">Professionnel</button>
                            </div>
                        </nav>
                            <div className="tab-content pt-5" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-particulier" role="tabpanel" aria-labelledby="nav-particulier-tab">
                                    <NavLink className={"link-theme-with-icon mb-3 trans-0-2"} to={'/souscription'}><IoAddOutline />Créer une souscription</NavLink>
                                    <PrepaidSubscriptionList
                                        particularSubscriptions={this.state.particularSubscriptions}
                                    />
                                </div>
                                <div className="tab-pane fade" id="nav-professionnel" role="tabpanel" aria-labelledby="nav-professionnel-tab">
                                    <PostpaiedSubscriptionList
                                        professionnalSubscriptions={this.state.professionnalSubscriptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterNavigation />
            </div>;
        }
        }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchParticularSubscriptionsByFreelancer: (userId, config) => dispatch(fetchParticularSubscriptionsByFreelancer(userId, config)),
        fetchProfessionnelSubscriptionsByFreelancer: (userId, config) => dispatch(fetchProfessionnelSubscriptionsByFreelancer(userId, config)),
    };

}

const mapStateToProps = state => {
    return {
        particularSubscriptions: state.subscriptions.particularSubscriptionsByFreelancer,
        professionnalSubscriptions: state.subscriptions.professionnalSubscriptionsByFreelancer,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfSubscriptionRequests);