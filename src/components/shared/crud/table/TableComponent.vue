<template>
  <q-card flat bordered>
    <q-table
      :rows="records"
      :columns="columns"
      :grid="$q.screen.lt.sm"
      :loading="loading"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[10, 20, 30, 50, 100]"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      v-model:pagination="pagination"
      binary-state-sort
      @request="onRequest"
    >
      <!-- <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template> -->

      <template v-slot:top="props">
        <q-toolbar>
          <section class="q-my-xs q-mr-sm cursor-pointer text-subtitle1">
            <div class="doc-card-title bg-primary text-white">
              <q-icon :name="current_collection.ico" size="22px" />
              {{ $t(`models.${current_collection.plural_label}`) }}
            </div>
          </section>
          <q-space />
          <div class="col-auto">
            <form-component
              :title="current_collection.singular_label"
              :fields="createFields"
              :collection="current_collection.collection"
              size="sm"
              @created="onCreated"
              v-if="hasAdd && createFields.length > 0"
            />
            <delete-component
              :objects="selected"
              :collection="current_collection.collection"
              :modelName="current_collection.singular_label"
              @deleted="onDeleted"
              v-if="selected.length > 0 && hasDelete"
            />
            <visible-columns-component
              :columns="columns"
              @change="(vc) => (visibleColumns = vc)"
            />
            <filter-component
              :fields="filterFields"
              @filter="onFilter"
              @clear="onFilterClear"
              v-if="filterFields.length > 0"
            />
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
            <search-component
              :fields="searchFields"
              @search="onSearch"
              @reset="onSearchClear"
            ></search-component>
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
          :class="props?.col?.name === 'actions' ? 'last-column-sticky' : ''"
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
          <history-component :object="[props.row]" v-if="hasHistory" />
          <see-component :fields="columns" :object="props.row" v-if="hasView" />
          <form-component
            :object="props.row"
            :collection="current_collection.collection"
            :title="current_collection.singular_label"
            :fields="updateFields"
            @updated="onUpdated"
            v-if="hasEdit && updateFields.length > 0"
          />
          <delete-component
            :objects="[props.row]"
            :collection="current_collection.collection"
            :modelName="current_collection.singular_label"
            size="xs"
            @deleted="onDeleted"
            v-if="hasDelete"
          />
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
                      v-if="hasHistory"
                    />
                    <see-component
                      :fields="columns"
                      :object="props.row"
                      v-if="hasView"
                    />
                    <form-component
                      :object="props.row"
                      :collection="current_collection.collection"
                      :title="current_collection.singular_label"
                      :fields="updateFields"
                      @updated="onUpdated"
                      v-if="hasEdit && updateFields.length > 0"
                    />
                    <delete-component
                      :objects="[props.row]"
                      :collection="current_collection.collection"
                      :modelName="current_collection.singular_label"
                      size="xs"
                      @deleted="onDeleted"
                      v-if="hasDelete"
                    />
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
import { ref, onBeforeMount, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import FilterComponent from "./actions/FilterComponent.vue";
import SearchComponent from "./actions/SearchComponent.vue";
import DeleteComponent from "./actions/DeleteComponent.vue";
import VisibleColumnsComponent from "./actions/VisibleColumnsComponent.vue";
import FormComponent from "../form/FormComponent.vue";
import HistoryComponent from "../form/HistoryComponent.vue";
import SeeComponent from "../form/SeeComponent.vue";
import QBtnComponent from "src/components/base/QBtnComponent.vue";
import { $t } from "src/services/i18n";
import { useCollectionsStore } from "src/stores/collections";
import { useAuthStore } from "src/stores/auth";
import { errorException } from "src/helpers/notifications";

defineOptions({
  name: "TableComponent",
});

const props = defineProps({
  toStr: {
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
  rowsFromDB: {
    type: Boolean,
    default: true,
  },
  searchFields: {
    type: Array,
    default: () => [],
  },
  filterFields: {
    type: Array,
    default: () => [],
  },
  updateFields: {
    type: Array,
    default: () => [],
  },
  createFields: {
    type: Array,
    default: () => [],
  },
});

const $q = useQuasar();

const $router = useRouter();

const loading = ref(false);

const current_collection = ref(null);

const hasAdd = ref(false);
const hasEdit = ref(false);
const hasView = ref(false);
const hasDelete = ref(false);
const hasHistory = ref(false);

const pagination = ref({
  descending: false,
  page: 1,
  rowsPerPage: 10,
  max: 1,
  rowsNumber: 1,
  search: null,
  filters: [],
});

const selected = ref([]);

const visibleColumns = ref([]);

const records = ref([]);

const store = useCollectionsStore();

onBeforeMount(() => {
  current_collection.value = getCurrentCollection();
  const permissions = current_collection.value.permissions;
  hasAdd.value = permissions.includes("create");
  hasEdit.value = permissions.includes("update");
  hasDelete.value = permissions.includes("delete");
  hasHistory.value = permissions.includes("history");
  hasView.value = permissions.includes("view");
});

const getCurrentCollection = () => {
  const current_route = $router.currentRoute.value.name;
  const authStore = useAuthStore();
  const applications = authStore.user.app_list;
  for (let i = 0; i < applications.length; i++) {
    if (applications[i].url === current_route) {
      return applications[i];
    } else {
      const models = applications[i].models ? applications[i].models : [];
      for (let j = 0; j < models.length; j++) {
        if (models[j].url === current_route) {
          return models[j];
        }
      }
    }
  }
  return null;
};

onMounted(() => {
  visibleColumns.value = props.columns
    .filter((c) => c.type !== "hidden" && !c.required)
    .map((c) => c.field);
  if (props.rowsFromDB) {
    onRequest();
  } else {
    records.value = props.rows;
  }
});

const onFilter = (filters) => {
  pagination.value.filters = filters;
  onRequest();
};

const onFilterClear = () => {
  pagination.value.filters = [];
  pagination.value.page = 1;
  onRequest();
};

const onSearch = (attrs) => {
  const { column, condition, query } = attrs;
  pagination.value.search = {
    column,
    condition,
    query,
  };
  pagination.value.page = 1;
  onRequest();
};

const onSearchClear = () => {
  pagination.value.search = null;
  pagination.value.page = 1;
  onRequest();
};

const onCreated = (record) => {
  onRequest();
};

const onUpdated = (record) => {
  onRequest();
};

const onDeleted = (objects) => {
  objects.forEach((d) => {
    selected.value = selected.value.filter((s) => s.id !== d.id);
  });
  onRequest();
};

const onRequest = async (attrs) => {
  const { page, rowsPerPage, sortBy, descending, search, filters } = attrs
    ? attrs.pagination
    : pagination.value;
  try {
    loading.value = true;
    let config = {};
    if (sortBy) {
      config["sort"] = `${descending ? "-" : ""}${sortBy}`;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
    }
    if (search) {
      config["filter"] = `${search.column} ${search.condition} ${search.query}`;
    }
    if (filters.length > 0) {
      if (config["filter"]) {
        config["filter"] += " && ";
      } else {
        config["filter"] = `${filters[0].name} = ${filters[0].value}`;
      }
      for (let index = 1; index < filters.length; index++) {
        config[
          "filter"
        ] += ` && ${filters[index].name} = ${filters[index].value}`;
      }
    }
    const result = await store.fetch(
      current_collection.value.collection,
      page,
      rowsPerPage,
      config
    );
    records.value = result.items;
    pagination.value.max = result.totalPages;
    pagination.value.rowsNumber = result.totalItems;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
  } catch (e) {
    errorException(e);
  } finally {
    loading.value = false;
  }
};
</script>
<style>
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
  left: 0;
}
.q-table td.actions-def,
th:nth-child(1),
tbody > tr > td:nth-child(1),
.q-table th.last-column-sticky {
  position: sticky;
  z-index: 99;
  background-color: #fff;
}
.q-table--dark td.actions-def,
.q-table--dark th:nth-child(1),
.q-table--dark th.last-column-sticky,
.q-table--dark tbody > tr > td:nth-child(1) {
  background-color: #1d222e;
}
td.actions-def > .q-btn {
  margin-right: 3px;
}

.q-table th.last-column-sticky {
  right: 0;
}
</style>
