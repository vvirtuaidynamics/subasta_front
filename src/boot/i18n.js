import {boot} from "quasar/wrappers";
import {createI18n} from "vue-i18n";
import {StorageService, LOCALE_KEY} from "src/services/storage";
import {Dark, Quasar} from "quasar";
import es from "src/lang/es";
import en from "src/lang/en-US";

import messages from "src/i18n";
import {getMessages} from "src/services/i18n";

export const locales = {
  es: {en: "Spanish", es: "Español", locale: es},
  "en-US": {en: "English", es: "Ingles", locale: en},
};

export default boot(({app}) => {
  const locale = StorageService.get(LOCALE_KEY) || "es";
  const dark = false;
  let lang = es;
  try {
    if (locale === "es") lang = es.default;
    else lang = en.default;
    Quasar.lang.set(lang);
  } catch (err) {
    console.error(err);
  }
  const _dark = dark === "true" ? true : false;
  Dark.set(_dark);

  const all_messages = getMessages();

  const i18n = createI18n({
    locale: locale,
    globalInjection: true,
    messages: {...messages, ...all_messages},
  });

  app.config.globalProperties.$i18n = i18n;
  app.config.globalProperties.$dark = _dark;
  app.config.globalProperties.locales = locales;
  // Set i18n instance on app
  app.use(i18n);
});
