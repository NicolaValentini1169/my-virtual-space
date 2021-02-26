import http from "../../services/httpService";
import config from "../../config.json";
import constants from "../../constants.json";

const getConf = () => {
    const headers = {'Content-Type': 'application/json'};
    return {headers};
}

const handleLogin = credential => {
    return http
        .post(config.apiLoginEndpoint, credential, getConf())
        .then(({data: user}) => {
            return user;
        })
        .catch(onrejected => {
            return onrejected;
        });
};

const handleRegistration = credential => {
    return http
        .put(config.apiRegistrationEndpoint, credential, getConf())
        .then(({data: user}) => {
            return user;
        })
        .catch(onrejected => {
            return onrejected;
        });
};

const handleCheckToken = path => {
    if (localStorage.getItem(constants.accessToken)) {
        http
            .post(
                config.apiCheckTokenEndpoint,
                localStorage.getItem(constants.accessToken),
                getConf(),
            )
            .then(({data: user}) => {
                return user;
            })
            .catch(error => {
                return null;
            });
    }
};

const exports = {
    handleLogin,
    handleRegistration,
    handleCheckToken
}

export default exports;