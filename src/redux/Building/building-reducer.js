import * as actionTypes from './building-types';

const INITIAL_STATE = {
    buildings: []
}

const buildingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_BUILDINGS:
            return { allBuildings: action.payload }
        case actionTypes.FETCH_BUILDINGS_BY_AREA:
            return { buildingsByArea: action.payload }

        default:
            return state;
    }
}

export default buildingReducer;


