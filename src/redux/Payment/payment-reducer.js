import * as actionTypes from './payment-types';

const INITIAL_STATE = {
    payments: []
}

const paymentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PAYMENTS_BY_FREELANCER:
            return { paymentsByFreelancer: action.payload }

        default:
            return state;
    }
}

export default paymentReducer;


