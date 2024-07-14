import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {useAppStore} from "src/stores/app-store";
import {$t} from "src/services/i18n";

export function useApp() {
  const $q = useQuasar;
  const $appStore = useAppStore();

  const {
    appName,
    user,
    avatar,
    dark,
    token,
    locale,
    loading,
    fullscreen,
    leftDrawer,
    breadcrumbs,
    modules,
    configuration,
    messages,
    notifications,
    isAuthenticated,
    theme,
    notificationsPosition,
  } = storeToRefs($appStore);

  function resetAppState() {
    $appStore.reset();
  }

  /**
   * setState
   * @param {{appName?: String, locale?: String, user?: Object, locale?: String, loading?:Boolean, rememberMe?:Boolean, dark?:Boolean, token?: String, avatar?: String, messages?: Array, breadcrumbs?: any, configuration?: Object, notifications?: Array }} data
   */
  function setAppState(data) {
    $appStore.setState(data);
  }


  function handleDarkMode(darkValue) {
    let data = {dark: darkValue}
    let config = user && configuration
      ? {...configuration, ...{dark: darkValue}}
      : {}
    data = {...data, ...{configuration: config}}
    setAppState(data);
  }


  return {
    $q,
    $appStore,

    appName,
    user,
    avatar,
    token,
    loading,
    dark,
    locale,
    fullscreen,
    leftDrawer,
    breadcrumbs,
    modules,
    configuration,
    messages,
    notifications,
    isAuthenticated,
    theme,
    notificationsPosition,

    // Methods
    setAppState,
    resetAppState,
    handleDarkMode
  };
}
