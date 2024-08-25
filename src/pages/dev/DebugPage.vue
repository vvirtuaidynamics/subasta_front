<template>
  <q-page padding class="flex flex-center">
    <form-builder name="carrier_register"></form-builder>
    <!--    <q-btn label="GET FORM DATA" @click="(val)=>handleGetForm('carrier_register')"></q-btn>-->
    <!--    <q-card class="full-width shadow-3" style="height: 80vh;">-->
    <!--      <q-card-section class="text-primary bg-grey-3 text-uppercase" style="height: 50px;">-->
    <!--        <q-icon v-if="module" size="28px" :name="module?.icon"></q-icon>-->
    <!--        {{ $t(form?.label || 'form') }}-->
    <!--      </q-card-section>-->
    <!--      <q-card-section v-if="loading" class="full-width full-height">-->
    <!--        <q-inner-loading :showing="loading">-->
    <!--          <q-spinner color="primary" :thickness="3" size="3em">-->
    <!--          </q-spinner>-->
    <!--          {{ $t('Loading') }}...-->

    <!--        </q-inner-loading>-->
    <!--      </q-card-section>-->
    <!--      <q-card-section v-else>-->
    <!--        <q-scroll-area style="height: calc(80vh - 80px);">-->
    <!--          {{ form }}-->

    <!--        </q-scroll-area>-->
    <!--      </q-card-section>-->
    <!--     -->
    <!--    </q-card>-->
  </q-page>
</template>

<script setup>
import {useApp} from "src/composables/useApp";
import useApi from "src/composables/useApi";
import {ref} from "vue";
import {$t} from "src/services/i18n"
import FormBuilder from "components/base/formBuilder/FormBuilder.vue";

const {getForm} = useApi()
const loading = ref(false);
const form = ref(null);
const module = ref(null)
const fields = ref(null)
const handleGetForm = async (formName) => {
  loading.value = true;
  const res = await getForm(formName)
  if (res.success) {
    form.value = res.data;
    module.value = res.data.module;
    fields.value = res.data.fields;
  }
  loading.value = false;

  console.log({res});
}

</script>

<style scoped lang="css"></style>

