import React, { Component } from 'react';
import './postpaiedSubscriptionList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [
    {
        dataField: 'number',
        text: 'Identifiant',
        headerStyle: (colum, colIndex) => {
            return { width: 130 };
        }
    },
    {
        dataField: 'social_reason',
        text: 'Raison Social',
        headerStyle: (colum, colIndex) => {
            return { width: 135 };
        }
    },
    {
        dataField: 'ninea',
        text: 'Ninea',
        headerStyle: (colum, colIndex) => {
            return { width: 135 };
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
export default class PostpaiedSubscriptionList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    noDataMessage() {
        return "Il n'y a pas des souscriptions postpayement disponible!";
    }

    render() {
        return <div className="component-postpaied-subscription-list">
            <div className="col bootstrap-table-custom">
                <BootstrapTable
                    keyField='id'
                    columns={columns}
                    data={this.props.professionnalSubscriptions || []}
                    bordered={false}
                    pagination={paginationFactory()}
                    noDataIndication={this.noDataMessage}
                />
            </div></div>;
    }
}
