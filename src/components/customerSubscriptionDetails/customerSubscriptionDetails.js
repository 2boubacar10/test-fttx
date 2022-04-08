import React, { Component } from 'react';
import './customerSubscriptionDetails.css';
import { Modal } from 'rsuite';


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
								<table className="table table-striped table-customer-subscription-details">
									<tbody>
										<tr>
											<td className='fw-600'>Numéro de la demande</td>
											<td className='text-capitalize td-value'>{this.props.subscription.number}</td>
										</tr>
										{this.props.subscription.civility ?
											<tr>
												<td className='fw-600'>Civilité</td>
												<td className='text-capitalize td-value'>{this.props.subscription.civility}</td>
											</tr> : null
										}
										{this.props.subscription.firstname ?
											<tr>
												<td className='fw-600'>Nom</td>
												<td className='text-capitalize td-value'>{this.props.subscription.firstname}</td>
											</tr> : null
										}
										{this.props.subscription.lastname ?
											<tr>
												<td className='fw-600'>Prénom</td>
												<td className='text-capitalize td-value'>{this.props.subscription.lastname}</td>
											</tr> : null
										}
										{this.props.subscription.social_reason ?
											<tr>
												<td className='fw-600'>Raison Social</td>
												<td className='text-capitalize td-value'>{this.props.subscription.social_reason}</td>
											</tr> : null
										}
										{this.props.subscription.ninea ?
											<tr>
												<td className='fw-600'>Ninea</td>
												<td className='text-capitalize td-value'>{this.props.subscription.ninea}</td>
											</tr> : null
										}
										{this.props.subscription.commercial_register_number ?
											<tr>
												<td className='fw-600'>Numéro du registre de commerce</td>
												<td className='text-capitalize td-value'>{this.props.subscription.commercial_register_number}</td>
											</tr> : null
										}
										{this.props.subscription.commercial_register_url ?
											<tr>
												<td className='fw-600'>Registre de commerce</td>
												<td className='text-capitalize td-value'><span className="badge bg-success">Disponible</span></td>
											</tr> : null
										}
										<tr>
											<td className='fw-600'>Zone</td>
											<td className='text-capitalize td-value'>{this.props.subscription.zone ? this.props.subscription.zone.ref : this.props.subscription.zone_id}</td>
										</tr>
										<tr>
											<td className='fw-600'>Adresse</td>
											<td className='text-capitalize td-value'>{this.props.subscription.address}</td>
										</tr>
										<tr>
											<td className='fw-600'>Immeuble</td>
											<td className='text-capitalize td-value'>{this.props.subscription.building ? this.props.subscription.building.name : this.props.subscription.building_id}</td>
										</tr>
										<tr>
											<td className='fw-600'>Offre</td>
											<td className='text-capitalize td-value'>{this.props.subscription.offer ? this.props.subscription.offer.name : this.props.subscription.offer_id}</td>
										</tr>
										<tr>
											<td className='fw-600'>Téléphone</td>
											<td>+{this.props.subscription.phone_number}</td>
										</tr>
										<tr>
											<td className='fw-600'>Adresse e-mail</td>
											<td className='text-capitalize td-value'>{this.props.subscription.email}</td>
										</tr>
										<tr>
											<td className='fw-600'>Photo du contrat</td>
											<td className='text-capitalize'>
												<span className={`badge ${this.props.subscription.contract_photo_url ? "bg-success" : "bg-danger"}`}>{this.props.subscription.contract_photo_url ? "Disponible" : "Non disponible"}</span>
												{/* <div className='image-responsive image-thumbnail' style={{ background: `url(${this.props.subscription.contract_photo_url})` }}></div> */}
											</td>
										</tr>
										<tr>
											<td className='fw-600'>Type de pièce</td>
											<td className='text-capitalize td-value'>{this.props.subscription.identity_type}</td>
										</tr>
										<tr>
											<td className='fw-600'>{this.props.subscription.identity_type === "cni" ? "Pièce d'identité(recto)" : "Passeport"}</td>
											<td className='text-capitalize'>
												<span className={`badge ${this.props.subscription.identity_photo_recto_url ? "bg-success" : "bg-danger"}`}>{this.props.subscription.identity_photo_recto_url ? "Disponible" : "Non disponible"}</span>
												{/* <div className='image-responsive image-thumbnail' style={{ background: `url(${this.props.subscription.identity_photo_recto_url})` }}></div> */}
											</td>
										</tr>
										{this.props.subscription.identity_photo_verso_url &&
											<tr>
												<td className='fw-600'>Pièce d'identité(verso)</td>
												<td>
													<span className={`badge ${this.props.subscription.identity_photo_verso_url ? "bg-success" : "bg-danger"}`}>{this.props.subscription.identity_photo_verso_url ? "Disponible" : "Non disponible"}</span>
												</td>
												{/* <td className='text-capitalize td-value'>{this.props.subscription.identity_photo_verso_url}</td> */}
											</tr>
										}
										<tr>
											<td className='fw-600'>Moyen de paiement</td>
											<td className='text-capitalize td-value'>{this.props.subscription.payment_method}</td>
										</tr>
									</tbody>
								</table>
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
