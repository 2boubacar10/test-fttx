import React, { Component } from 'react';
import './customerSubscriptionDetails.css';
import { Modal } from 'rsuite';
import SubscriptionDetailsRows from '../subscriptionDetailsRows/index';


export default class CustomerSubscriptionDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSubscriptionDetails: false
		};
	}


	closeSubscriptionDetails = (e) => {
		this.setState({ showSubscriptionDetails: false });
	}

	openSubscriptionDetails = () => {
		this.setState({ showSubscriptionDetails: true });
	}

	render() {
		return <div className="component-customer-subscription-details">
			<span onClick={() => this.openSubscriptionDetails()} className='souscriptionId'>#{this.props.subscription.number}</span>


			{/* Modal details de souscription  */}
			<div className="modal-container message-confirmation">
				<Modal size="md" open={this.state.showSubscriptionDetails} backdrop={true} onClose={this.closeSubscriptionDetails} className="rsuite-content-modal-custom">
					<form>
						<Modal.Header>
							<Modal.Title>Détails de la souscription</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className='mt-4'>Statut de la demande:</div>
							<span className='fw-700'>{this.props.subscription.subscription_status.name.replace(/_/g, " ")}</span>

							<div className="mt-5 mb-3 table-responsive">
								<SubscriptionDetailsRows subscription={this.props.subscription} />
							</div>
						</Modal.Body>
						<Modal.Footer className="text-center">

						</Modal.Footer>
					</form>
				</Modal>
			</div>
		</div>;
	}
}
