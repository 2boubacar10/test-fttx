import React, { Component } from 'react';
import './authLogin.css';
import Logo from '../../images/free.png'
import api from '../../config/global-vars';
import baseUrl from '../../config/backend-base-url';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { Loader } from 'rsuite';
import { VscEyeClosed, VscEye } from "react-icons/vsc";

export default class AuthLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: api,
            baseUrl: baseUrl,
            fields: {
                email: '',
                password: ''
            },
            loginInProgress: false,
            isLoginSuccess: false,
            isLoginFail: false,
            is_empty_email: false,
            is_empty_password: false,
            unauthorizedUser: false,
            validationIsNotDone: false,
            path: '',
            typePasswordInput: 'password',
        };
        this.handleChange = this.handleChange.bind(this)
        this.onSubmitLogin = this.onSubmitLogin.bind(this)
    }

    componentDidMount() {
        let path = window.location.search.split('?next=')[1];
        this.setState({ path, validationIsNotDone: true });
    }

    handleChange = (e) => {
        let fields = this.state.fields
        fields[e.target.name] = e.target.value

        this.setState({
            fields: fields,
            validationIsNotDone: false
        })
    }

    onValidateFormData = () => {
        let fields = this.state.fields
        var isValidForm = true

        if (!fields['email']) {
            isValidForm = false
            this.setState({ is_empty_email: true })
            setTimeout(() => {
                this.setState({ is_empty_email: false })
            }, 5000);
        }

        if (!fields['password']) {
            isValidForm = false
            this.setState({ is_empty_password: true })
            setTimeout(() => {
                this.setState({ is_empty_password: false })
            }, 5000);
        }

        return isValidForm;
    }

    onSubmitLogin = (e) => {
        e.preventDefault()

        if (this.onValidateFormData()) {
            this.setState({ loginInProgress: true })

            var api = this.state.api;
            var data = this.state.fields;

            axios.post(api + 'login', data)
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        window.localStorage.setItem('userToken', response.data.access_token)
                        this.setState({ loginInProgress: false })
                        toastr.success('Connexion réussie!');

                        setTimeout(() => {
                            if (this.state.path !== undefined && this.state.path !== '/') {
                                window.location = this.state.path;
                            } else {
                                window.location = "/dashboard";
                            }
                        }, 2000);
                    }
                })
                .catch((error) => {
                    this.setState({ loginInProgress: false })
                    if (error && error.response.data.error === "Unauthorized") {
                        this.setState({ unauthorizedUser: true })
                        setTimeout(() => {
                            this.setState({ unauthorizedUser: false })
                        }, 10000);
                    } else {
                        this.setState({ isLoginFail: true })
                        setTimeout(() => {
                            this.setState({ isLoginFail: false })
                        }, 5000);
                    }

                })
        }
    }

    handleClick = () => this.setState(({ typePasswordInput }) => ({
        typePasswordInput: typePasswordInput === 'text' ? 'password' : 'text'
    }))

    render() {
        return <div className="component-auth-login component-auth mt-5">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 px-sm-3 px-4">
                        <div className="auth-form">
                            <div className="d-flex justify-content-center">
                                <img src={Logo} className="app-logo" alt="Free Sénégal" />
                            </div>
                            <p className="auth-title">Identifiez-vous</p>
                            <form onSubmit={(e) => this.onSubmitLogin(e)}>
                                <div className="pb-4">
                                    <div className="error-login-message">
                                        {this.state.unauthorizedUser && <span className=' visible-block-fade-in'>L'identifiant ou le mot de passe est incorrect</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="loginemail">Numéro de téléphone ou e-mail</label>
                                        <input
                                            type="text"
                                            onChange={this.handleChange}
                                            name='email'
                                            className={`form-control ${this.state.is_empty_email && 'is-invalid'}`}
                                            id="loginemail"
                                            disabled={this.state.loginInProgress}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="LoginPassword">Mot de passe</label>
                                        <div className="input-password-theme">
                                            <input
                                                type={this.state.typePasswordInput}
                                                onChange={this.handleChange}
                                                name='password'
                                                className={`form-control ${this.state.is_empty_password && 'is-invalid'}`}
                                                id="LoginPassword"
                                                disabled={this.state.loginInProgress}
                                            />
                                            {this.state.fields.password.length > 0 &&
                                                <span className="btn-show-hide" onClick={this.handleClick}>{this.state.typePasswordInput === 'text' ? <VscEyeClosed /> : <VscEye />}</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {this.state.loginInProgress ?
                                    <button className="btn btn-theme d-flex justify-content-center align-items-center" disabled>Connexion en cours &nbsp; <Loader /></button>
                                    :
                                    <button type="submit" className="btn btn-theme">Connexion</button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
