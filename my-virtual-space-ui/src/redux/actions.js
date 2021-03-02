import actionTypes from './actionTypes';
import routes from '../routes.json';

const setRedirect = (redirect = routes.home) => ({
    type: actionTypes.SETREDIRECT,
    payload: {
        redirect
    }
})

const actions = {
    setRedirect
}

export default actions;