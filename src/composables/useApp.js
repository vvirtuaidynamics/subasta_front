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
    dateLocale,
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
      ? {...configuration.value, ...{dark: darkValue}}
      : {}
    data = {...data, ...{configuration: config}}
    setAppState(data);
  }

  function navigateTo(payload, $router = null, $route = null) {
    if (payload && typeof payload === "string") {
      if (payload.startsWith("http") || payload.startsWith("https")) {
        window.open(payload, "_blank");
      }
      if (payload.startsWith("#")) {
        document.getElementById(payload).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
      if ($router) {
        $router.push({name: payload}) // por defecto
      }
    }
    if ($router && $route)
      if (payload && typeof payload === "object") {
        const path = payload.path;
        if (path && $route.path !== path) {
          $router.push(path);
        }
        if (payload.name) $router.push({name: payload.name});
        if (payload.path) $router.push({path: payload.path});
      }

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
    dateLocale,
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
    handleDarkMode,
    navigateTo
  };
}
