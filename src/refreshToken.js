import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import config from './config'

import { useHistory } from 'react-router-dom'

const history = useHistory();

const refreshAuthLogic = failedRequest =>
    axios.post(`${config.refresh}`, {
        "refreshToken": `${localStorage.getItem("refreshToken")}`
    })
        .then(tokenRefreshResponse => {
            localStorage.setItem('accessToken', tokenRefreshResponse.data.accessToken);
            localStorage.setItem('refreshToken', tokenRefreshResponse.data.refreshToken);
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.accessToken;
            return Promise.resolve();
        })
        .catch(() => {
            localStorage.clear();
            history.push('/');
        });

createAuthRefreshInterceptor(axios, refreshAuthLogic);