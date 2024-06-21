import { StorageService } from "src/services/storage";
import es from "src/i18n/es";
import en from "src/i18n/en-US";

const locale = StorageService.getLocale() || "es";

let messages = {};
try {
  messages = locale === "es" ? es : en;
} catch (err) {
  console.error(err);
  //fallback locale
  messages = require(`src/i18n/es`).default;
}

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
