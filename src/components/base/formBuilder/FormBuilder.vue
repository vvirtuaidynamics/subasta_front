<script setup>
import useApi from "src/composables/useApi";
import {onBeforeMount, onMounted, ref} from "vue";
import {$t} from "src/services/i18n"
import laravelRules from "src/helpers/laravelRules";
import AvatarField from "components/base/form/AvatarField.vue";
import TextField from "components/base/form/TextField.vue";
import DateField from "components/base/form/DateField.vue";

defineOptions({
  name: "FormBuilder",
});

const props = defineProps({
  name: {
    type: String,
    require: true
  },

  noHeader: {
    type: Boolean,
    default: false
  },
  borderless: {
    type: Boolean,
    default: false
  },
  create: {
    type: Boolean,
    default: true
  },
  editing: {
    type: Boolean,
    default: false
  },
  borderRadius: {
    type: String,
    required: false
  },
  height: {
    type: String,
    default: 'calc(100vh * 0.8)'
  },
  update: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    default: () => {
    }
  }

})

// const
const {getForm} = useApi()
const {parseLaravelRules, checkExist, checkUnique, validateBefore, validateAfter} = laravelRules()

const module = ref(null);
const form = ref(null);
const fields = ref(null);
const loading = ref(false);
const formBuilder = ref(null);

const formData = ref({});
const formRules = ref({});
const formDefaultValues = ref([]);

function validate() {
  formBuilder.value.validate().then(success => {
    if (success) {
      // yay, models are correct
    } else {
      // oh no, user has filled in
      // at least one invalid value
    }
  })
}

function reset() {
  formBuilder.value.resetValidation()
}

async function getFormData(formName) {
  loading.value = true;
  try {
    const res = await getForm(formName)
    if (res && res.success) {
      form.value = res.data;
      module.value = res.data.module;
      fields.value = res.data.fields;
    }
  } catch (e) {
    console.log('getFormData error: ', e)
  } finally {
    loading.value = false;
  }

}

function handleFormData(key, value) {
  formData.value[key] = value
}

function save(newForm) {
  console.log('save')
}


onBeforeMount(async () => {
  await getFormData(props.name);
  if (fields.value && Array.isArray(fields.value)) {
    fields.value.forEach(async (field) => {
      formRules.value[field.name] = null
      formData.value[field.name] = field.default_value || null
      formRules.value[field.name] = await parseLaravelRules(field.pivot.rules)
    })
  }
})

onMounted(() => {
  console.log({fields: fields.value})
})

</script>

<template>
  <q-form ref="formBuilder" class="full-width">
    <q-card class="full-width" :class="`${borderless?'no-shadow no-border':''}`"
            :style="`${!borderless?'border-radius:'+borderRadius||'0px' :''}`">
      <q-card-section class="form-header text-uppercase" v-if="!noHeader">
        <q-icon v-if="(form && module)" size="28px" :name="module?.icon">
          <q-icon v-if="!editing" size="9px" name="fas fa-add" class=" absolute-top-right"></q-icon>
          <q-icon v-else size="9px" name="fas fa-pencil" class="absolute-top-right"></q-icon>
        </q-icon>
        {{ $t(form?.label || $t('form')) }}
      </q-card-section>
      <q-separator/>
      <q-card-section class="no-margin no-padding">
        <q-list class="row justify-center items-center">
          <q-item v-for="(field, index) in fields"
                  :class="`${field.component==='AvatarField'
                    ?'col-lg-12 col-md-12 col-sm-12 col-xs-12'
                    :'col-lg-6 col-md-6 col-sm-12 col-xs-12'
                  }`"
                  :key="index">

            <q-item-section v-if="field.component==='AvatarField'" class="flex flex-center">
              <avatar-field :name="field.name" :model-value="formData[field.name]" :editable="create||editing"
                            @update="(val)=>handleFormData(field.name)"></avatar-field>
            </q-item-section>

            <q-item-section v-if="field.component==='TextField'" class="flex flex-center">
              <text-field :label="$t(field.label)" :name="field.name" :model-value="formData[field.name]"
                          @update="(val)=>handleFormData(field.name,val)"
              ></text-field>
            </q-item-section>

            <q-item-section v-if="field.component==='DateField'" class="flex flex-center">
              <date-field :label="$t(field.label)" :name="field.name" :model-value="formData[field.name]"
                          @update="(val)=>handleFormData(field.name)"></date-field>
            </q-item-section>


          </q-item>

          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>

            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn
          outline
          :label="$t('labels.save')"
          color="primary"
          @click="save(false)"
        />
        <q-btn
          outline
          :label="$t('labels.saveAndAddOther')"
          color="primary"
          @click="save(true)"
          v-if="!editing"
        />
        <q-btn
          outline
          :label="$t('labels.cancel')"
          color="red"
          v-close-popup
        />
      </q-card-actions>


    </q-card>
  </q-form>
  {{ formData }}


</template>

<style scoped lang="scss">

</style>
