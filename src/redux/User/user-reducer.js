import * as actionTypes from './user-types';

const INITIAL_STATE = {
    users: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_CONNECTED:
            return { connectedUser: action.payload }

        default:
            return state;
    }
}

export default userReducer;


