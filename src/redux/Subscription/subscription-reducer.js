import * as actionTypes from './subscription-types';

const INITIAL_STATE = {
    subscriptions: []
}

const subscriptionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_SUBSCRIPTIONS:
            return { allSubscriptions: action.payload }
        case actionTypes.FETCH_PARTICULAR_SUBSCRIPTION_BY_FREELANCER:
            return { particularSubscriptionsByFreelancer: action.payload }
        case actionTypes.FETCH_PROFESSIONNAL_SUBSCRIPTION_BY_FREELANCER:
            return { professionnalSubscriptionsByFreelancer: action.payload }
        case actionTypes.FETCH_SUBSCRIPTION_BY_ID:
            return { subscriptionById: action.payload }

        default:
            return state;
    }
}

export default subscriptionReducer;


