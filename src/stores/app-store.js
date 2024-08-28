import {defineStore} from "pinia";
import appConfig from "src/config/app";

export const useAppStore = defineStore(`${process.env.APP_NAME}_APP`, {
  state: () => ({
    appName: appConfig.name,
    user: null,
    token: null,
    locale: 'es',
    dateLocale: null,
    dark: false,
    loading: false,
    rememberMe: false,
    fullscreen: false,
    leftDrawer: {
      show: false,
      mini: false,
      width: 250,
    },
    breadcrumbs: [],
    notifications: [],
    messages: [],
    modules: [],
    configuration: {
      dark: false,
      notificationsPosition: 'bottom',
      theme: 'default',
    },
  }),
  getters: {
    avatar: (state) => {
      return state.user?.avatar || null
    },
    notificationsPosition: (state) => state.configuration.notificationsPosition,
    theme: (state) => state.configuration?.theme,
    isAuthenticated: (state) => (state.user && state.token) ? true : false,
  },
  actions: {
    reset() {
      this.user = null;
      this.locale = 'es';
      this.dateLocale = null;
      this.token = null;
      this.rememberMe = false;
      this.loading = false;
      this.dark = false;
      this.fullscreen = false;
      this.leftDrawer = {
        show: false,
        mini: false,
        width: 250,
      };
      this.configuration = {
        dark: false,
        notificationsPosition: 'bottom',
        theme: 'default',
      };
      this.modules = [];
      this.breadcrumbs = [];
      this.messages = [];
      this.notifications = [];
    },
    /**
     * setState
     * @param {{appName?: String, locale?: String, user?: Object, locale?: String, loading?:Boolean, rememberMe?:Boolean, dark?:Boolean, token?: String, avatar?: String, messages?: Array, breadcrumbs?: any, configuration?: Object, notifications?: Array }} data
     */
    setState(data) {
      if (data.appName) this.appName = data.appName;
      if (data.locale) this.locale = data.locale;
      if (data.dateLocale) this.dateLocale = data.dateLocale;
      if (data.user) this.user = data.user;
      if (data.locale) this.locale = data.locale;
      if (data.token) this.token = data.token;
      this.loading = data.loading ?? false;
      if (data.rememberMe) this.rememberMe = data.rememberMe;
      this.dark = data.dark ?? false;
      if (data.breadcrumbs) this.breadcrumbs = data.breadcrumbs;
      if (data.notifications) this.notifications = data.notifications;
      if (data.messages) this.messages = data.messages;
      if (data.modules) this.modules = data.modules;
      if (data.configuration) this.configuration = data.configuration;
    },
    toggleLeftDrawer() {
      if (!this.leftDrawer.showDrawer && !this.leftDrawer.mini) {
        this.leftDrawer.showDrawer = true;
        this.leftDrawer.mini = false;
      } else if (this.leftDrawer.showDrawer && !this.leftDrawer.mini) {
        this.leftDrawer.mini = true;
      } else if (this.leftDrawer.showDrawer && this.leftDrawer.mini) {
        this.leftDrawer.showDrawer = false;
        this.leftDrawer.mini = false;
      }
    },
    toggleDark() {
      this.dark = !(this.dark || false);
      this.configuration.dark = !(this.configuration.dark || false);
    },

    toggleLoading() {
      this.loading = !this.loading;
    },
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
    },
  },
});
