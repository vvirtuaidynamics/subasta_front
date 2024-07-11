import {boot} from "quasar/wrappers";
import axios from "axios";

const api_url = process.env.API_URL;
const api = axios.create({
  baseURL: api_url,
  withXSRFToken: true,
  withCredentials: true,
});

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default boot(({app}) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export {api, axios, api_url};
