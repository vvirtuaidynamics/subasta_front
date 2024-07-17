import {store} from "quasar/wrappers";
import {createPinia} from "pinia";
import {storePlugin} from "pinia-plugin-store";
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import {utils} from "src/helpers/utils";

export default store(({ssrContext}) => {
  const pinia = createPinia();

  const {encrypt, decrypt} = utils;

  const stores = storePlugin({
    stores: [
      {
        name: `${process.env.APP_NAME}_APP`,
        ciphertext:
          process.env.NODE_ENV?.toString() === "production" ||
          process.env.STORAGE_CIPHER?.toString() === "true",
        storage: localStorage,
      },
    ],
    encrypt,
    decrypt,
  });
  pinia.use(stores);
  return pinia;
});
