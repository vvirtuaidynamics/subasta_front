<template>
  <div class="q-gutter-md flex" v-if="$q.screen.gt.sm">
    <q-select
      v-model="column"
      dense
      options-dense
      :options="fields"
      label="Columna"
      emit-value
      map-options
      hide-bottom-space
      :class="fields.length == 1 ? 'hidden' : ''"
    />
    <q-select
      v-model="condition"
      dense
      options-dense
      :options="conditions"
      :label="fields.length == 1 ? fields[0].label : 'Condición'"
      emit-value
      map-options
      hide-bottom-space
    />
    <q-input
      bottom-slots
      v-model="query"
      :error="querySearchError"
      :error-message="querySearchMsg"
      label="Frase"
      dense
      hide-bottom-space
      @keyup.enter="search"
      @update:model-value="onChangeQuery"
    >
      <template v-slot:append>
        <q-icon
          v-if="searched"
          name="close"
          class="cursor-pointer"
          @click="resetSearch()"
        >
          <q-tooltip class="bg-brown">{{ $q.lang.label.reset }}</q-tooltip>
        </q-icon>
      </template>
      <template v-slot:after>
        <q-btn-component
          :round="false"
          :tooltips="$q.lang.label.search"
          flat
          dense
          size="md"
          icon="search"
          @click="search"
        />
      </template>
    </q-input>
  </div>
  <q-btn-group v-else outline>
    <q-btn-component
      :round="false"
      :tooltips="$q.lang.label.search"
      outline
      icon="search"
      size="md"
      @click="showDialog = true"
    />
    <q-btn color="brown" icon="close" v-if="searched" @click="resetSearch()">
      <q-tooltip class="bg-brown">{{ $q.lang.label.reset }}</q-tooltip>
    </q-btn>
  </q-btn-group>

  <q-dialog v-model="showDialog" @before-show="querySearchError = false">
    <q-card style="min-width: 305px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          <q-icon name="search"></q-icon> Opciones de b&uacute;squeda
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-select
          v-model="column"
          dense
          options-dense
          :options="fields"
          label="Columna"
          emit-value
          map-options
          style="min-width: 150px"
          :class="fields.length == 1 ? 'hidden' : ''"
        />
        <q-select
          v-model="condition"
          dense
          options-dense
          :options="conditions"
          :label="fields.length == 1 ? fields[0].label : 'Condición'"
          emit-value
          map-options
          style="min-width: 150px"
        />
        <q-input
          v-model="query"
          label="Frase"
          dense
          style="min-width: 150px"
          :error="querySearchError"
          :error-message="querySearchMsg"
          @keyup.enter="search"
          @update:model-value="onChangeQuery"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          color="secondary"
          :label="$q.lang.label.search"
          @click="search()"
        />
        <q-btn
          flat
          :label="$q.lang.label.reset"
          color="brown"
          @click="resetSearch()"
          v-if="searched"
        />
        <q-btn flat :label="$q.lang.label.close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import QBtnComponent from "src/components/base/QBtnComponent.vue";
import { $t } from "src/services/i18n";
import { useQuasar } from "quasar";
defineOptions({
  name: "SearchComponent",
});

import { ref, onMounted, watch } from "vue";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const $q = useQuasar();

const emit = defineEmits(["search", "reset"]);

const conditions = [
  {
    label: "Igual a",
    value: "equal",
  },
  {
    label: "Diferente de",
    value: "nequal",
  },
  {
    label: "Cominenza con",
    value: "start",
  },
  {
    label: "Termina en",
    value: "end",
  },
  {
    label: "Contiene",
    value: "contains",
  },
  {
    label: "No contiene",
    value: "ncontains",
  },
];
const column = ref(null);
const condition = ref({
  label: "Contiene",
  value: "contains",
});
const query = ref(null);

const querySearchError = ref(false);
const querySearchMsg = $t("validations.required");
const searched = ref(false);
const showDialog = ref(false);

onMounted(() => {
  column.value = props.fields[0];
});

const onChangeQuery = () => {
  if (!!query.value?.trim()) {
    querySearchError.value = false;
  }
};

function search() {
  if (!!query.value?.trim()) {
    $q.notify({
      position: "top-right",
      message: "OK",
      type: "success",
      progress: true,
    });
  } else {
    querySearchError.value = true;
    $q.notify({
      position: "top-right",
      message: $t("errorValidation"),
      type: "negative",
      progress: true,
    });
  }
}
function resetSearch() {
  emit("reset");
}
</script>
