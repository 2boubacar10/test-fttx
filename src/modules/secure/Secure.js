import jwt from 'jsonwebtoken'

export default function isAuthenticate() {
    const token = window.localStorage.getItem('userToken');

    var isExpired = false;
    if (token !== null || token !== undefined || token !== '') {
        var decodedToken = jwt.decode(token, { complete: true });
        var dateNow = parseInt(Date.now() / 1000);

        if (decodedToken) {
            if (decodedToken.payload.exp < dateNow) {
                isExpired = true
                return isExpired
            } else {
                return isExpired
            }
        }
    } else {
        return isExpired
    }

}