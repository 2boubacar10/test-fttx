import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr'
import areaReducer from './Area/area-reducer';
import buildingReducer from './Building/building-reducer';
import offerReducer from './Offer/offer-reducer';
import subscriptionReducer from './Subscription/subscription-reducer';
import userReducer from './User/user-reducer';


const rootReducer = combineReducers({
    toastr: toastrReducer,
    areas: areaReducer,
    buildings: buildingReducer,
    offers: offerReducer,
    subscriptions: subscriptionReducer,
    users: userReducer

});

export default rootReducer;