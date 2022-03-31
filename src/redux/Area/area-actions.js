import api from "../../config/global-vars";
import * as actionTypes from './area-types';

export const fetchAllAreas = (config) => {

    return async (dispatch) => {
        const url = api + 'zones';
        const res = await fetch(url, config);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_ALL_AREAS,
            payload: data.data,
        });
    }
};


