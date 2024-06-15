<template>
  <q-page padding>
    <LoaderPage :show="false" :dark="false"></LoaderPage>

    <div class="flex flex-center">
      <div style="width:500px;">
        <q-date-field label="birthday" name="birthday" :model-value="data" required @update="(val)=>data=val"
                      :options="{}" multiple range>

        </q-date-field>
        <picture-field avatar @change="(val)=>data=val"></picture-field>
        {{ data }}
      </div>


    </div>
  </q-page>
</template>

<script setup>
import {useQuasar} from "quasar";
import {ref} from 'vue';
import IconPickerField from "src/components/base/IconPickerField.vue";
import LoaderPage from "components/base/LoaderPage.vue";
import TextField from "components/base/form/TextField.vue";
import NumberField from "components/base/form/NumberField.vue";
import {$t} from "src/services/i18n";
import QDateField from "components/base/form/DateField.vue";
import PictureField from "components/base/PictureField.vue";

const $q = useQuasar();
document.title = document.title + " - Debug";

const text = ref('')
const data = ref("2024-06-05|2024-06-05;2024-06-06|2024-06-21;2024-06-29|2024-06-29")

</script>

<style scoped lang="css">

</style>
