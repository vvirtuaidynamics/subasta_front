import {StorageService} from "src/services/storage";
import useApi from "src/composables/useApi";
import {utils} from "src/helpers/utils";
import {$t} from "src/services/i18n"
import {useApp} from "src/composables/useApp";

export default function authService() {
  const $app = useApp();
  const $api = useApi();
  const {user, configuration, notificationsPosition, token, resetAppState, setAppState} = $app;
  const login = async (credentials) => {
    try {
      const {identity, password, rememberMe} = credentials;
      const response = await $api.login({identity, password});
      if (response.data && response.data.success) {
        const {data} = response;
        const {token, user, modules} = data;
        const result = {user, modules, token};
        const {avatar} = user;
        let addAvatar = {}
        if (avatar) {
          addAvatar = {avatar: avatar}
        }
        setAppState({...result, ...addAvatar})
        utils.sendMsg({
          msg: $t(data.message),
          type: "positive",
          position: notificationsPosition?.value || 'bottom',
          ...addAvatar
        });
      }

      return response;
    } catch (error) {
      console.log({auth: 'login error', error});
      return error?.response || error;
    }
  };

  const config = () => {

  }

  const register = async () => {
  };

  const refresh = async () => {
  };

  const logout = async (withNotification = false) => {
    $app.resetAppState();
    StorageService.removeAuthStore();
    StorageService.remove(`${process.env.APP_NAME}_APP`)
    if (withNotification)
      utils.sendMsg({
        msg: $t("Logout success"),
        type: "positive",
        position: notificationsPosition?.value || 'bottom',
      });


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
        position: notificationsPosition?.value || 'bottom',
      });
    }
  };

  const checkToken = async () => {
    if (token?.value) {
      try {
        const response = await ApiService.get("/token", {
          headers: {Authorization: `Bearer ${token.value}`},
        });
        if (response.status === 200) {
          return true;
        }
      } catch (e) {
        resetAppState();
        console.log("Check token failed, error: ", e.message);
        utils.sendMsg({
          msg: $t(e.message),
          type: "negative",
          position: notificationsPosition?.value || 'bottom',
        });
      }
    }
    return false;
  };


  const passwordChanged = async () => {

  };

  return {register, login, refresh, logout, profile, passwordChanged, checkToken}
}
