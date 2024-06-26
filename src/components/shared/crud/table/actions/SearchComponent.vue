<template>
  <div class="q-gutter-md flex" v-if="$q.screen.gt.sm">
    <q-select
      v-model="column"
      dense
      options-dense
      :options="fields"
      :label="$t('labels.column')"
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
      :label="fields.length == 1 ? fields[0].label : $t('conditions.condition')"
      emit-value
      map-options
      hide-bottom-space
    />
    <q-input
      bottom-slots
      v-model="query"
      :error="querySearchError"
      :error-message="querySearchMsg"
      :label="$t('labels.phrase')"
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
    <q-card>
      <dialog-header-component
        icon="search"
        :title="$t('titles.search')"
        closable
      />
      <q-card-section class="q-gutter-md">
        <q-select
          v-model="column"
          dense
          options-dense
          :options="fields"
          :label="$t('labels.column')"
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
          :label="
            fields.length == 1 ? fields[0].label : $t('conditions.condition')
          "
          emit-value
          map-options
          style="min-width: 150px"
        />
        <q-input
          v-model="query"
          :label="$t('labels.phrase')"
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
import DialogHeaderComponent from "src/components/base/DialogHeaderComponent.vue";
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
  searched: {
    type: Boolean,
    default: false,
  },
});

const $q = useQuasar();

const emit = defineEmits(["search", "reset"]);

const showDialog = ref(false);

const conditions = [
  {
    label: $t("conditions.equal"),
    value: "equal",
  },
  {
    label: $t("conditions.distinct"),
    value: "nequal",
  },
  {
    label: $t("conditions.start"),
    value: "start",
  },
  {
    label: $t("conditions.end"),
    value: "end",
  },
  {
    label: $t("conditions.contains"),
    value: "contains",
  },
  {
    label: $t("conditions.not_contains"),
    value: "ncontains",
  },
];
const column = ref(null);
const condition = ref({
  label: $t("conditions.contains"),
  value: "contains",
});

const query = ref("");

const querySearchError = ref(false);
const querySearchMsg = ref($t("validations.required"));

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

const onChangeQuery = (val) => {
  querySearchError.value = false;
};

function refreshSearch() {
  condition.value = {
    label: $t("conditions.contains"),
    value: "contains",
  };
  column.value = props.fields[0].value;
  query.value = "";
}

function search() {
  if (query.value?.trim() !== "") {
    emit("search", config.value.current);
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
