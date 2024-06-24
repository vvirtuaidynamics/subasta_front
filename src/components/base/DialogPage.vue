<template>
  <div id="QDialog" class="no-scrollbar">
    <q-dialog
      v-model="pageDialog.showDialog"
      :maximized="pageDialog.maximized"
      :persistent="pageDialog.persistent"
      class="dialog"
      full-height
      full-width
      style="background-color: #1d1d1d99; border: none"
      @hide="handleClose()"
    >
      <q-card
        class="full-width no-margin no-padding"
        style="border-radius: 15px 15px 15px 15px; border: none"
      >
        <q-bar class="">
          <q-icon :name="pageDialog.icon ?? 'mdi-form-select'" size="sm"/>
          <span class="q-ml-xs text-body1 text-bold text-uppercase">{{
              pageDialog.title ?? $t("defaultDialogTitle")
            }}</span>
          <q-space/>
          <div class="q-gutter q-gutter-x-xs">
            <q-btn
              v-if="pageDialog.maximizedBtn"
              :class="
                !pageDialog.maximized
                  ? 'bg-indigo-8 text-white'
                  : 'bg-teal-8 text-negative'
              "
              :icon="
                !pageDialog.maximized
                  ? 'mdi-window-maximize'
                  : 'mdi-window-restore'
              "
              dense
              round
              size="xs"
              @click="pageDialog.maximized = !pageDialog.maximized"
            >
              <q-tooltip
              >{{
                  !pageDialog.maximized
                    ? $t("labels.maximizeWindow")
                    : $t("labels.restoreWindow")
                }}
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="pageDialog.closeBtn"
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
              !pageDialog.maximized
                ? 'height: calc(100vh - 90px)'
                : 'height: calc(100vh - 45px)'
            }`"
          >
            <div class="full-width q-px-sm q-py-none">
              <slot v-if="!loading">
                <LoaderPage :show="loading"></LoaderPage>
              </slot>
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {computed, defineAsyncComponent, onBeforeMount, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useQuasar} from "quasar";
import {$t} from "src/services/i18n";
import {useApp} from "src/composables/useApp";
import LoaderPage from "src/components/base/LoaderPage.vue";

const $q = useQuasar();
const $app = useApp();
const {pageDialog, loading} = $app;

let pageContent = pageDialog.pageComponent;

const emits = defineEmits(["close", "submitForm"]);

onBeforeMount(() => {
  if (pageDialog.pageComponent) pageContent.value = pageDialog.pageComponent;
});

/**
 * Metodos
 */
function handleClose() {
  emits("close");
}

function handleFormSubmit(formData) {
  emits("submitForm", formData ?? null);
}

defineExpose({handleClose, handleFormSubmit});
</script>

<style lang="scss" scoped>
#QDialog {
  .dialog {
    border-radius: 15px 15px 15px 15px;
  }
}
</style>
