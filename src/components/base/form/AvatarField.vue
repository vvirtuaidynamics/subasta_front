<script setup>
import VuePictureCropper, {cropper} from 'vue-picture-cropper'
import {onBeforeMount, onMounted, reactive, ref, watch} from "vue";
import {$t} from "src/services/i18n";
import {uid} from 'quasar'
import axios from 'axios'

defineOptions({
  name: 'AvatarField'
})

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  name: {
    type: String,
    default: `avatar_${uid().split('-')[0]}`,
  },
  square: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    required: false,
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  classAvatar: {
    type: String,
    default: 'bg-grey-5'
  },
  styleAvatar: {
    type: String,
    default: 'border: solid 2px #eee'
  },
  size: {
    type: Number,
    default: 150
  },
  editable: {
    type: Boolean,
    default: false
  },
  display: {type: String, default: 'row'}, //row || col
  default_image: {
    type: String,
    //default: 'icon:fas fa-user-tie'
    default: 'img:/images/avatar.png' //img:  || icon: icon_name
  }
})
const isShowModal = ref(false)
const isMaximizedModal = ref(false)
const isMounted = ref(false)
const default_avatar = reactive({
  key: props.default_image.split(':')[0],
  value: props.default_image.split(':')[1]
})

const filePicker = ref(null)
const fileOriginal = ref(null)
const result = reactive({
  dataURL: '',
  blobURL: '',
  file: null,
})

const $emits = defineEmits(['update'])

function filePickerClick() {
  if (!result.dataURL || result.dataURL === '') filePicker.value.pickFiles();
  else selectFile()
}

function filePickerClear() {
  fileOriginal.value = null
  result.file = null
  result.blobURL = ''
  result.dataURL = ''

}


function clear() {
  if (!cropper) return
  cropper.clear()
}

function reset() {
  if (!cropper) return
  cropper.reset()
  result.file = fileOriginal
  selectFile()
}


async function fetchImage() {
  let getFile = null
  if (props.modelValue) {
    try {
      const response = await axios.get(props.modelValue, {
        responseType: 'blob',
      })
      const blob = response.data;
      getFile = new File([blob], props.name, {type: blob.type})
      result.file = getFile
    } catch (e) {
      if (process.env.NODE_ENV !== 'production')
        console.log('fetchImage error: ', e)
    }

  }
}

function rotate(pos = false) {
  if (!cropper) return;
  if (!pos)
    cropper.rotate(90);
  else
    cropper.rotate(-90);
}

/**
 * The ready event passed to Cropper.js
 */
function ready() {
  if (process.env.NODE_ENV !== 'production')
    console.log('Cropper is ready.')
}

function handleClose() {
  if (process.env.NODE_ENV !== 'production')
    console.log('Dialog close.')
}

function handleClick() {
  if (!result.dataURL || result.dataURL === '') filePickerClick()
  else selectFile()
}

function loadFile() {
  result.dataURL = ''
  result.blobURL = ''
  if (!result.file) return
  const reader = new FileReader()
  reader.readAsDataURL(result.file)
  reader.onload = () => {
    result.dataURL = String(reader.result)
  }

}

function selectFile() {
  result.dataURL = ''
  result.blobURL = ''
  if (!result.file) return
  const reader = new FileReader()
  reader.readAsDataURL(result.file)
  reader.onload = () => {
    result.dataURL = String(reader.result)
    isShowModal.value = true
  }

}

async function getResult() {
  if (!cropper) return
  const base64 = cropper.getDataURL()
  const blob = await cropper.getBlob()
  if (!blob) return
  const cropFile = await cropper.getFile(
    {
      fileName: props.name,
    }
  )
  if (process.env.NODE_ENV !== 'production')
    console.log({base64, blob, file: cropFile})
  result.dataURL = base64
  result.file = cropFile
  result.blobURL = URL.createObjectURL(blob)
  $emits('update', {base64, blob, file: result.file});
  isShowModal.value = false
}

watch(() => result.file, (newValue, oldValue) => {
  if (newValue) loadFile();
  if (!fileOriginal.value) fileOriginal.value = newValue
  if (process.env.NODE_ENV !== 'production')
    console.log('file: ', {newValue});
})

onBeforeMount(async () => {
  if (props.modelValue) {
    result.dataURL = await fetchImage()
  }

})
onMounted(async () => {
  if (process.env.NODE_ENV !== 'production')
    console.log('AvatarField Mounted!');

})
</script>

