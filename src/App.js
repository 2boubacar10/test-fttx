import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthLogin from './components/authLogin/index';
import CreateSubscriptionRequest from './components/createSubscriptionRequest/index';
import ListOfSubscriptionRequests from './components/listOfSubscriptionRequests/index';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxToastr from 'react-redux-toastr';
import isAuthenticate from './modules/secure/Secure';
import 'rsuite/dist/rsuite.min.css';
import 'react-phone-input-2/lib/style.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Dashboard from './components/dashboard/index';
import PaymentView from './components/paymentView/index';

class App extends Component {
    render() {
        var isLogInExpired = isAuthenticate()

        return (
            <Router>
                <Provider store={store}>
                    <div>
                        <Switch >
                            <Route exact path="/" component={isLogInExpired || isLogInExpired === undefined ? AuthLogin : Dashboard} />
                            {!isLogInExpired ? <Route exact path="/paiement/:id" component={PaymentView} /> : <Redirect to={`/`} />}
                            <Route path="/dashboard">
                                {isLogInExpired || isLogInExpired === undefined ? <Redirect to={`/?next=${'/dashboard'}`} /> : <Dashboard />}
                            </Route>
                            <Route path="/souscription">
                                {isLogInExpired || isLogInExpired === undefined ? <Redirect to={`/?next=${'/souscription'}`} /> : <CreateSubscriptionRequest />}
                            </Route>
                            <Route path="/liste-des-souscriptions">
                                {isLogInExpired || isLogInExpired === undefined ? <Redirect to={`/?next=${'/liste-des-souscriptions'}`} /> : <ListOfSubscriptionRequests />}
                            </Route>
                        </Switch >
                        <ReduxToastr
                            timeOut={2000}
                            newestOnTop={false}
                            preventDuplicates
                            position="bottom-center"
                            getState={(state) => state.toastr}
                            transitionIn="fadeIn"
                            transitionOut="fadeOut"
                            progressBar
                            closeOnToastrClick />
                    </div>
                </Provider>
            </Router >
        );
    }
}

export default App;
