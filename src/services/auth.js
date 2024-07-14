import {StorageService} from "src/services/storage";
import {ApiService} from "src/services/api";
import {utils} from "src/helpers/utils";
import {$t} from "src/services/i18n"

export default function authService() {


  /**
   * login
   * @param credentials {{identity: String, password: String, rememberMe: Boolean}}
   * @returns {Promise<void>}
   */
  const login = async (credentials) => {
    try {
      const {identity, password, rememberMe} = credentials;
      if (!utils.strIsNullOrEmpty(identity) && !utils.strIsNullOrEmpty(password)) {
        const response = await ApiService.post("/login", {identity, password});

        if (response.status === 200) {
          const {data} = response;
          const {token, user, modules} = data.data;
          const result = {user, modules, token};
          const {avatar} = user;
          let addAvatar = {}
          if (avatar) {
            addAvatar = {avatar: avatar}
          }
          StorageService.setToken(token, rememberMe);
          StorageService.setAuthStore({user, modules}, rememberMe);
          utils.sendMsg({
            msg: $t(data.message),
            type: "positive",
            position: 'top-right',
            ...addAvatar
          });
          return result;
        }
      }

    } catch (e) {
      utils.sendMsg({
        msg: $t(e.message),
        type: "negative",
      });
      console.log("Login failed, error: ", e.message);
    }
  };
  const register = async () => {
  };

  const refresh = async () => {
  };
  const logout = async () => {

    StorageService.setToken(token, rememberMe);
    StorageService.setAuthStore(user, rememberMe);
    StorageService.removeToken();
    StorageService.removeAuthStore();

    utils.sendMsg({
      msg: $t("logout_success"),
      type: "positive",
      position: 'top-right'
    });
    // await StorageService.remove('token');
  };
  const profile = async () => {
    try {
      const response = await ApiService.get("/profile");
      console.log(response);
      if (response.status === 200) {
        const {data} = response;
        const {user} = data.data;
        StorageService.setAuthStore(user);
        return user;
      }
    } catch (e) {
      console.log("Profile failed, error: ", e.message);
      utils.sendMsg({
        msg: $t(e.message),
        type: "negative",
      });
    }
  };
  const passwordChanged = async () => {
  };

  return {register, login, refresh, logout, profile, passwordChanged}
}
