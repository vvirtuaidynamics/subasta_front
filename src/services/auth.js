import {StorageService} from "src/services/storage";
import {ApiService} from "src/services/api";
import {utils} from "src/helpers/utils";

export default function authService() {

  const register = async () => {
  };

  /**
   * login
   * @param credentials {{identity: String, password: String, rememberMe: Boolean}}
   * @returns {Promise<void>}
   */
  const login = async (credentials) => {
    try {
      const {identity, password, rememberMe} = credentials;
      if (!utils.strIsNullOrEmpty(identity) && !utils.strIsNullOrEmpty(password)) {
        const response = await ApiService.post("login", {identity, password})
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
          StorageService.setAuthStore(user, rememberMe);
          utils.sendMsg({
            msg: data.message,
            type: "positive",
            ...addAvatar
          });
          return result;
        }
      }
      //await StorageService.set('token', 'your_token_here');
    } catch (e) {
      utils.sendMsg({
        msg: e.message,
        type: "negative",
      });
      console.log("Login failed, error: ", e.message);
    }
  };
  const refresh = async () => {
  };
  const logout = async () => {
  };
  const profile = async () => {
  };
  const passwordChanged = async () => {
  };

  return {register, login, refresh, logout, profile, passwordChanged}
}
