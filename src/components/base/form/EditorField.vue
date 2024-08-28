<template>
  <div>
    <q-editor ref="editor" v-model="textEditor" @update:model-value="(txt) => update(txt)"
              :dense="$q.screen.lt.md"
              :rules="fieldRules"
              v-bind="fieldOptions"
              :definitions="{
              upload: {
                tip: `${$t('labelInsertImage')}`,
                icon: 'photo',
                handler: showImageDialog,
              },

            }" :toolbar="[
  [
    'bold',
    'italic',
    'strike',
    'underline',
    'subscript',
    'superscript',
  ],
  ['undo', 'redo'],
  ['left', 'center', 'right', 'justify'],

  [
    'hr',
    // 'link',
    'upload'],
  [
    {
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7',
      ],
    },
    'removeFormat',
  ],
  ['quote', 'unordered', 'ordered'],
  // ['viewsource'],
]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana',
}">
    </q-editor>
    <q-dialog v-model="imageDialog">
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <avatar-field name="avatar" square editable
                        @update="(val)=>handleSelectImage(val)">

          </avatar-field>
          <q-space/>

          <div class="text-h6">{{ $t('labelInsertImage') }}</div>

          <q-space/>
          <q-btn class="absolute-top-right q-ma-sm" icon="close" flat round dense v-close-popup/>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-md">
            <q-input ref="imageUrl" v-model="selectedImg.src" outlined dense
                     :placeholder="`${$t('labelInsertUrlImage')}`"
                     :label="$t('Imagen URL')"/>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col">
              <q-input v-model="selectedImg.width" outlined dense
                       :placeholder="`${$t('width')}`"
                       :label="`${$t('width')}`"/>
            </div>
            <div class="col">
              <q-input v-model="selectedImg.height" outlined dense :placeholder="`${$t('height')}`"
                       :label="`${$t('height')}`"/>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn @click="insertImage" color="primary" flat :label="$t('labelInsertImage')"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <!-- {{ test }} -->
</template>
<script setup>
import {$t} from "src/services/i18n"
import AvatarField from "components/base/form/AvatarField.vue";
import {useQuasar} from "quasar";
import {onBeforeMount, onMounted, ref} from "vue";
import {forms} from "src/config/theme/forms";

defineOptions({
  name: "EditorField",
});

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  options: {
    type: Object,
    default: () => {
    }
  },
  i18n: {
    type: Object,
    default: () => {
    }
  }
});

const emits = defineEmits(['update']);

const $q = useQuasar();
const editor = ref(null);
const imageUrl = ref(null);
const textEditor = ref('');
let imageDialog = ref(false);
let selectedImg = ref({
  name: '',
  type: '',
  size: 0,
  width: '',
  height: '',
  src: ''
})

const imgEditor = ref([]);
const rules = ref([]);
const fieldOptions = {...forms.text, ...props.options};
const fieldRules = {...rules.value, ...(props.options?.rules ?? [])};

// Methods
const saveWork = () => {
  $q.notify({
    message: $t('notifications.saveWork'),
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
  });
};

const defImg = (imageData) => {
  return {
    name: imageData?.file ? imageData.file.name : '',
    size: imageData?.file ? imageData.file.size : 0,
    type: imageData?.file ? imageData.file.type : '',
    width: imageData?.width ? imageData.width : '',
    height: imageData?.height ? imageData.height : '',
    src: imageData?.base64 ? imageData.base64 : '',
  }
};

const clearSelectedImg = () => {
  selectedImg.value = defImg()
}

const update = (txt) => {
  textEditor.value = txt;
  emits('update', textEditor.value);
};

const showImageDialog = () => {
  imageDialog.value = true;
};

const hideImageDialog = () => {
  imageDialog.value = false;
};

const handleSelectImage = (img) => {
  selectedImg.value = defImg()
  const imgData = defImg({...img, ...{width: `${img.width}px`, height: `${img.height}px`}});
  console.log({"insertImage": imgData})
  if (imgData && imgData.src) {
    selectedImg.value = {...imgData}
    console.log({handleSelectImage: img})
  }
}

const insertImage = (img) => {
  if (selectedImg && selectedImg.value.src) {
    hideImageDialog()
    const edit = editor;
    edit.value.caret.restore();
    edit.value.runCmd(
      "insertHTML",
      `<img width="${selectedImg.value.width ?? 100}px" height="${selectedImg.value.height}" src="${selectedImg.value.src}" alt="${selectedImg.value.name}" style="max-height: 300px; max-width: 500px;"/>`
    );
    edit.value.focus();
    clearSelectedImg()
  } else {
    imageUrl.value.focus();
  }
};

const clear = () => {
  textEditor.value = ''
  editor.value[0].resetValidation()
}

const validate = () => {
  editor.value[0].validate()
}


onBeforeMount(() => {
  props.modelValue && props.modelValue !== ''
    ? update(props.modelValue)
    : null
  // console.log(textEditor.value)
})

onMounted(() => {
  // console.log({modelValue: props.modelValue})
})

defineExpose({
  clearSelectedImg,
  clear,
  validate,
  text: textEditor.value,

})
</script>
