import React, { Component } from 'react';
import './paymentsList.css';
import Header from '../header/index';
import FooterNavigation from '../footerNavigation/index';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { connect } from 'react-redux';
import { fetchPaymentsByFreelancer } from '../../redux/Payment/payment-actions';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';

const { SearchBar } = Search;

function informations(cell, row) {
    return (<>
        <p className='fw-600'>{row.offer_name}</p>
        <p className='mt-0 fs-12'>{row.subscription_number} <span>{row.customer_name}</span></p>
    </>);
}

function paymentStatus(cell, row) {
    return (<>
        {cell === "CANCELLED" && <p className='mt-0 text-danger'>Echec {row.id && <NavLink className={'text-dark ms-3'} to={"/paiement/" + row.id}>Réessayer</NavLink>}</p>}
        {cell === "PENDING" && <p className='text-inprocess'>En cours</p>}
        {cell === "DONE" && <p className='text-success'>Envoyé</p>}


    </>);
}

function PriceAndDate(cell, row) {
    return (<>
        <p>{Intl.NumberFormat('fr-FR').format(parseInt(row.ttc || 0))} FCFA</p>
        <p className='mt-0 fs-12'><Moment format='DD/MM/YYYY'>{row.paid_at}</Moment></p>
    </>);
}

const columns = [
    {
        dataField: 'offer_name',
        text: 'offer name',
        formatter: informations,
        style: { width: 250 }
    },
    {
        dataField: 'status_name',
        text: 'status name',
        sort: true,
        formatter: paymentStatus,
        style: { width: 250, textAlign: "center" }
    },
    {
        dataField: 'paid_at',
        text: 'paid at',
        formatter: PriceAndDate,
        style: { width: 200, textAlign: "right" }
    },
];

class PaymentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: window.localStorage.getItem('userToken'),
            requestConfig: {
                headers: { Authorization: `Bearer ${window.localStorage.getItem('userToken')}` }
            },
            userID: window.localStorage.getItem('userID'),
            fetchingPaymentProgress: false
        };
    }

    componentWillMount() {
        this.setState({ fetchingPaymentProgress: true })

        var userToken = this.state.userToken;
        if (!userToken) {
            window.location.reload()
        }
    }

    componentDidMount() {
        var config = this.state.requestConfig;
        var userID = this.state.userID;
        var userToken = this.state.userToken;

        if (userID && userToken) {
            this.props.fetchPaymentsByFreelancer(userID, config)
        }
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.paymentsByFreelancer) {
            this.setState({ fetchingPaymentProgress: false })
        }
    }

    render() {
        if (this.state.fetchingPaymentProgress) {
            return "chargement ....";
        } else {
            const options = {
                custom: true,
                paginationSize: 4,
                pageStartIndex: 1,
                firstPageText: 'Première',
                prePageText: '<',
                nextPageText: '>',
                lastPageText: 'Dernier',
                nextPageTitle: 'Première page',
                prePageTitle: 'Page Precèdente',
                firstPageTitle: 'Page suivante',
                lastPageTitle: 'Dernière page',
                showTotal: true,
                totalSize: this.props.paymentsByFreelancer.length
            };

            const contentTable = ({ paginationProps, paginationTableProps }) => (
                <div>
                    <PaginationListStandalone {...paginationProps} />
                    <ToolkitProvider
                        keyField="subscription_number"
                        columns={columns}
                        data={this.props.paymentsByFreelancer}
                        search
                    >
                        {
                            toolkitprops => (
                                <div>
                                    <SearchBar
                                        {...toolkitprops.searchProps}
                                        placeholder={"Rechercher ..."}
                                        className={"w-auto mb-3"}
                                    />
                                    <BootstrapTable
                                        striped
                                        hover
                                        {...toolkitprops.baseProps}
                                        {...paginationTableProps}
                                        noDataIndication={() => ("Aucun paiement disponible.")}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                    <PaginationListStandalone {...paginationProps} />
                </div>
            );

            return <div className="component-payments-list">
                <Header />
                <div className="content-section">
                    <div className="container">
                        <h5 className='theme-title'>Liste des paiements</h5>

                        <div className="bootstrap-table-custom mt-4">
                            <PaginationProvider pagination={paginationFactory(options)}>
                                {contentTable}
                            </PaginationProvider>
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
        fetchPaymentsByFreelancer: (userId, config) => dispatch(fetchPaymentsByFreelancer(userId, config)),
    };

}

const mapStateToProps = state => {
    return {
        paymentsByFreelancer: state.payments.paymentsByFreelancer,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsList);