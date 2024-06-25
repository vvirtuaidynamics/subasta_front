<template>
  <q-btn-component
    :tooltips="$t('labels.show')"
    icon="remove_red_eye"
    size="xs"
    @click="showDialog = true"
  />

  <q-dialog v-model="showDialog" full-height>
    <q-card style="width: 600px">
      <dialog-header-component
        icon="remove_red_eye"
        :title="$t('titles.see')"
        closable
      />
      <q-card-section class="q-gutter-md"> </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="$q.lang.label.close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import DialogHeaderComponent from "src/components/base/DialogHeaderComponent.vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
import { $t } from "src/services/i18n";
defineOptions({
  name: "SeeComponent",
});

const props = defineProps({
  object: {
    type: Object,
    required: true,
  },
});

const showDialog = ref(false);
</script>
