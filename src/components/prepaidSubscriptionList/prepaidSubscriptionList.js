import React, { Component } from 'react';
import './prepaidSubscriptionList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import CustomerSubscriptionDetails from '../customerSubscriptionDetails/index';

const { SearchBar } = Search;

function rankFormatter(cell, row) {
    return (
        <CustomerSubscriptionDetails subscription={row} />
    );
}

const columns = [
    {
        dataField: 'number',
        text: 'Identifiant',
        formatter: rankFormatter,
        headerStyle: (colum, colIndex) => {
            return { width: 130 };
        }
    },
    {
        dataField: 'firstname',
        text: 'Prénom',
        sort: true,
        headerStyle: (colum, colIndex) => {
            return { width: 150 };
        }
    },
    {
        dataField: 'lastname',
        text: 'Nom de famille',
        headerStyle: (colum, colIndex) => {
            return { width: 180 };
        }
    },
    {
        dataField: 'phone_number',
        text: 'Téléphone',
        headerStyle: (colum, colIndex) => {
            return { width: 135 };
        }
    },
    {
        dataField: 'address',
        text: 'Adresse',
        headerStyle: (colum, colIndex) => {
            return { width: 200 };
        }
    }
];



class PrepaidSubscriptionList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    noDataMessage() {
        return "Il n'y a pas de souscription prépaiement disponible!";
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
            totalSize: this.props.particularSubscriptions.length
        };

        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <PaginationListStandalone {...paginationProps} />
                <ToolkitProvider
                    keyField="id"
                    columns={columns}
                    data={this.props.particularSubscriptions}
                    search
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

        return <div className="component-prepaid-subscription-list">
            <div className="col bootstrap-table-custom">
                <PaginationProvider pagination={paginationFactory(options)}>
                    {contentTable}
                </PaginationProvider>
            </div>
        </div>;
    }


}

export default PrepaidSubscriptionList;