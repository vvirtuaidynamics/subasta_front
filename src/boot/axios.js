import { boot } from "quasar/wrappers";
import axios from "axios";
import app from "../config/app"
const api = axios.create({
  baseURL: app.api_url,
});
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
