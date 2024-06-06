<template>
  <q-page padding>

    <div class="full-width justify-around">
      <icon-picker-field picker icon-set="mdi"></icon-picker-field>
    </div>


  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import IconPickerField from 'src/components/base/IconPickerField.vue';
const $q = useQuasar()
document.title = document.title + " - Iconos"






</script>

