import { StorageService } from "src/services/storage";
import { runSequentialPromises } from "quasar";
import axios from "axios";

let langSwitcher = {
  es: {},
  en: {},
};

const locale = StorageService.getLocale() || "es";

let messages = {};

runSequentialPromises(
  {
    es: () => axios("/src/i18n/es.json"),
    en: () => axios("/src/i18n/en.json"),
  },
  { abortOnFail: false }
).then((resultAggregator) => {
  Object.values(resultAggregator).forEach((result) => {
    if (result.status === "rejected") {
      console.log(`Failed to fetch ${result.key}:`, result.reason);
    } else {
      langSwitcher[result.key] = result.value.data;
    }
  });
  messages = locale === "es" ? langSwitcher.es : langSwitcher.en;
});

export const i18n = {
  locale,
  messages,
  t: function (key, args = {}, fmt = "") {
    let value = key.split(".").reduce((p, c) => p?.[c], messages);
    if (value && args) {
      const names = Object.keys(args);
      const vals = Object.values(args);
      return new Function(...names, `return \`${value}\`;`)(...vals);
    }
    let str = new String(value || key);
    if (fmt === "first") return str.charAt(0).toUpperCase() + str.slice(1);
    if (fmt === "upper") return str.toUpperCase();
    return value || key;
  },
};
export const $t = i18n.t;
