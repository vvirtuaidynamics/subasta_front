<script setup>
import VuePictureCropper, {cropper} from 'vue-picture-cropper'
import {onBeforeMount, reactive, ref, watch} from "vue";
import {$t} from "src/services/i18n";
import LoaderPage from "components/base/LoaderPage.vue";

defineOptions({
  name: 'AvatarField'
})

const props = defineProps({
  name: {
    type: String,
    default: 'avatar',
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
    default: '.jpg, .jpeg, image/*'
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
    default: 120
  },
  editable: {
    type: Boolean,
    default: true
  },
  default_image: {
    type: String,
    default: '/images/avatar.png'
  }

})
const isShowModal = ref(true)
const isMaximizedModal = ref(true)
const loading = ref(true)
const file = ref(null);
const filePicker = ref(null)

const hotPicture = ref('');
const result = reactive({
  dataURL: '',
  blobURL: '',
})


function filePickerClick() {
  filePicker.value.pickFiles();
}

function filePickerClear() {
  file.value = null;
}

function selectFile() {
  // Reset last selection and results
  hotPicture.value = ''
  result.dataURL = ''
  result.blobURL = ''

  // Get selected files
  if (!file.value) return

  // Convert to dataURL and pass to the cropper component

  const reader = new FileReader()
  reader.readAsDataURL(file.value)
  reader.onload = () => {
    // Update the picture source of the `img` prop
    hotPicture.value = String(reader.result)

    // Show the modal
    isShowModal.value = true

    // Clear selected files of input element
    // if (!uploadInput.value) return
    // uploadInput.value.value = ''
  }
}

/**
 * Clear the crop box
 */
function clear() {
  if (!cropper) return
  cropper.clear()
}

/**
 * Reset the default cropping area
 */
function reset() {
  if (!cropper) return
  cropper.reset()
}

/**
 * The ready event passed to Cropper.js
 */
function ready() {
  console.log('Cropper is ready.')
}

function handleClose() {
  console.log('Dialog close.')
}

/**
 * Get cropping results
 */
async function getResult() {
  if (!cropper) return
  const base64 = cropper.getDataURL()
  const blob = await cropper.getBlob()
  if (!blob) return
  const file = await cropper.getFile(
    {
      fileName: 'avatar',
    }
  )

  console.log({base64, blob, file})
  result.dataURL = base64
  result.blobURL = URL.createObjectURL(blob)
  isShowModal.value = false
}

watch(() => hotPicture.value, (newValue, oldValue) => {
  console.log('hotPicture: ', newValue);
})

watch(() => file.value, (newValue, oldValue) => {
  if (newValue) selectFile();
  console.log('file: ', {newValue, hotPicture});
})

onBeforeMount(() => {
//  filePicker.value = `${props.name}`
})
</script>

<template>
  <div class="row">
    <q-file id="filePicker" ref="filePicker" class="hidden" v-model="file" :accept="props.accept"></q-file>
    <q-avatar :square="props.square" class="avatar-img" :size="`${props.size}px`" :class="props.classAvatar"
              :style="`${props.square? 'border-radius: 15px': ''}`">

      <q-img fit="cover" style="max-width: 90%"
             :src="hotPicture.value && hotPicture.value !=='' ? hotPicture.value :  props.default_image"></q-img>
      <div class="absolute" style="right: -20px; top: calc( 25%  ) " v-if="file && props.editable">
        <q-btn flat :rounded="props.size > 100" :round="props.size <= 100" icon="fas fa-trash"
               class="text-negative bg-grey-5 shadow-2"
               style="border: 1px solid #eee"
               size="xs"
               @click="filePickerClear"></q-btn>

      </div>
      <div class="absolute" style="right: -20px; top: calc( 25% + 30px  )" v-if="props.editable">
        <q-btn flat :rounded="props.size > 100" :round="props.size <= 100" icon="fas fa-edit"
               class="text-positive bg-grey-5 shadow-2" style="border: 1px solid #eee"
               size="xs" @click="filePickerClick"></q-btn>

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
          <span class="q-ml-xs text-body1 text-bold text-uppercase">{{
              $t("avatarEditorModalTitle")
            }}</span>
          <q-space/>
          <div class="q-gutter q-gutter-x-xs">
            <q-btn
              :class="
                !isMaximizedModal
                  ? 'bg-indigo-8 text-white'
                  : 'bg-teal-8 text-negative'
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
          <div class="q-gutter q-gutter-x-xs">
            <q-btn
              class="bg-negative text-white"
              dense
              icon="fas fa-crop"
              size="xs"
              @click="getResult()"
            >
              <q-tooltip>{{ $t("labels.close") }}</q-tooltip>
            </q-btn>

          </div>
          <q-space/>

        </q-bar>

        <q-card-section class="q-pa-none">
          <q-scroll-area
            :style="`${
              !isMaximizedModal
                ? 'height: calc(100vh - 90px)'
                : 'height: calc(100vh - 43px)'
            }`"
          >
            <div class="full-width q-pa-none q-ma-none">
              <slot v-if="!loading">
                <q-inner-loading></q-inner-loading>
              </slot>
              <VuePictureCropper v-if="file"
                                 :boxStyle="{
                    width: '100%',
                    height: '100%',
                    maxHeight: '100%',
                    backgroundColor: '#f8f8f8',
                    margin: 'auto',
                  }"
                                 :img="hotPicture"
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