<template>

  <div :class="`${props.display}`">
    <q-file id="filePicker" ref="filePicker" class="hidden" v-model="result.file" :accept="props.accept"></q-file>
    <q-avatar :square="props.square" :size="`${props.size}px`" :class="props.classAvatar"
              :style="`${props.square? 'border-radius: 15px': ''};`">
      <q-icon v-if="default_avatar.key==='icon' && (!result.dataURL || result.dataURL ==='' )"
              :name="default_avatar.value" :size="`${size-60}px`"/>
      <q-img fit="cover" v-if="default_avatar.key==='img' && (!result.dataURL || result.dataURL ==='')"
             :src="result.dataURL && result.dataURL !=='' ? result.dataURL :  default_avatar.value"

      />
      <q-img fit="cover" v-if="(result.dataURL && result.dataURL !=='')"
             :src=" result.dataURL"

      />
      <div class="absolute" style="right: -20px; top: calc( 25%  ) "
           v-if="result.file && props.editable && !isShowModal">
        <q-btn flat :rounded="props.size > 140" :round="props.size <= 140" icon="fas fa-trash"
               class="text-negative bg-grey-5 shadow-2 z-max"
               style="border: 1px solid #eee"
               size="xs"
               @click="filePickerClear()">
          <q-tooltip class="bg-warning text-negative text-caption"
                     anchor="center right" self="center left" :offset="[10, 10]">
            <q-icon name="fas fa-trash" size="13px"/>
            {{ $t("labels.dropPicture") + '!' }}
          </q-tooltip>
        </q-btn>
      </div>
      <div class="absolute" style="right: -20px; top: calc( 25% + 30px  )" v-if="props.editable && !isShowModal">
        <q-btn flat :rounded="props.size > 140" :round="props.size <= 140" icon="fas fa-edit"
               class="text-positive bg-grey-5 shadow-2 z-max" style="border: 1px solid #eee"
               size="xs" @click="filePickerClick">
          <q-tooltip class="bg-warning text-white text-caption"
                     anchor="center right" self="center left" :offset="[10, 10]">
            <q-icon name="fas fa-edit" size="13px"/>
            {{ $t("labels.selectPicture") }}
          </q-tooltip>
        </q-btn>
      </div>
    </q-avatar>

    <q-dialog
      v-model="isShowModal"
      :maximized="isMaximizedModal"
      persistent
      class="dialog"
      full-height
      full-width
      style="background-color: #1d1d1d99; border: none"
      @hide="handleClose()"
    >
      <q-card
        class="full-width no-margin no-padding"
        style="border-radius: 15px 15px 15px 15px; border: none"
      >
        <q-bar class="">
          <q-icon name="fas fa-edit" size="sm"/>
          <span class="q-ml-xs text-body1 text-uppercase">{{
              $t("avatarEditorModalTitle")
            }}</span>
          <q-space/>
          <div class="q-gutter q-gutter-x-xs">
            <q-btn
              :class="
                !isMaximizedModal
                  ? 'bg-indigo-8 text-white'
                  : 'bg-green-8 text-negative'
              "
              :icon="
                !isMaximizedModal
                  ? 'mdi-window-maximize'
                  : 'mdi-window-restore'
              "
              dense
              round
              size="xs"
              @click="isMaximizedModal = !isMaximizedModal"
            >
              <q-tooltip
              >{{
                  !isMaximizedModal
                    ? $t("labels.maximizeWindow")
                    : $t("labels.restoreWindow")
                }}
              </q-tooltip>
            </q-btn>
            <q-btn
              v-close-popup
              class="bg-negative text-white"
              dense
              icon="close"
              round
              size="xs"
            >
              <q-tooltip>{{ $t("labels.close") }}</q-tooltip>
            </q-btn>
          </div>
        </q-bar>
        <q-bar class="">
          <q-space/>
          <div class="q-gutter q-gutter-x-sm">
            <q-btn
              :label="$t('labels.reset')"
              dense
              icon="fas fa-redo"
              size="sm"
              @click="reset()"
            >

              <q-tooltip class="bg-warning text-white">
                <q-icon name="fas fa-redo" size="xs"/>
                {{ $t("labels.reset") }}
              </q-tooltip>
            </q-btn>
            <q-btn
              :label="$t('labels.rotateLeft')"
              dense
              icon="mdi-file-rotate-left"
              size="sm"
              @click="rotate()"
            >

              <q-tooltip class="bg-warning text-white">
                <q-icon name="mdi-file-rotate-left" size="xs"/>
                {{ $t("labels.rotateLeft") }}
              </q-tooltip>
            </q-btn>
            <q-btn
              :label="$t('labels.rotateRight')"
              dense
              icon="mdi-file-rotate-right"
              size="sm"
              @click="rotate(true)"
            >

              <q-tooltip class="bg-warning text-white">
                <q-icon name="mdi-file-rotate-right" size="xs"/>
                {{ $t("labels.rotateRight") }}
              </q-tooltip>
            </q-btn>
            <q-btn
              :label="$t('labels.crop')"
              dense
              icon="fas fa-crop"
              size="sm"
              @click="getResult()"
            >
              <q-tooltip class="bg-warning text-white">
                <q-icon name="fas fa-crop" size="xs"/>
                {{ $t("labels.crop") }}
              </q-tooltip>
            </q-btn>
            <q-btn
              :label="$t('labels.save')"
              dense
              push
              class="text-positive"
              icon="fas fa-save"
              size="sm"
              @click="()=>isShowModal=false"
            >
              <q-tooltip class="bg-warning text-white">
                <q-icon name="fas fa-save" size="xs"/>
                {{ $t("labels.save") }}
              </q-tooltip>
            </q-btn>


          </div>
          <q-space/>

        </q-bar>

        <q-card-section class="q-pa-xs">
          <q-scroll-area
            :style="`${
              !isMaximizedModal
                ? 'height: calc(100vh - 124px);'
                : 'height: calc(100vh - 74px);'
            }`"
          >
            <div class="flex flex-center q-pa-none q-ma-none">

              <VuePictureCropper v-if="result.file"
                                 :boxStyle="{
                    width: 'calc( 100% - 100)',
                    height: '100%',
                    borderRadius: '15px',
                    backgroundColor: '#f8f8f8',
                    margin: '0px',
                  }"
                                 :img="result.dataURL"
                                 :options="{
                    viewMode: 2,
                    dragMode: 'crop',
                    aspectRatio: 1/1 ,
                  }"
                                 @ready="ready"
              />
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

</template>

<style scoped lang="scss">

</style>
