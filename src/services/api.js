import axios from 'axios';
import {setupCache} from 'axios-cache-interceptor';
import {StorageService} from './storage';
import {utils} from 'src/helpers/utils';
import {useApp} from "src/composables/useApp";

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;

const {token, user, setAppState} = useApp();

// let token = StorageService.getToken();
if (token.value) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    utils.sendMsg({msg: `${$t('Invalid token')}`, type: 'negative'});
    StorageService.removeAuthStore();
  }
  return Promise.reject(error);
})

export const ApiService = {
  init() {
    setupCache(axios, {interpretHeader: false});
  },
  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(apiPath, options = {cache: false}) {
    return axios.get(apiPath, options)
  },

  download(apiPath) {
    return axios({
      url: apiPath,
      method: 'GET',
      responseType: 'blob',
    })
  },

  post(apiPath, data) {
    return axios.post(apiPath, data);
  },

  put(apiPath, data) {
    return axios.put(apiPath, data)
  },

  patch(apiPath, data) {
    return axios.patch(apiPath, data)
  },

  delete(apiPath) {
    return axios.delete(apiPath)
  },

  axios() {
    return axios;
  },


}
