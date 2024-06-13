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
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          <q-icon name="filter_alt" size="25px"></q-icon> Opciones de filtrado
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="q-gutter-md"> </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          flat
          :label="$q.lang.label.reset"
          color="brown"
          @click="resetFilter()"
          v-if="filteredBy && filteredBy.length > 0"
        />
        <q-btn flat :label="$q.lang.label.close" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineOptions({
  name: "FilterComponent",
});

import { ref, onMounted, watch } from "vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";

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

const emit = defineEmits(["filter", "resetFilter"]);

const config = ref({
  show: false,
});

const showDialog = ref(false);

onMounted(() => {
  refresh();
});

watch(() => props.fields, refresh);

watch(
  () => props.filteredBy,
  () => {
    if (!props.filteredBy || props.filteredBy.length === 0) {
      props.fields.forEach(function (f) {
        f.value = null;
      });
    }
  }
);

function refresh() {
  props.fields.forEach(function (f) {
    if (f.type === "bool") {
      f.options = f.all_options = [
        {
          label: "Si",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ];
    } else if (f.type === "relation" && f.collection) {
      loadRelation(f);
    }
  });
}

async function loadRelation(f) {
  let collection = f.collection;
  let presentables = f.presentables;
  let values = [];
  if (!presentables || presentables.length === 0) {
    presentables = ["id"];
  }
  await pb
    .collection(collection)
    .getFullList()
    .then((records) => {
      records.forEach(function (r) {
        let valor = "";
        presentables.forEach(function (p) {
          valor += r[p] + " > ";
        });
        if (valor !== "") {
          valor = valor.substring(0, valor.lastIndexOf(" >"));
        }
        values.push({
          label: valor,
          value: r["id"],
        });
      });
      f.options = f.all_options = values;
    })
    .catch((errResult) => {
      values = [];
    });
}

function updateProxyDateFilter(field) {
  if (field.value) {
    let date = field.value.split(" - ");
    if (date[0] === date[1]) {
      field.proxy = date[0];
    } else {
      field.proxy = {
        from: date[0],
        to: date[1],
      };
    }
  }
}

function saveDateFilter(name, field) {
  if (field.proxy) {
    if (field.proxy.from) {
      field.value = field.proxy.from + " - " + field.proxy.to;
    } else {
      field.value = field.proxy + " - " + field.proxy;
    }
  } else {
    field.value = null;
  }
  filter(name);
}

function clearDateFilter(name, field) {
  field.proxy = field.value = null;
  filter(name);
}

function filterFn(val, update, abort, f) {
  setTimeout(() => {
    update(
      () => {
        if (val === "") {
          f.options = f.all_options;
        } else {
          const needle = val.toLowerCase();
          f.options = f.all_options.filter((v) =>
            v.label
              ? v.label.toLowerCase().indexOf(needle) > -1
              : v.toLowerCase().indexOf(needle) > -1
          );
        }
      },
      (ref) => {
        if (
          val !== "" &&
          ref.options.length > 0 &&
          ref.getOptionIndex() === -1
        ) {
          ref.moveOptionSelection(1, true);
          ref.toggleOption(ref.options[ref.optionIndex], true);
        }
      }
    );
  }, 100);
}

function abortFilterFn() {
  // body...
}

function filter(f) {
  emit("filter", f);
}

function resetFilter() {
  emit("resetFilter");
}
</script>
