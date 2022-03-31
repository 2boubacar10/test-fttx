import api from "../../config/global-vars";
import * as actionTypes from './building-types';

export const fetchAllBuildings = () => {
    return async (dispatch) => {
        const url = api + 'buildings';
        const res = await fetch(url);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_ALL_BUILDINGS,
            payload: data.data,
        });
    }
};

export const fetchBuildingByArea = (areaId, config) => {
    return async (dispatch) => {
        const url = api + 'zone/' + areaId + '/buildings';
        const res = await fetch(url, config);
        const data = await res.json();

        dispatch({
            type: actionTypes.FETCH_BUILDINGS_BY_AREA,
            payload: data.data,
        });
    }
};

