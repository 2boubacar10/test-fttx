import * as actionTypes from './area-types';

const INITIAL_STATE = {
    areas: []
}

const areaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_AREAS:
            return { allAreas: action.payload }

        default:
            return state;
    }
}

export default areaReducer;


