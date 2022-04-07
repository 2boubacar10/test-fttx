import React, { Component } from 'react';
import './postpaiedSubscriptionList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import CustomerSubscriptionDetails from '../customerSubscriptionDetails/index';

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

    noDataMessage() {
        return "Il n'y a pas de souscription post paiement trouvé!";
    }

    render() {
        const options = {
            custom: true,
            paginationSize: 4,
            pageStartIndex: 1,
            firstPageText: 'Première',
            prePageText: 'Retour',
            nextPageText: 'Suivant',
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
                    noDataMessage={this.noDataMessage}
                // bordered={false}
                >
                    {
                        toolkitprops => (
                            <div>
                                <SearchBar
                                    {...toolkitprops.searchProps}
                                    placeholder={"Rechercher ..."}
                                    className={"mb-3 w-auto"}
                                />
                                <BootstrapTable
                                    striped
                                    hover
                                    {...toolkitprops.baseProps}
                                    {...paginationTableProps}
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
