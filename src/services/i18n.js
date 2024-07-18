import {StorageService} from "src/services/storage";
import es from "src/i18n/es";
import en from "src/i18n/en-US";
import {api, api_url} from "boot/axios";
import {utils} from "src/helpers/utils";

const locale = StorageService.getLocale() || "es";

let messages = {};
try {
  messages = locale === "es" ? es : en;
} catch (err) {
  console.error(err);
  messages = require(`src/i18n/es`).default;
}

export async function getAsyncBackendLocales() {
  try {
    const response = await api.get(`${api_url}/locales`);
    const {data} = response;
    return data;
  } catch (err) {
    console.error('Error: ', err)
  }
}

export const getMessages = () => {
  let all_messages = {};
  const save_locales = StorageService.getLocaleData();
  if (save_locales && Array.isArray(save_locales)) {
    const esBack = save_locales.filter((l) => {
        const keys = Object.keys(l);
        return keys.includes("es") && l["es"];
      }
    )[0];
    const enBack = save_locales.filter((l) => {
        const keys = Object.keys(l);
        return keys.includes("en-US") && l["en-US"];
      }
    )[0];
    all_messages = locale === "es"
      ? {...all_messages, ...esBack["es"]}
      : {...all_messages, ...enBack["en-US"]};
  }
  all_messages = {...all_messages, ...messages}
  return all_messages
}

function normalizarTrans(cadena) {
  return cadena.replace(/:(\w+)/g, '{$1}');
}

export const i18n = () => {
  const save_locales = StorageService.getLocaleData();
  if (!save_locales && !Array.isArray(save_locales))
    getAsyncBackendLocales().then((response) => {
      StorageService.setLocaleData(response);
      const all_messages = getMessages();
      return {
        locale,
        messages: all_messages,
        t: function (key, args = {}) {
          let value = key.split(".").reduce((p, c) => p?.[c], all_messages);
          if (value && value.includes(":")) value = normalizarTrans(value)
          if (value && args) {
            const names = Object.keys(args);
            const vals = Object.values(args);
            return new Function(...names, `return \`${value}\`;`)(...vals);
          }
          return value || key;
        },
      }
    }).catch((e) => {
      console.error("error: ", e)
    });

  const all_messages = getMessages();

  return {
    locale,
    messages: all_messages,
    t: function (key, args = {}, textCase = "first") {
      let value = key.split(".").reduce((p, c) => p?.[c], all_messages);
      if (value && value.includes(":")) value = normalizarTrans(value)
      if (value && args) {
        value = value.replace(/{(\w+)}/g, (match, p1) => {
          return args[p1] !== undefined ? args[p1] : match;
        });
      }
      if (textCase === "first") {
        value = utils.capitalize(value);
        key = utils.capitalize(key);
      }
      if (textCase === "lower") {
        value = utils.lower(value);
        key = utils.lower(key);
      }
      if (textCase === "upper") {
        value = utils.upper(value);
        key = utils.upper(key);
      }

      return value || key;
    },
  }
};
const myI18n = i18n()
export const $t = myI18n.t;
