import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {useAppStore} from "src/stores/app-store";
import {useRouter} from "vue-router";
import {$t} from "src/services/i18n";

export function useApp() {
  const $q = useQuasar;
  const $router = useRouter();
  const $app = useAppStore();

  const {
    appName,
    locale,
    theme,
    dark,
    user,
    avatar,
    token,
    loading,
    leftDrawer,
    breadcrumbs,
    config,
    messages,
    notifications,
  } = storeToRefs($app);

  function resetAppState() {
    $app.reset();
  }

  function setAppState(data) {
    $app.setState(data);
  }

  /**
   * setBreadcrumbs   *
   * @returns {{to: *, label}}
   */
  function setBreadcrumbs() {
    const matchedRoutes = $route.matched;

    const breadcrumb = matchedRoutes.map((route) => ({
      to: route.path,
      label: route.meta.breadcrumb || $t("Home"),
    }));
    const unique_breadcrumb = breadcrumb.reduce((accumulator, currentValue) => {
      if (accumulator.filter((a) => a.to == currentValue.to).length === 0) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []);

    unique_breadcrumb.unshift({to: "/", label: $t("Home")});
    $appStore.setBreadcrumbs(unique_breadcrumb);
    // console.log("unique_breadcrumb: ", unique_breadcrumb);

    return unique_breadcrumb;
  }

  /**
   * navigateTo
   *
   * payload {name: string, path: string, to: string} | string
   * @param payload
   */
  function navigateTo(payload) {
    // console.log("payload: ", payload);
    if (payload && typeof payload === "string") {
      if (payload.startsWith("http") || payload.startsWith("https")) {
        window.open(payload, "_blank");
      } else {
        $router.push({name: payload}); // sino es link por defecto asumo que es name
      }
    }
    if (payload && typeof payload === "object") {
      const path = payload.path ?? false;
      if (path && $router.path !== path) {
        $router.push(path);
      }
      if (payload.name) $router.push({name: payload.name});
      if (payload.path) $router.push({path: payload.path});
    }
  }

  return {
    $q,
    $app,

    appName,
    locale,
    theme,
    dark,
    user,
    token,
    loading,
    leftDrawer,
    breadcrumbs,
    config,
    messages,
    notifications,

    // Methods
    navigateTo,
    setAppState,
  };
}
