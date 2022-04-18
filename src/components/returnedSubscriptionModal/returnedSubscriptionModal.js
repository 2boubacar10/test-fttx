import React, { Component } from 'react';
import './returnedSubscriptionModal.css';
import { Modal } from 'rsuite';
import SubscriptionDetailsRows from '../subscriptionDetailsRows/index';

export default class ReturnedSubscriptionModal extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
        return <Modal size="md" open={this.props.showReturnedSubscription} backdrop={true} onClose={this.props.closeSubscriptionDetails} className="rsuite-content-modal-custom">
            <form>
                <Modal.Header>
                    <Modal.Title>Souscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {this.props.subscription ?
                        <> */}
                    <div className='mt-4'>Statut de la demande:</div>
                    <span className='fw-700'>{this.props.subscription.subscription_status.name.replace(/_/g, " ")}</span>

                    <div className="mt-5 mb-3 table-responsive">
                        <SubscriptionDetailsRows subscription={this.props.subscription} />
                    </div>
                    {/* </>
                        :
                        <>
                            <p>La demande de souscription # est introuvable!</p>
                        </>
                    } */}
                </Modal.Body>
                <Modal.Footer className="text-center">

                </Modal.Footer>
            </form>
        </Modal>
            ;
    }
}
