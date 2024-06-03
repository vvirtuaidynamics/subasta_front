import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import { StorageService } from "src/services/storage";
import { Dark, Quasar } from "quasar";
import es from "src/lang/es";
import en from "src/lang/en-US";

import messages from "src/i18n";

export default boot(({ app }) => {
  const locale = StorageService.getLocale() || "es";
  const dark = StorageService.getDark();
  // console.log("boot dark:", dark === "true")
  let lang = es;
  try {
    if (locale === "es") lang = es;
    else lang = en.default;
    Quasar.lang.set(lang);
  } catch (err) {
    console.error(err);
  }
  const _dark = dark === "true" ? true : false;
  Dark.set(_dark);
  const i18n = createI18n({
    locale: locale,
    globalInjection: true,
    messages,
  });

  const locales = {
    es: { en: "Spanish", es: "Español" },
    "en-US": { en: "English", es: "Ingles" },
  };
  app.config.globalProperties.$i18n = i18n;
  app.config.globalProperties.$dark = _dark;
  app.config.globalProperties.locales = locales;
  // Set i18n instance on app
  app.use(i18n);
});
