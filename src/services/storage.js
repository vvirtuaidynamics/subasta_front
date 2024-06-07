/**
 * Manage the how Access User Login data and Auth Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to sessionStorage or localStorage
 **/
import { utils } from "src/helpers/utils";
// a unique key that identifies app storage values
const AppStoreKey = process.env.APP_NAME || "APP";

// key for user access token
const AUTH_DATA = "AuthStore";
const TOKEN_KEY = AppStoreKey + "_TOKEN";

// key to remember user locale
const LOCALE_KEY = AppStoreKey + "_LOCALE";
const DARK_KEY = AppStoreKey + "_DARK";

const encryptStore =
  `${process.env.NODE_ENV}` === "production" ||
  `${process.env.STORAGE_CIPHER}` === "true";

export const StorageService = {
  getDeviceId() {
    return localStorage.getItem("_capuid") ?? "";
  },
  setUserConfig(user, config) {
    const keyUserConfig = `${AppStoreKey}_${utils.upper(user)}`;
    let data = null;
    if (encryptStore) {
      data = utils.encrypt(config);
    } else {
      data = JSON.stringify(config);
    }

    localStorage.setItem(keyUserConfig, data);
  },
  getUserConfig(user) {
    const keyUserConfig = `${AppStoreKey}_${utils.upper(user)}`;
    const predata = localStorage.getItem(keyUserConfig);
    let data = null;
    if (encryptStore) data = utils.decrypt(predata);
    else data = JSON.parse(predata);
    return data;
  },
  removeUserConfig(user) {
    const keyUserConfig = `${AppStoreKey}_${utils.upper(user)}`;
    sessionStorage.removeItem(keyUserConfig);
    localStorage.removeItem(keyUserConfig);
  },
  setLocale(locale) {
    localStorage.setItem(LOCALE_KEY, locale);
  },
  getLocale() {
    return localStorage.getItem(LOCALE_KEY);
  },
  getDark() {
    return localStorage.getItem(DARK_KEY);
  },
  setDark(dark) {
    localStorage.setItem(DARK_KEY, `${dark}`);
  },
  getAuthStore() {
    let authData = null;
    const predata =
      sessionStorage.getItem(AUTH_DATA) || localStorage.getItem(AUTH_DATA);
    if (encryptStore) authData = utils.decrypt(predata);
    else authData = predata;
    return authData;
  },

  removeLoginData() {
    sessionStorage.removeItem(AUTH_DATA);
    localStorage.removeItem(AUTH_DATA);

    // uncomment to remove language locale when user logout
    //localStorage.removeItem(LOCALE_KEY);
  },
};
