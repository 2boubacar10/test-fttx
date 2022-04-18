import React, { Component } from 'react';
import './prepaidSubscriptionList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import CustomerSubscriptionDetails from '../customerSubscriptionDetails/index';
import { NavLink } from 'react-router-dom';
import { BsFileEarmarkPlus } from 'react-icons/bs';

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
        formatter: phone,
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
                                    <NavLink to={"/souscription"} className={"btn-icon-theme-light trans-0-2"}><BsFileEarmarkPlus /></NavLink>
                                </div>
                                <BootstrapTable
                                    striped
                                    hover
                                    {...toolkitprops.baseProps}
                                    {...paginationTableProps}
                                    noDataIndication={() => ("Aucune souscription prépayée disponible.")}
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