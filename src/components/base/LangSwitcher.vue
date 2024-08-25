<template>
  <!--
    LangSwitch
    Componente para gestionar el idioma del sitio a través de el storage local y la configuracion del usuario.
   -->
  <q-btn-dropdown class="q-pa-sm text-body2" flat no-caps>
    <template #label>
      <q-img v-if="lang === 'es' || lang === 'en-US'" :src="lang === 'es' ? esSvg : lang === 'en-US' ? enSvg : ''"
             class="q-mr-sm" style="width: 24px; height: auto"/>
      <span class="text-body2 text-weight-medium" v-if="$q.screen.gt.sm">{{
          lang === "es" ? "ES" : lang === "en-US" ? "EN" : langName
        }}</span>
    </template>
    <q-list class="q-px-none q-mx-none text-uppercase lang-switch" dense>
      <q-item v-for="(locale, key) in locales" :key="key" v-close-popup clickable @click="handleChange(key)">

        <q-item-section>
          <div class="row q-px-sm">
            <q-img v-if="key === 'es' || key === 'en-US'" :src="key === 'es' ? esSvg : enSvg"
                   style="width: 24px; height: auto"/>
            <q-item-label class="q-ml-sm">{{ lang === "es" ? locale.es : locale.en }}
            </q-item-label>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import {ref, onBeforeMount, onMounted, getCurrentInstance} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useQuasar} from "quasar";
import flags from "src/i18n/flags";
import {locales} from "src/boot/i18n.js"
import {StorageService} from "src/services/storage.js"
import {useApp} from "src/composables/useApp";


defineOptions({
  name: "LangSwitcher",
});

const $app = useApp();
const {locale} = useApp();

const props = defineProps({})
const emits = defineEmits(['update']);

const $q = useQuasar();
const $router = useRouter()
const $route = useRoute()

const lang = ref($q.lang.isoName);
const esSvg = flags.es;
const enSvg = flags.en;

const changeLocale = (locale) => {
  const Lang = locales[`${locale}`].locale
  $q.lang.set(Lang);
  lang.value = locale;
  $app.setAppState({locale: locale, dateLocale: Lang})
  StorageService.setLocale(locale);
  //TODO SI HAY USUARIO AUTH LO GUARDO EN SU CONFIG

  emits('update', locale)

}
const getLocale = (locale) => {
  lang.value = $q.lang.isoName
  return lang.value;
}

const reload = () => {
  $router.go(0)
}

const handleChange = (locale) => {
  if (locale === getLocale()) return false;
  changeLocale(locale);
  reload()
}

onBeforeMount(() => {
  let hasLang = locale.value || StorageService.getLocale();
  if (hasLang) {
    changeLocale(hasLang)
  }
})
onMounted(() => {
})

</script>
<style scoped>
.lang-switch {
  min-width: 145px;
}
</style>
