import api from "../../config/global-vars";
import * as actionTypes from './subscription-types';

export const fetchAllSubscriptions = (config) => {
    return async (dispatch) => {
        const url = api + 'subscriptions';
        const res = await fetch(url, config);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_ALL_SUBSCRIPTIONS,
            payload: data.data,
        });
    }
};

export const fetchParticularSubscriptionsByFreelancer = (userId, config) => {
    console.log('data', userId, config)
    return async (dispatch) => {
        const url = api + 'user/' + userId + '/particularSubscriptions';
        const res = await fetch(url, config);
        const data = await res.json();
        console.log('subscription', data)
        dispatch({
            type: actionTypes.FETCH_PARTICULAR_SUBSCRIPTION_BY_FREELANCER,
            payload: data.data,
        });
    }
};

export const fetchProfessionnelSubscriptionsByFreelancer = (userId, config) => {
    return async (dispatch) => {
        const url = api + 'user/' + userId + '/professionnalSubscriptions';
        const res = await fetch(url, config);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_PROFESSIONNAL_SUBSCRIPTION_BY_FREELANCER,
            payload: data.data,
        });
    }
};

export const fetchSubscriptionById = (subscriptionId, config) => {
    return async (dispatch) => {
        const url = api + 'subscriptions/' + subscriptionId;
        const res = await fetch(url, config);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_SUBSCRIPTION_BY_ID,
            payload: data.data,
        });
    }
};

