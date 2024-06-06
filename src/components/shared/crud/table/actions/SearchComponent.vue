<template>
  <div class="q-gutter-md flex" v-if="$q.screen.gt.sm">
    <q-select
      v-model="config.current.column"
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
      v-model="config.current.condition"
      dense
      options-dense
      :options="config.conditions"
      :label="fields.length == 1 ? fields[0].label : 'Condición'"
      emit-value
      map-options
      hide-bottom-space
    />
    <q-input
      bottom-slots
      v-model="config.current.value"
      label="Frase"
      dense
      hide-bottom-space
      @keyup.enter="search()"
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
        <q-btn flat dense color="secondary" icon="search" @click="search()">
          <q-tooltip class="bg-brown">{{ $q.lang.label.search }}</q-tooltip>
        </q-btn>
      </template>
    </q-input>
  </div>
  <q-btn-group v-else outline>
    <q-btn color="secondary" icon="search" @click="config.show = true" outline>
      <q-tooltip class="bg-brown">{{ $q.lang.label.search }}</q-tooltip>
    </q-btn>
    <q-btn color="brown" icon="close" v-if="searched" @click="resetSearch()">
      <q-tooltip class="bg-brown">{{ $q.lang.label.reset }}</q-tooltip>
    </q-btn>
  </q-btn-group>

  <q-dialog v-model="config.show">
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
          v-model="config.current.column"
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
          v-model="config.current.condition"
          dense
          options-dense
          :options="config.conditions"
          :label="fields.length == 1 ? fields[0].label : 'Condición'"
          emit-value
          map-options
          style="min-width: 150px"
        />
        <q-input
          v-model="config.current.value"
          label="Frase"
          dense
          style="min-width: 150px"
          @keyup.enter="search()"
        />
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
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
  searched: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["search", "resetSearch"]);

const config = ref({
  show: false,
  current: {
    column: null,
    condition: null,
    value: null,
  },
  conditions: [
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
  ],
});

onMounted(() => {
  refreshSearch();
});

watch(() => props.fields, refreshSearch);

watch(
  () => props.searched,
  () => {
    if (!props.searched) {
      refreshSearch();
    }
  }
);

function refreshSearch() {
  config.value.current = {
    column: props.fields[0].value,
    condition: {
      label: "Contiene",
      value: "contains",
    },
    value: "",
  };
}

function search() {
  emit("search", config.value.current);
}
function resetSearch() {
  emit("resetSearch");
}
</script>
