<template>
  <q-card flat bordered>
    <q-table
      :rows="rows"
      :columns="columns"
      :grid="$q.screen.lt.sm"
      :loading="loadingTable"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[10, 20, 30, 50, 100]"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      @update:selected="(s) => (objects_selected = s)"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top="props">
        <q-toolbar>
          <section class="q-my-xs q-mr-sm cursor-pointer text-subtitle1">
            <div class="doc-card-title bg-primary text-white">
              <q-icon :name="icon" size="22px" /> {{ label_plural }}
            </div>
          </section>
          <q-space />
          <div class="col-auto">
            <form-component
              size="sm"
              :object_label="label_singular"
            ></form-component>
            <delete-component
              :objects="objects_selected"
              v-if="has_delete"
            ></delete-component>
            <visible-columns-component
              :columns="columns"
              @change="(vc) => (visibleColumns = vc)"
            ></visible-columns-component>
            <filter-component :fields="filterFields"></filter-component>
            <q-btn-component
              :tooltips="
                $t(
                  props.inFullscreen
                    ? 'labels.restoreWindow'
                    : 'labels.maximizeWindow'
                )
              "
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
            />
          </div>
        </q-toolbar>
        <div
          class="row"
          style="
            width: 100%;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            padding: 10px;
          "
          v-if="searchFields.length > 0 || filterFields.length > 0"
        >
          <div class="col" v-if="searchFields.length > 0">
            <search-component :fields="searchFields"></search-component>
          </div>
        </div>
      </template>

      <template v-slot:header-selection="scope">
        <q-checkbox v-model="scope.selected" size="sm" />
      </template>

      <template v-slot:body-selection="scope">
        <q-checkbox v-model="scope.selected" size="sm" />
      </template>
      <template #header-cell="props">
        <q-th
          :props="props"
          :align="props.col.align"
          v-if="props.col.type !== 'hidden'"
        >
          {{ props.col.name !== "actions" ? props.col.label : "" }}
        </q-th>
      </template>

      <template #body-cell="props">
        <q-td
          :props="props"
          :align="props.col.align"
          v-if="props.col.type !== 'hidden'"
        >
          <template v-if="props.col.type === 'avatar'">
            <q-avatar v-if="props.value">
              <q-img :src="props.value" loading="lazy" />
            </q-avatar>
            <q-avatar v-else>
              <q-img src="~assets/default-avatar.png" loading="lazy" />
            </q-avatar>
          </template>
          <template v-else-if="props.col.type === 'boolean'">
            <q-chip
              dense
              size="sm"
              style="max-width: min-content"
              :color="props.value ? 'positive' : 'negative'"
              text-color="white"
              :icon="props.value ? 'check' : 'error'"
              :label="props.value ? 'Si' : 'No'"
            />
          </template>
          <template v-else-if="props.col.type === 'textarea'">
            <span v-if="props.row[props.col.field].length <= 20">
              {{ props.row[props.col.field] }}
            </span>
            <span v-else
              >{{ props.row[props.col.field].substring(0, 17) }}
              <b>
                ...
                <q-tooltip class="bg-brown">Click para ver detalles</q-tooltip>
              </b>
            </span>
          </template>
          <template v-else>
            {{ props.row[props.col.field] }}
          </template>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td
          :props="props"
          style="width: 0; position: sticky; right: 0"
          class="actions-def"
        >
          <history-component
            :object="[props.row]"
            v-if="has_history"
          ></history-component>
          <form-component
            :object="[props.row]"
            :object_label="label_singular"
            v-if="has_edit"
          ></form-component>
          <see-component :object="[props.row]" v-if="has_see"></see-component>
          <delete-component
            :objects="[props.row]"
            size="xs"
            v-if="has_delete"
          ></delete-component>
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <q-card style="margin-left: 10px; margin-right: 10px">
            <q-list>
              <q-item
                v-for="col in props.cols"
                :key="col.name"
                :class="col.type === 'hidden' ? 'hidden' : ''"
              >
                <q-item-section v-if="col.name !== 'actions'">
                  <q-item-label v-if="col.type !== 'avatar'">
                    {{ $t(col.label) }}
                  </q-item-label>
                  <q-item-label
                    v-if="col.type === 'avatar'"
                    class="text-center"
                  >
                    <q-avatar v-if="col.value">
                      <q-img :src="col.value" loading="lazy" />
                    </q-avatar>
                    <q-avatar v-else>
                      <q-img src="~assets/default-avatar.png" loading="lazy" />
                    </q-avatar>
                  </q-item-label>
                  <q-item-label v-else-if="col.type === 'boolean'">
                    <q-chip
                      dense
                      size="sm"
                      style="max-width: min-content"
                      :color="col.value ? 'positive' : 'negative'"
                      text-color="white"
                      :icon="col.value ? 'check' : 'error'"
                      :label="col.value ? 'Si' : 'No'"
                    />
                  </q-item-label>
                  <q-item-label caption v-else>{{
                    col.value ? col.value : "..."
                  }}</q-item-label>
                </q-item-section>
                <q-item-section v-else-if="col.name === 'actions'">
                  <q-separator />
                  <div class="q-pa-sm q-gutter-sm text-right">
                    <history-component
                      :object="[props.row]"
                      v-if="has_history"
                    ></history-component>
                    <form-component
                      :object="[props.row]"
                      :object_label="label_singular"
                      v-if="has_edit"
                    ></form-component>
                    <see-component
                      :object="[props.row]"
                      v-if="has_see"
                    ></see-component>
                    <delete-component
                      :objects="[props.row]"
                      size="xs"
                      v-if="has_delete"
                    ></delete-component>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import FilterComponent from "./actions/FilterComponent.vue";
