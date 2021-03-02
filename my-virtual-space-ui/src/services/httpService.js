import axios from 'axios';
import routes from '../routes.json';
import {createTakeLatest} from './takeLatest';

axios.interceptors.response.use(null, error => {
    if (
        error.response &&
        error.response.status === 401 &&
        window.location.pathname !== routes.login
    ) {
        //UNAUTHORIZED
        window.location.replace(window.location.origin + routes.login);
    } else if (error.response && error.response.status === 403) {
        //FORBIDDEN
        let shouldRedirect = false;

        if (error.response.data) {
            Object.keys(error.response.data).forEach(key => {
                if (key !== 'timestamp' && key !== 'message' && key !== 'details') {
                    shouldRedirect = true;
                }
            });
        }

        if (shouldRedirect) {
            window.location.replace(window.location.origin + routes.urls.home);
        }
    }

    return Promise.reject(error);
});

const exports = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    CancelToken: axios.CancelToken,
    isCancel: axios.isCancel,
    takeLatest: (() => createTakeLatest())(),
    methods: {
        GET: 'get',
        POST: 'post',
        PUT: 'put',
        DELETE: 'delete',
    },
}

export default exports;
