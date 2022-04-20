import api from "../../config/global-vars";
import * as actionTypes from './user-types';

export const fetchUserConnected = (config) => {
    return async (dispatch) => {
        const url = api + 'user';
        const res = await fetch(url, { ...config, method: "POST" });
        const data = await res.json();

        if (data) {
            window.localStorage.setItem('userID', data.id)
            window.localStorage.setItem('userFirstname', data.firstname)
            window.localStorage.setItem('userLastname', data.lastname)
            window.localStorage.setItem('userFullname', data.firstname + ' ' + data.lastname)
            window.localStorage.setItem('userEmail', data.email)
        }
        dispatch({
            type: actionTypes.FETCH_USER_CONNECTED,
            payload: data,
        });
    }
};
