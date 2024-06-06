<template>
  <!--
  Requirement:
  * Install the extension @quasar/qiconpicker by run:
    > quasar ext add @quasar/qiconpicker
  * Params:
      picker: boolean
      styleField: 'filled' | 'outlined' | 'standout' | 'borderless' | 'rounded filled' | 'rounded outlined' | 'rounded standout' | 'square filled' | 'square outlined' | 'square standout' | 'dense' | 'dense filled' | 'dense outlined' | 'dense standout' | 'dense borderless' | 'dense rounded filled' | 'dense rounded outlined' | 'dense rounded standout' | 'dense square filled' | 'dense square outlined' | 'dense square standout' | undefined;
      width?: number;
      maxWidth?: number;
      height?: number;
 -->
  <div id="IconPicker" class="q-pa-sm">
    <div id="IconPickerField" v-if="picker">
      <q-dialog
        :full-width="!props.maxWidth"
        :full-height="!props.height"
        v-model="showIconPicker"
        transition-show="flip-up"
        transition-hide="flip-down"
        :class="`${props.maxWidth ? '' : ' full-width'}`"
        :style="`${
          props.maxWidth ? 'max-width:' + props.maxWidth + 'px' : ''
        }; ${props.height ? 'height:' + props.height + 'px' : ''}`"
      >
        <q-card
          class="full-width full-height shadow-3"
          style="border-radius: 15px; height: max-content"
        >
          <q-bar>
            <span class="text-caption text-bold text-uppercase">{{
              $t("labels.iconSelectTitle")
            }}</span>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>{{ $q.lang.label.close }}</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="q-pa-xs full-height full-width">
              <div class="row vertical-middle" v-if="!props.noHeaderControl">
                <div class="col-9">
                  <q-input
                    :dense="props.styleField?.includes('dense')"
                    :filled="props.styleField?.includes('filled')"
                    :rounded="props.styleField?.includes('rounded')"
                    :borderless="props.styleField?.includes('borderless')"
                    :standout="props.styleField?.includes('borderless')"
                    :outlined="props.styleField?.includes('outlined')"
                    name="filter"
                    v-model="data.filter"
                    :label="$t('labels.search')"
                    clearable
                    class="q-ma-sm"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
                <div class="col-3">
                  <q-select
                    :dense="props.styleField?.includes('dense')"
                    :filled="props.styleField?.includes('filled')"
                    :rounded="props.styleField?.includes('rounded')"
                    :borderless="props.styleField?.includes('borderless')"
                    :standout="props.styleField?.includes('borderless')"
                    :outlined="props.styleField?.includes('outlined')"
                    name="Pagesize"
                    v-model="data.pagination.itemsPerPage"
                    :options="data.iconsPerPageOptions"
                    :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
                    :title="$t('labels.iconPerPage')"
                    class="q-ma-sm"
                  >
                    <template v-slot:selected>
                      {{ data.pagination.itemsPerPage ?? "" }}
                    </template>
                  </q-select>
                </div>
              </div>

              <div class="row justify-center">
                <!-- <q-icon-picker :dense="props.styleField?.includes('dense')" v-model="data.iconName" tooltips
                  v-model:model-pagination="data.pagination" selected-color="primary"
                  selected-background-color="secondary" :icon-set="data.iconSet" :filter="data.filter"
                  style="height: 60vh" >
                </q-icon-picker> -->
                <q-icon-picker
                  :dense="props.styleField?.includes('dense')"
                  v-model="data.iconName"
                  tooltips
                  v-model:model-pagination="data.pagination"
                  selected-color="primary"
                  selected-background-color="secondary"
                  :icons="icons"
                  :filter="data.filter"
                  style="height: 60vh"
                >
                </q-icon-picker>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div
        class="row"
        :class="`${props.maxWidth ? '' : ' full-width'}`"
        :style="`${props.maxWidth ? 'max-width:' + props.maxWidth + 'px' : ''}`"
      >
        <div class="col-xs-12 col-sm-5 col-md-4 col-lg-4">
          <q-select
            :dense="props.styleField?.includes('dense')"
            :filled="props.styleField?.includes('filled')"
            :rounded="props.styleField?.includes('rounded')"
            :borderless="props.styleField?.includes('borderless')"
            :standout="props.styleField?.includes('borderless')"
            :outlined="props.styleField?.includes('outlined')"
            name="Iconsets"
            v-model="selectedIconset"
            :options="data.iconSets"
            :label="$t('labels.iconSet')"
            class="q-ma-sm"
            @update:model-value="updateIconsSet"
            :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
          >
            <template v-slot:selected>
              {{ selectedIconset?.label ?? "" }}
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-7 col-md-8 col-lg-8">
          <q-input
            name="value"
            v-model="data.iconName"
            :label="$t('labels.iconSelectTitle')"
            readonly
            class="q-ma-sm cursor-pointer"
            @click="showIconPicker = !showIconPicker"
            :dense="props.styleField?.includes('dense')"
            :filled="props.styleField?.includes('filled')"
            :rounded="props.styleField?.includes('rounded')"
            :borderless="props.styleField?.includes('borderless')"
            :standout="props.styleField?.includes('borderless')"
            :outlined="props.styleField?.includes('outlined')"
          >
            <template v-slot:prepend v-if="data.iconName">
              <q-icon :name="data.iconName" />
            </template>
            <template v-slot:append>
              <q-btn
                v-if="data.iconName"
                flat
                round
                icon="mdi-content-copy"
                @click="() => toClip(data.iconName)"
                size="md"
                :title="$t('labels.copy')"
              />
              <q-btn
                v-if="data.iconName"
                flat
                round
                icon="clear"
                @click="() => (data.iconName = '')"
                size="md"
                :title="$t('labels.clearSelected')"
              />
              <q-btn
                flat
                round
                size="md"
                :title="$t('labels.iconSelectTitle')"
                icon="mdi-selection-ellipse-arrow-inside"
                :dense="props.styleField?.includes('dense')"
                @click="() => (showIconPicker = !showIconPicker)"
              >
              </q-btn>
            </template>
          </q-input>
        </div>
      </div>
    </div>

    <!-- *************************************************************** -->
    <!---- No Picker                                                     -->
    <!-- *************************************************************** -->
    <q-card
      v-else
      class="full-width shadow-3"
      :class="`${props.maxWidth ? '' : ' full-width'}`"
      :style="`${props.maxWidth ? 'max-width:' + props.maxWidth + 'px' : ''}`"
    >
      <div
        class="q-pa-md"
        :class="`${props.maxWidth ? '' : ' full-width'}`"
        :style="`${props.maxWidth ? 'max-width:' + props.maxWidth + 'px' : ''}`"
      >
        <div class="row vertical-middle">
          <div class="col-9">
            <q-input
              v-if="!data.iconName"
              :dense="props.styleField?.includes('dense')"
              :filled="props.styleField?.includes('filled')"
              :rounded="props.styleField?.includes('rounded')"
              :borderless="props.styleField?.includes('borderless')"
              :standout="props.styleField?.includes('borderless')"
              :outlined="props.styleField?.includes('outlined')"
              name="filter"
              v-model="data.filter"
              :label="$t('labels.search')"
              clearable
              class="q-ma-sm"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-input
              v-else
              :dense="props.styleField?.includes('dense')"
              :filled="props.styleField?.includes('filled')"
              :rounded="props.styleField?.includes('rounded')"
              :borderless="props.styleField?.includes('borderless')"
              :standout="props.styleField?.includes('borderless')"
              :outlined="props.styleField?.includes('outlined')"
              readonly
              name="value"
              v-model="data.iconName"
              :label="$t('labels.iconSelectTitle')"
              clearable
              class="q-ma-sm"
              @click="inputSelection"
            >
              <template v-slot:prepend>
                <q-icon :name="data.iconName" />
              </template>
              <template v-slot:append>
                <q-btn
                  flat
                  round
                  icon="clear"
                  @click="() => (data.iconName = '')"
                  size="sm"
                  :title="$t('labels.clearSelected')"
                />
              </template>
            </q-input>
          </div>

          <div class="col-3">
            <q-select
              :dense="props.styleField?.includes('dense')"
              :filled="props.styleField?.includes('filled')"
              :rounded="props.styleField?.includes('rounded')"
              :borderless="props.styleField?.includes('borderless')"
              :standout="props.styleField?.includes('borderless')"
              :outlined="props.styleField?.includes('outlined')"
              name="Pagesize"
              v-model="data.pagination.itemsPerPage"
              :options="data.iconsPerPageOptions"
              :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
              :title="$t('labels.iconPerPage')"
              class="q-ma-sm"
            >
              <template v-slot:selected>
                {{ data.pagination.itemsPerPage ?? "" }}
              </template>
            </q-select>
          </div>
        </div>
        <div class="row justify-center q-mt-xs">
          <!-- <q-icon-picker :dense="props.styleField?.includes('dense')" v-model="data.iconName" tooltips
            v-model:model-pagination="data.pagination" :icon-set="props.iconSet" :filter="data.filter"
            :style="`${height ? 'height: ' + height + 'px;' : 'height: 40vh;'}`">
          </q-icon-picker> -->
          <q-icon-picker
            :dense="props.styleField?.includes('dense')"
            v-model="data.iconName"
            tooltips
            v-model:model-pagination="data.pagination"
            :icons="icons"
            :filter="data.filter"
            :style="`${height ? 'height: ' + height + 'px;' : 'height: 40vh;'}`"
          >
          </q-icon-picker>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar, copyToClipboard } from "quasar";
import { Clipboard } from "@capacitor/clipboard";
import { onBeforeMount, onMounted, ref, watch, computed } from "vue";
import { QIconPicker } from "@quasar/quasar-ui-qiconpicker";
import "@quasar/quasar-ui-qiconpicker/src/index.sass";
const $q = useQuasar();
import materialIcons from "@quasar/quasar-ui-qiconpicker/src/components/icon-set/material-icons";
import fontawesomeIcons from "@quasar/quasar-ui-qiconpicker/src/components/icon-set/fontawesome-v5";
import mdiIcons from "@quasar/quasar-ui-qiconpicker/src/components/icon-set/mdi-v6";
import bootstrapIcons from "@quasar/quasar-ui-qiconpicker/src/components/icon-set/bootstrap-icons";
import ionIcons from "@quasar/quasar-ui-qiconpicker/src/components/icon-set/ionicons-v4";
import themify from "@quasar/quasar-ui-qiconpicker/src/components/icon-set/themify";
// import bootstrapIcons from '@quasar/quasar-ui-qiconpicker/src/components/icon-set/bootstrap-icons'

defineOptions({
  name: "IconPickerField",
});

const props = defineProps({
  iconSet: {
    type: String,
    default: "fontawesome", //fontawesome,mdi,material-icons,bootstrap-icons
  },
  picker: {
    type: Boolean,
    default: false,
  },
  noHeaderControl: {
    type: Boolean,
    default: false,
  },
  styleField: {
    type: String,
    default: "dense",
  },
  width: {
    type: Number,
    default: 0,
  },
  maxWidth: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
});

onBeforeMount(() => {
  // if (process.env.NODE_ENV !== 'production') console.log('onMounted');
  if (props.search) data.value.filter = props.search;

  if (props.iconSet) data.value.iconSet = props.iconSet;
  if (data.value.iconSet)
    selectedIconset.value = data.value.iconSets.find(
      (iconset) => iconset.value === data.value.iconSet
    );
});
onMounted(() => {
  // if (process.env.NODE_ENV !== 'production') console.log('onMounted');
});
// $q.screen.gt.xs || $q.fullscreen.isActive;

const selectedIconset = ref();
const showIconPicker = ref(false);
const icons = computed(() => {
  if (data.value.iconSet === "fontawesome") return fontawesomeIcons.icons;
  if (data.value.iconSet === "mdi") return mdiIcons.icons;
  if (data.value.iconSet === "bootstrap-icons") return bootstrapIcons.icons;
  if (data.value.iconSet === "ionicons") return ionIcons.icons;
  if (data.value.iconSet === "themify") return themify.icons;
  return materialIcons.icons;
});

// console.log(icons);
const data = ref({
  iconName: "",
  filter: "",
  iconsPerPageOptions: [50, 100, 250, 500],
  iconSet: "fontawesome",
  iconSets: [
    {
      label: "Bootstrap Icons",
      value: "bootstrap-icons",
      select: "bootstrap-icons" === props.iconSet,
    },
    {
      label: "Fontawesome Icons",
      value: "fontawesome",
      select: "fontawesome" === props.iconSet,
    },
    {
      label: "Material Icons",
      value: "material-icons",
      select: "bootstrap-icons" === props.iconSet,
    },
    {
      label: "Material Disign Icons",
      value: "mdi",
      select: "mdi" === props.iconSet,
    },
    {
      label: "Ion Icons",
      value: "ionicons-v4",
      select: "ionicons" === props.iconSet,
    },
    {
      label: "Themify Icons",
      value: "themify",
      select: "themify" === props.iconSet,
    },
  ],
  pagination: {
    itemsPerPage: $q.screen.gt.xs ? 100 : 50,
    page: 0,
  },
});
const emits = defineEmits(["update"]);

defineExpose({ emits });

watch(
  () => data.value.iconName,
  async (icon, prev_icon) => {
    if (showIconPicker.value) showIconPicker.value = false;

    // if (process.env.NODE_ENV !== 'production') console.log(icon);

    emits("update", icon);
  }
);

function updateIconsSet(iconset) {
  // console.log("iconset:", iconset);
  // console.log("icons:", icons);
  data.value.iconName = "";
  data.value.iconSet = iconset.value;
}

function showNotify(mensaje, color = "info", icon = "info") {
  if (mensaje) {
    $q.notify({
      message: mensaje,
      color: color,
      icon: icon,
      position: "bottom",
    });
  }
}

const writeToClipboard = async (text) => {
  //await copyToClipboard(text) --> Quasar
  await Clipboard.write({ string: text }); //--> capacitor
};
async function toClip(text) {
  await copyToClipboard(text)
    .then(() => {
      showNotify("Nombre de icono copiado!", "positive", "done");
    })
    .catch(() => {
      writeToClipboard(text)
        .then(() => {
          showNotify("Nombre de icono copiado!", "positive", "done");
        })
        .catch(() => {
          showNotify("No se pudo copiar nombre de icono!", "negative", "close");
        });
    });
}
function inputSelection() {
  if (props.picker && !data.value.iconName) {
    showIconPicker.value = !showIconPicker.value;
  }
  if (data.value.iconName) {
    toClip(data.value.iconName).then(() => {
      console.log("Copiado!");
    });
  }
}
</script>

<style lang="scss" scoped></style>
