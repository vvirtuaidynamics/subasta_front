<template>
  <q-btn-component
    :class="
      filteredBy && filteredBy.length > 0 ? 'animated pulse infinite' : ''
    "
    :tooltips="$q.lang.label.filter"
    icon="filter_alt"
    @click="showDialog = true"
  />

  <q-dialog v-model="showDialog" position="right" full-height>
    <q-card style="width: 400px">
      <dialog-header-component
        icon="filter_alt"
        :title="$t('titles.filter')"
        closable
      />
      <q-card-section>
        <div
          class="row"
          v-for="(f, index) in filters"
          :key="`filter-${index}`"
          style="padding-bottom: 10px"
        >
          <select-field
            :name="f.scope"
            :label="f.label"
            :options="f.options"
            :modelValue="f.value"
            :filterable="f.filterable"
            @update="onUpdate"
            v-if="f.type === 'select'"
          />
          <boolean-select-field
            :name="f.scope"
            :label="f.label"
            :modelValue="f.value"
            @update="onUpdate"
            v-if="f.type === 'boolean'"
          />
          <date-range-field
            :name="f.scope"
            :label="f.label"
            :modelValue="f.value"
            @update="onUpdate"
            v-if="f.type === 'date'"
          />
          <range-field
            :name="f.scope"
            :label="f.label"
            :modelValue="f.value"
            :min="f.min"
            :max="f.max"
            @update="onUpdate"
            v-if="f.type === 'range'"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          :label="$q.lang.label.reset"
          color="brown"
          @click="reset"
          v-if="filteredBy && filteredBy.length > 0"
        />
        <q-btn flat :label="$q.lang.label.close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DialogHeaderComponent from "src/components/base/DialogHeaderComponent.vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
import SelectField from "src/components/base/form/SelectField.vue";
import BooleanSelectField from "src/components/base/form/BooleanSelectField.vue";
import DateRangeField from "src/components/base/form/DateRangeField.vue";
import RangeField from "src/components/base/form/RangeField.vue";
import { $t } from "src/services/i18n";

defineOptions({
  name: "FilterComponent",
});

const props = defineProps({
  fields: {
    type: Array,
    required: true,
    default: () => [],
  },
  filteredBy: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["filter", "reset"]);

const config = ref({
  show: false,
});

const showDialog = ref(false);

const filters = ref([]);

const currentFilters = ref([]);

onMounted(() => {
  filters.value = props.fields;
});

function filter(f) {
  emit("filter", f);
}

function reset() {
  emit("reset");
}

const onUpdate = (name, val) => {
  let current = filters.value.find((f) => f.scope === name);
  current.value =
    val !== null
      ? current.type === "select" || current.type === "boolean"
        ? Array.isArray(val)
          ? val
          : [val]
        : val
      : null;
  currentFilters.value = filters.value.filter(
    (f) => f.value && f.value !== null
  );
  emit("filter", currentFilters.value);
};
</script>
