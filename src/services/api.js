import axios from 'axios';
import {setupCache} from 'axios-cache-interceptor';
import {StorageService} from './storage';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

let token = StorageService.getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
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
