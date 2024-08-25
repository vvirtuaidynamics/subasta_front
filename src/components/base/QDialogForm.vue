<template>
  <q-dialog v-model="showDialog" :position="props.position" :persistent="props.persistent"
            :maximized="maximized"
            @hide="()=>emitAction('hide', {action: 'hide', data: false})"

  >
    <q-card
      :style="!maximized? 'min-width: calc(100vw * 0.7)':'min-width: calc(100vw )'"
    >
      <q-card-section v-if="props.title" style="height: 50px; min-height: 50px; max-height: 50px">
        <div class="text-body1 text-uppercase text-weight-regular">
          <q-icon :name="props.icon" size="24px"/>
          {{ title }}
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="scroll q-pl-md q-pr-sm">
        <q-scroll-area :class="maximized? 'maximized': 'no-maximized'"
                       :thumb-style="thumbStyle"
                       :bar-style="barStyle"
        >
          <slot></slot>
        </q-scroll-area>
      </q-card-section>
      <q-separator/>
      <q-card-actions class="q-gutter q-gutter-x-md" align="right"
                      style="height: 60px; max-height: 60px; min-height: 60px">
        <q-btn flat :label="$t('labels.cancel')" color="negative" v-close-popup/>
        <q-btn v-for="(action, index) in actions" :key="index" flat :label="$t(action.label)" color="primary"
               @click="action.handler ?? null"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onBeforeMount, ref, watch} from "vue";
import {$t} from "src/services/i18n";

defineOptions({
  name: "DarkSwitcher",
});

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
    default: ""
  },
  position: {
    type: String,
    default: "standard"
  },

  isMaximized: {
    type: Boolean,
    default: false
  },

  actions: {
    type: Array,
    default: () => [
      {
        action: 'submit',
        label: 'labels.accept',
        handler: () => {

        }

      }]
  }
})

const emits = defineEmits(['action']);
const maximized = ref(false)
const showDialog = ref(false)

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#8436a8e9',
  width: '5px',
  opacity: 0.75
}

const barStyle = {
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#3c3c3c',
  width: '9px',
  opacity: 0.2
}

const emitAction = (action, data = null) => {
  if (action === 'hide') showDialog.value = false
  emits('action', data)
}

watch(() => props.show, (newValue) => {
  showDialog.value = newValue;
})

onBeforeMount(() => {
  showDialog.value = props.show
  maximized.value = props.isMaximized
})

</script>

<style lang="scss" scoped>
.no-maximized {
  height: calc(100vh - 220px);
  min-width: calc(100vw * 0.1);
}

.maximized {
  height: calc(100vh - 160px);
  min-width: 100vw;
}
</style>
