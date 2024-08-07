import {utils} from "src/helpers/utils";
import {LocalStorage, SessionStorage} from "quasar"
import AppConfig from "src/config/app"


// a unique key that identifies app storage values
export const AppStoreKey = process.env.APP_NAME || "APP";

// key for user access token
export const AUTH_DATA_KEY = `${AppStoreKey}_AUTH_STORE`
export const TOKEN_KEY = `${AppStoreKey}_AUTH_TOKEN`;


// key to remember user locale
export const LOCALE_KEY = AppStoreKey + "_LOCALE";
export const LOCALE_KEY_DATA = AppStoreKey + "_LOCALE_DATA";
export const DARK_KEY = AppStoreKey + "_DARK";

export const encryptStore =
  `${process.env.NODE_ENV}` === "production" ||
  `${process.env.STORAGE_CIPHER}` === "true";

export const StorageService = {
  getDeviceId() {
    return LocalStorage.getItem("_capuid") ?? "";
  },

  set(key, value, remember = false) {
    let data = null;
    data = encryptStore ? utils.encrypt(value) : value; //JSON.stringify(value); //este metodo ya hace el JSON.stringify
    if (remember) {
      LocalStorage.set(key, data);
    } else {
      SessionStorage.set(key, data);
    }
  },

  get(key) {
    const predata =
      SessionStorage.getItem(key) || LocalStorage.getItem(key);
    let data = null;
    data = encryptStore ? utils.decrypt(predata) : predata;//JSON.parse(predata);
    return data;
  },

  remove(key) {
    SessionStorage.remove(key);
    LocalStorage.remove(key);
  },

  setAuthStore(userData, remember) {
    this.set(AUTH_DATA_KEY, userData, remember);
  },

  getAuthStore() {
    return this.get(AUTH_DATA_KEY);
  },

  removeAuthStore() {
    this.remove(AUTH_DATA_KEY);
    this.remove(TOKEN_KEY);
  },

  setUserConfig(user, config, remember = false) {
    const keyUserConfig = `${AppStoreKey}_${utils.upper(user)}`;
    this.set(keyUserConfig, config, remember);
  },

  getUserConfig(username) {
    const keyUserConfig = `${AppStoreKey}_${utils.upper(username)}_CONFIG`;
    return this.get(keyUserConfig);
  },

  removeUserConfig(username) {
    const keyUserConfig = `${AppStoreKey}_${utils.upper(username)}`;
    this.remove(keyUserConfig)
  },

  setToken(token, remember = false) {
    this.set(TOKEN_KEY, token, remember);
  },

  getToken() {
    return this.get(TOKEN_KEY);
  },

  setLocale(locale) {
    this.set(LOCALE_KEY, locale, true);
  },

  getLocale() {
    return this.get(LOCALE_KEY);
  },

  setLocaleData(data, remember = false) {
    this.set(LOCALE_KEY_DATA, data, remember);
  },

  getLocaleData() {
    return this.get(LOCALE_KEY_DATA);
  },

  getDark() {
    return this.get(DARK_KEY);
  },
  setDark(dark) {
    this.set(DARK_KEY, `${dark}`);
  },
};
