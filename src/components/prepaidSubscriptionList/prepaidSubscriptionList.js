import React, { Component } from 'react';
import './prepaidSubscriptionList.css';
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
        return "Il n'y a pas des souscriptions prépaiement disponible!";
    }

    render() {
        return <div className="component-prepaid-subscription-list">
            <div className="col bootstrap-table-custom">
                <BootstrapTable
                    keyField='id'
                    columns={columns}
                    data={this.props.particularSubscriptions || []}
                    bordered={false}
                    pagination={paginationFactory()}
                    noDataIndication={this.noDataMessage}
                />
            </div>
        </div>;
    }


}

export default PrepaidSubscriptionList;