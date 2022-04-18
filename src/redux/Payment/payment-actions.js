import api from "../../config/global-vars";
import * as actionTypes from './payment-types';

export const fetchPaymentsByFreelancer = (userId, config) => {

    return async (dispatch) => {
        const url = api + 'subscriptions/' + userId + '/payments';
        const res = await fetch(url, config);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_PAYMENTS_BY_FREELANCER,
            payload: data.data.reverse(),
        });
    }
};
