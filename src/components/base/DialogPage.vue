<template>
  <div id="QDialog" class="no-scrollbar">
    <q-dialog
      v-model="showDialog"
      :maximized="isMaximized"
      :persistent="props.persistent"
      class="dialog"
      :position="props.position"
      style="background-color: #1d1d1d99; border: none"
      @hide="handleClose()"
    >
      <q-card
        class="full-width no-margin no-padding"
        style="border-radius: 15px 15px 15px 15px; border: none; "
        :style="!isMaximized? 'min-width: calc(100vw * 0.7)':'min-width: calc(100vw )'"
      >
        <q-bar class="">
          <q-icon :name="props.icon" size="sm"/>
          <span class="q-ml-xs text-body1 text-bold text-uppercase">{{
              props.title ?? $t("defaultDialogTitle")
            }}</span>
          <q-space/>
          <div class="q-gutter q-gutter-x-xs">
            <q-btn
              v-if="props.buttons.includes('maximize')"
              :class="
                !props.maximized
                  ? 'bg-indigo-8 text-white'
                  : 'bg-teal-8 text-negative'
              "
              :icon="
                !props.maximized
                  ? 'mdi-window-maximize'
                  : 'mdi-window-restore'
              "
              dense
              round
              size="xs"
              @click="handleMaximize"
            >
              <q-tooltip
              >{{
                  !props.maximized
                    ? $t("labels.maximizeWindow")
                    : $t("labels.restoreWindow")
                }}
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="props.buttons.includes('close')"
              v-close-popup
              class="bg-negative text-white"
              dense
              icon="close"
              round
              size="xs"
            >
              <q-tooltip>{{ $t("labels.close") }}</q-tooltip>
            </q-btn>
          </div>
        </q-bar>

        <q-card-section class="q-py-xs q-px-sm">
          <q-scroll-area
            :style="`${
              !props.maximized
                ? 'height: calc(100vh - 90px)'
                : 'height: calc(100vh - 45px)'
            }`"
          >
            <div class="q-px-sm q-py-none flex flex-center">
              <slot>

              </slot>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {onBeforeMount, ref, watch} from "vue";
import {$t} from "src/services/i18n";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  persistent: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: "fas fa-edit"
  },
  title: {
    type: String,
    default: "a"
  },
  position: {
    type: String,
    default: "standard"
  },
  maximizedBtn: {
    type: Boolean,
    default: true
  },
  maximized: {
    type: Boolean,
    default: false
  },
  buttons: {type: Array, default: () => ['close', 'maximize']}


})
const showDialog = ref(false);
const isMaximized = ref(false);
const emits = defineEmits(["show", "hide", 'maximize', "submitForm"]);

onBeforeMount(() => {
  showDialog.value = props.show
  isMaximized.value = props.maximized
});

/**
 * Metodos
 */
function handleClose() {
  emits("hide");
}

function handleMaximize() {
  console.log({max: isMaximized.value})
  isMaximized.value = !isMaximized.value
}

function handleFormSubmit(formData) {
  emits("submitForm", formData ?? null);
}

watch(() => props.show, (newValue) => {
  showDialog.value = props.show
})


defineExpose({handleClose, handleFormSubmit});


</script>

<style lang="scss" scoped>
#QDialog {
  .dialog {
    border-radius: 15px 15px 15px 15px;
  }
}
</style>