import SearchComponent from "./actions/SearchComponent.vue";
import DeleteComponent from "./actions/DeleteComponent.vue";
import VisibleColumnsComponent from "./actions/VisibleColumnsComponent.vue";
import FormComponent from "../form/FormComponent.vue";
import HistoryComponent from "../form/HistoryComponent.vue";
import SeeComponent from "../form/SeeComponent.vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
import { $t } from "src/services/i18n";

defineOptions({
  name: "TableComponent",
});

const props = defineProps({
  name: {
    type: String,
    default: "object",
  },
  label_plural: {
    type: String,
    default: "Objetos",
  },
  label_singular: {
    type: String,
    default: "Objetos",
  },
  to_str: {
    type: String,
    default: "id",
  },
  icon: {
    type: String,
    default: "list",
  },
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  searchFields: {
    type: Array,
    default: () => [],
  },
  filterFields: {
    type: Array,
    default: () => [],
  },
  has_add: {
    type: Boolean,
    default: true,
  },
  has_edit: {
    type: Boolean,
    default: true,
  },
  has_see: {
    type: Boolean,
    default: true,
  },
  has_delete: {
    type: Boolean,
    default: true,
  },
  has_history: {
    type: Boolean,
    default: true,
  },
});

const $q = useQuasar();

const selected = ref([]);

const loadingTable = ref(false);

const visibleColumns = ref([]);

const objects_selected = ref([]);

onMounted(() => {
  visibleColumns.value = props.columns
    .filter((c) => c.type !== "hidden" && !c.required)
    .map((c) => c.field);
});
</script>
<style scope>
.q-table__top {
  padding: 0px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.q-table__top .q-btn {
  margin-left: 5px;
}
.doc-card-title {
  margin-left: -24px;
  padding: 2px 10px 2px 24px;
  position: relative;
  border-radius: 3px 5px 5px 0;
}

.doc-card-title:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-top-color: var(--q-primary);
  border-width: 9px 0 0 11px;
}

.doc-card-title .q-icon {
  margin-top: -3px;
}

th:nth-child(1),
tbody > tr > td:nth-child(1) {
  position: sticky;
  left: 0;
  z-index: 99;
}
.q-table td.actions-def,
th:nth-child(1),
tbody > tr > td:nth-child(1) {
  background-color: #fff;
}
.q-table--dark td.actions-def,
.q-table--dark th:nth-child(1),
.q-table--dark tbody > tr > td:nth-child(1) {
  background-color: #1d222e;
}
td.actions-def > .q-btn {
  margin-right: 3px;
}
</style>
