import * as actionTypes from './offer-types';

const INITIAL_STATE = {
    offers: []
}

const offerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_OFFERS:
            return { allOffers: action.payload }
        case actionTypes.FETCH_OFFERS_BY_OFFER_TYPE:
            return { offerByOfferType: action.payload }

        default:
            return state;
    }
}

export default offerReducer;


