import actionTypes from './actionTypes';
import routes from '../routes.json';

export default function reducer(state = {redirect: routes.urls.home}, action) {
    switch (action.type) {
        case actionTypes.SETREDIRECT: {
            if (action.payload.redirect !== state.redirect) {
                return {...state, redirect: action.payload.redirect};
            } else return state;
        }
        default:
            return state;
    }
}