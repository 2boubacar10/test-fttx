import React, { Component } from 'react';
import './postpaiedSubscriptionList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import CustomerSubscriptionDetails from '../customerSubscriptionDetails/index';
import { NavLink } from 'react-router-dom';
import { ImFileText2 } from 'react-icons/im';

const { SearchBar } = Search;

function subscriptionDetails(cell, row) {
    return (
        <CustomerSubscriptionDetails subscription={row} />
    );
}

function phone(cell, row) {
    return "+" + cell;
}

const columns = [
    {
        dataField: 'number',
        text: 'Identifiant',
        formatter: subscriptionDetails,
        headerStyle: (column, colIndex) => {
            return { width: 130 };
        }
    },
    {
        dataField: 'social_reason',
        text: 'Raison Social',
        headerStyle: (column, colIndex) => {
            return { width: 135 };
        }
    },
    {
        dataField: 'ninea',
        text: 'Ninea',
        headerStyle: (column, colIndex) => {
            return { width: 135 };
        }
    },
    {
        dataField: 'phone_number',
        text: 'Téléphone',
        formatter: phone,
        headerStyle: (column, colIndex) => {
            return { width: 135 };
        }
    },
    {
        dataField: 'address',
        text: 'Adresse',
        headerStyle: (column, colIndex) => {
            return { width: 200 };
        }
    }
];
export default class PostpaiedSubscriptionList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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
            totalSize: this.props.professionnalSubscriptions.length
        };

        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <PaginationListStandalone {...paginationProps} />
                <ToolkitProvider
                    keyField="id"
                    columns={columns}
                    data={this.props.professionnalSubscriptions}
                    search
                >
                    {
                        toolkitprops => (
                            <div>
                                <div className="mb-3 d-flex justify-content-between">
                                    <SearchBar
                                        {...toolkitprops.searchProps}
                                        placeholder={"Rechercher ..."}
                                        className={"w-auto"}
                                    />
                                    <NavLink to={"/souscription"} className={"btn-icon-theme-light trans-0-2"}><ImFileText2 /></NavLink>
                                </div>
                                <BootstrapTable
                                    striped
                                    hover
                                    {...toolkitprops.baseProps}
                                    {...paginationTableProps}
                                    noDataIndication={() => ("Aucune souscription postpayée disponible.")}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                <PaginationListStandalone {...paginationProps} />
            </div>
        );
        return <div className="component-postpaied-subscription-list">
            <div className="col bootstrap-table-custom">
                <PaginationProvider pagination={paginationFactory(options)}>
                    {contentTable}
                </PaginationProvider>
            </div>
        </div>;
    }
}
