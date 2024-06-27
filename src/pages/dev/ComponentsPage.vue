<template>
  <q-page class="q-pa-md">
    <p><b>Radios (pasar como propiedades)</b></p>
    <ul>
      <li>:label="etiqueta a mostrar encima de los radios"</li>
      <li>:inline="true" (radios en línea)</li>
      <li>:dense="true" (con menos espacio)</li>
      <li>:leftLabel="true" (label a la izquierda)</li>
      <li>:options=[{label: 'label', value: 'val'}, ...]</li>
      <li>:modelValue="value" (número o string)</li>
      <li>@update="functionName"</li>
    </ul>
    <div class="row">
      <div class="col">
        <radio-field
          label="Group"
          name="group_1"
          :modelValue="radio1"
          :options="radios"
          @update="(val) => (radio1 = val)"
        />
        <span v-if="radio1"
          >Selected value <b>{{ radio1 }}</b></span
        >
      </div>
      <div class="col">
        <radio-field
          label="Left label group"
          name="group_left"
          :options="radios"
          :leftLabel="true"
          @update="(val) => (radio2 = val)"
        />
        <span v-if="radio2"
          >Selected value <b>{{ radio2 }}</b></span
        >
      </div>
    </div>
    <div class="row">
      <div class="col">
        <radio-field
          label="Inline"
          name="group_inline"
          :options="radios"
          :inline="true"
          @update="(val) => (radio3 = val)"
        />
        <span v-if="radio3"
          >Selected value <b>{{ radio3 }}</b></span
        >
      </div>
      <div class="col">
        <radio-field
          label="Left label inline"
          name="group_inline_left"
          :options="radios"
          :inline="true"
          :leftLabel="true"
          @update="(val) => (radio4 = val)"
        />
        <span v-if="radio4"
          >Selected value <b>{{ radio4 }}</b></span
        >
      </div>
    </div>

    <hr />
    <p><b>Checkbox (pasar como propiedades)</b></p>
    <ul>
      <li>:label="etiqueta a mostrar encima de los checkboxs"</li>
      <li>:inline="true" (checkboxs en línea)</li>
      <li>:leftLabel="true" (label a la izquierda)</li>
      <li>:toggle="true" (toggle)</li>
      <li>:dense="true" (con menos espacio)</li>
      <li>:options=[{label: 'label', value: 'val'}, ...]</li>
      <li>:modelValue="value" (array)</li>
      <li>@update="functionName"</li>
    </ul>
    <div class="row">
      <div class="col">
        <checkbox-field
          label="Group"
          name="check_1"
          :modelValue="checkbox1"
          :options="checkboxs"
          @update="(val) => (checkbox1 = val)"
        />
        <span v-if="checkbox1.length > 0"
          >Selected value <b>{{ checkbox1 }}</b></span
        >
      </div>
      <div class="col">
        <checkbox-field
          label="Left label group"
          name="check_2"
          :options="checkboxs"
          :leftLabel="true"
          @update="(val) => (checkbox2 = val)"
        />
        <span v-if="checkbox2.length > 0"
          >Selected value <b>{{ checkbox2 }}</b></span
        >
      </div>
      <div class="col">
        <checkbox-field
          label="Toggle"
          name="toggle"
          :options="checkboxs"
          :toggle="true"
          @update="(val) => (toggle = val)"
        />
        <span v-if="toggle.length > 0"
          >Selected value <b>{{ toggle }}</b></span
        >
      </div>
    </div>
    <div class="row">
      <div class="col">
        <checkbox-field
          label="Inline"
          name="check_3"
          :options="checkboxs"
          :inline="true"
          :modelValue="checkbox3"
          @update="(val) => (checkbox3 = val)"
        />
        <span v-if="checkbox3.length > 0"
          >Selected value <b>{{ checkbox3 }}</b></span
        >
      </div>
      <div class="col">
        <checkbox-field
          label="Left label inline"
          name="check_4"
          :options="checkboxs"
          :inline="true"
          :leftLabel="true"
          @update="(val) => (checkbox4 = val)"
        />
        <span v-if="checkbox4.length > 0"
          >Selected value <b>{{ checkbox4 }}</b></span
        >
      </div>
    </div>
    <hr />
    <p><b>Rangos (pasar como propiedades)</b></p>
    <ul>
      <li>:label="etiqueta a mostrar encima"</li>
      <li>:min="0" (mínimo)</li>
      <li>:max="100" (máximo)</li>
      <li>@update="functionName" (parametros: name, val)</li>
    </ul>
    <div class="row">
      <div class="col">
        <range-field
          label="Rango"
          :min="0"
          :max="100"
          name="range_1"
          @update="(name, val) => (range = val)"
        />
        <span v-if="range"
          >Mínimo <b>{{ range.min }}</b
          >, Máximo <b>{{ range.max }}</b></span
        >
      </div>
    </div>
    <hr />
    <p><b>Archivos (pasar como propiedades)</b></p>
    <ul>
      <li>:label="etiqueta a mostrar encima"</li>
      <li>:multiple="true" (permitir seleccionar varios archivos)</li>
      <li>:clearable="true" (mostrar limpiar archivos)</li>
      <li>:dense="true" (con menos espacio)</li>
      <li>@update="functionName"</li>
    </ul>
    <div class="row">
      <div class="col">
        <file-field
          label="Simple"
          name="file"
          @update="(val) => (file = val)"
        />
        <span v-if="file"
          >Archivo <b>{{ file }}</b>
        </span>
      </div>
      <div class="col"></div>
      <div class="col">
        <file-field
          label="Multiple"
          name="files"
          multiple
          @update="(val) => (files = val)"
        />
        <span v-if="file"
          >Archivo <b>{{ files }}</b>
        </span>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import RadioField from "src/components/base/form/RadioField.vue";
import CheckboxField from "src/components/base/form/CheckboxField.vue";
import RangeField from "src/components/base/form/RangeField.vue";
import FileField from "src/components/base/form/FileField.vue";
const $q = useQuasar();
document.title = document.title + " - Iconos";

//para usar el componente radio debe usar el formato [{label: 'Label', value: 'value'}, ...]

const radios = [];
const checkboxs = [];

for (let i = 0; i < 4; i++) {
  radios.push({
    label: `Radio ${i + 1}`,
    value: `radio_${i + 1}`,
  });
  checkboxs.push({
    label: `Checkbox ${i + 1}`,
    value: `checkbox_${i + 1}`,
  });
}

const radio1 = ref("radio_2");
const radio2 = ref(null);
const radio3 = ref(null);
const radio4 = ref(null);

const checkbox1 = ref(["checkbox_1", "checkbox_3"]);
const checkbox2 = ref([]);
const checkbox3 = ref(["checkbox_1"]);
const checkbox4 = ref([]);
const toggle = ref([]);

const range = ref(null);
const file = ref(null);
const files = ref(null);
</script>
