import api from "../../config/global-vars";
import * as actionTypes from './offer-types';

export const fetchAllOffers = (config) => {
    return async (dispatch) => {
        const url = api + 'offers';
        const res = await fetch(url, config);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_ALL_OFFERS,
            payload: data.data,
        });
    }
};

export const fetchOffersByOfferType = (offer_type, config) => {
    return async (dispatch) => {
        const url = api + 'profile_type/' + offer_type + '/offers';
        const res = await fetch(url, config);
        const data = await res.json();
        console.log('daaaaaaaaaaaa', data)
        dispatch({
            type: actionTypes.FETCH_OFFERS_BY_OFFER_TYPE,
            payload: data.data,
        });
    }
};


