import api from "../../config/global-vars";
import * as actionTypes from './user-types';

export const fetchUserConnected = (config) => {
    return async (dispatch) => {
        const url = api + 'user';
        const res = await fetch(url, { ...config, method: "POST" });
        const data = await res.json();
        console.log('user', data)
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



// onGetConnectedUserInfos = (config) => {
//     var api = this.state.api
//     var baseUrl = this.state.baseUrl

//     axios.get(api + 'auth/me', config)
//         .then(response => {
//             this.setState({ loginInProgress: false })
//             if (response.status === 200) {
//                 window.localStorage.setItem('userID', response.data.id)
//                 window.localStorage.setItem('userFirstname', response.data.firstname)
//                 window.localStorage.setItem('userLastname', response.data.lastname)
//                 window.localStorage.setItem('userFullname', response.data.firstname + ' ' + response.data.lastname)
//                 window.localStorage.setItem('userEmail', response.data.email)
//                 window.localStorage.setItem('userType', response.data.role)
//                 window.localStorage.setItem('userStatus', response.data.is_active)

//                 setTimeout(() => {
//                     this.setState({ loginInProgress: false })
//                     if (this.state.path !== undefined && this.state.path !== '/connexion') {
//                         window.location = this.state.path
//                     }
//                     else if (window.location.href === `${baseUrl}/connexion`) {
//                         window.location = "/boutique"
//                     }
//                     else { window.location.reload() }

//                 }, 500);

//             }
//         })