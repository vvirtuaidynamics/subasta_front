import { Notify, QBtn, QInput, QSelect } from "quasar";
import { boot } from "quasar/wrappers";

// Helpers and Services
import { $t } from "src/services/i18n";
import { utils } from "src/helpers/utils";
import { StorageService } from "src/services/storage";
// import { AppMenus } from "./menus";

// Component
//  Base
// import NumberField from "src/components/base/NumberField.vue";
import IconPickerField from "src/components/base/IconPickerField.vue";
// import EditorField from "src/components/base/EditorField.vue";

// Componentes
import DarkSwitcher from "src/components/base/DarkSwitcher.vue";
import LangSwitcher from "src/components/base/LangSwitcher.vue";
// import LoaderPage from "src/components/LoaderPage.vue";
// import NumberField from "src/components/base/NumberField.vue";

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  // Init

  // Helpers and Services
  app.config.globalProperties.$t = $t;
  app.config.globalProperties.$utils = utils;
  app.config.globalProperties.$localStore = StorageService;

  //Components
  // app.component("NumberField", NumberField);
  app.component("IconPickerField", IconPickerField);
  // app.component("EditorField", EditorField);
  // app.component("LoaderPage", LoaderPage);

  //  Base
  app.component("LangSwitcher", LangSwitcher);

  // Quasar component default props

  // Notify
  Notify.setDefaults({
    position: "top-right",
    timeout: 2500,
    textColor: "white",
    //actions: [{ icon: "close", color: "white" }],
  });


});
