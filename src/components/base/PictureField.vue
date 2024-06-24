<template>
  <!-- INPUT -->

  <div class="full-width">
    <div v-if="model && pic" class="row q-pa-none flex flex-center">
      <div>
        <q-img
          v-if="!props.avatar"
          :src="pic"
          :style="`cursor: pointer;width:${props.Width}px;
            height:${props.Height}px; border-radius:15px`"
          fit="cover"
          round
          @click="hasAction = props.readonly ? false : true"
        />

        <q-avatar
          v-if="props.avatar"
          :size="`${props.Height}px`"
          font-size="52px"
          style="cursor: pointer"
          text-color="white"
          @click="hasAction = props.readonly ? false : true"
        >
          <q-img
            :src="pic"
            :style="`width:${props.Width}px; height:${props.Height}px;`"
            fit="cover"
          >
          </q-img>
        </q-avatar>

        <q-btn
          v-if="!props.readonly"
          :title="$t('labels.clearPicture')"
          class="q-ma-sm cursor-pointer absolute"
          color="negative"
          glossy
          icon="close"
          round
          size="xs"
          @click.stop.prevent="
            () => {
              model = null;
              pic = '';
              hasAction = false;
              emits('change', pic);
            }
          "
        ></q-btn>
      </div>
    </div>
    <div class="full-width q-my-lg q-py-sm q-px-md" v-if="!model">
      <q-file
        v-model="model"
        :borderless="props.styleForm?.includes('borderless')"
        :dense="props.styleForm?.includes('dense')"
        :filled="props.styleForm?.includes('filled')"
        :label="label ? label : 'Seleccione una imagen.'"
        :outlined="props.styleForm?.includes('outlined')"
        :rounded="props.styleForm?.includes('rounded')"
        :standout="props.styleForm?.includes('borderless')"
        :title="label ? label : 'Seleccione una imagen.'"
        accept="image/jpg, image/jpeg, image/png, image/gif"
        class="full-width"
        color="primary"
        @update:modelValue="selectFile"
      >
        <template v-if="!model" v-slot:prepend>
          <q-icon name="attachment" />
        </template>
        <template v-if="model" v-slot:append>
          <q-icon
            class="cursor-pointer"
            name="cancel"
            @click.stop.prevent="model = null"
          />
          <q-icon
            class="cursor-pointer"
            name="crop"
            @click.stop.prevent="refreshFile"
          />
        </template>
      </q-file>
    </div>
  </div>

  <!-- DIALOG CROPER -->

  <q-dialog
    class="cropperDialog"
    v-model="hasAction"
    persistent
    transition-hide="flip-up"
    transition-show="flip-down"
    full-width
  >
    <q-card class="no-scroll" style="border-radius: 15px">
      <q-bar style="background-color: rgba(174, 176, 181, 0.7)">
        <q-space />

        <q-btn
          dense
          class="q-mr-sm"
          glossy
          icon="crop_free"
          round
          size="sm"
          :title="$t('labels.clear')"
          @click="clear"
        />
        <q-btn
          dense
          class="q-mr-sm"
          glossy
          icon="redo"
          round
          size="sm"
          :title="$t('labels.reset')"
          @click="reset"
        />

        <q-btn
          dense
          class="q-mr-sm"
          glossy
          icon="rotate_right"
          round
          size="sm"
          :title="$t('labels.rotate')"
          @click="rotate"
        />
        <q-btn
          dense
          class="q-mr-sm"
          glossy
          icon="crop"
          round
          size="sm"
          :title="$t('labels.cut')"
          @click="getResult"
        />
        <q-space />
        <q-btn
          dense
          class="q-mr-sm"
          color="negative"
          glossy
          icon="delete"
          round
          size="sm"
          :title="$t('labels.clearPicture')"
          @click="
            () => {
              model = null;
              pic = '';
              hasAction = false;
              emits('change', pic);
            }
          "
        />
        <q-btn
          dense
          class="q-mr-sm"
          color="positive"
          glossy
          icon="save"
          round
          size="sm"
          :title="$t('labels.save')"
          @click="
            () => {
              if (cropper) cropper.clear();
              getResult();

              action = '';
              hasAction = false;
              isShowModal = false;
              emits('change', pic);
            }
          "
        />
        <q-space />

        <q-btn
          dense
          class="text-white bg-negative shadow-3"
          glossy
          icon="close"
          round
          size="sm"
          :title="$q.lang.label.close"
          v-close-popup
        />
      </q-bar>

      <q-card-section>
        <div class="row no-wrap full-width">
          <div
            :class="
              $q.screen.gt.xs ? 'col-8 justify-center' : 'col-12 justify-center'
            "
          >
            <VuePictureCropper
              :ref="vCropper"
              :boxStyle="{
                width: `100%`,
                height: `75%`,
                backgroundColor: '#f8f8f8',
                margin: '0  0 50px 0',
              }"
              :img="pic"
              :options="{
                viewMode: 2,
                dragMode: 'crop',
                aspectRatio: radio1 / radio2,
              }"
              @cropend="
                () => {
                  ready();
                } //getResult();
              "
              @ready="
                () => {
                  ready();
                }
              "
            />
          </div>

          <div v-if="$q.screen.gt.xs" class="col-4 on-right">
            <div class="row full-width q-gutter-y-sm">
              <div class="col-12 flex flex-center">
                <q-avatar
                  v-if="props.avatar"
                  font-size="52px"
                  size="48px"
                  style="cursor: pointer"
                  text-color="white"
                >
                  <q-img
                    :src="pic"
                    class="preview rounded-borders"
                    style="max-width: 48px"
                  />
                </q-avatar>
                <q-img
                  v-if="!props.avatar"
                  :src="pic"
                  class="preview rounded-borders"
                  style="max-width: 48px"
                />
              </div>
              <div class="col-12 flex flex-center">
                <q-avatar
                  v-if="props.avatar"
                  font-size="52px"
                  size="96px"
                  style="cursor: pointer"
                  text-color="white"
                >
                  <q-img
                    :src="pic"
                    class="preview rounded-borders"
                    style="max-width: 96px"
                  />
                </q-avatar>
                <q-img
                  v-if="!props.avatar"
                  :src="pic"
                  class="preview rounded-borders"
                  style="max-width: 96px"
                />
              </div>
              <div class="col-12 flex flex-center">
                <q-avatar
                  v-if="props.avatar"
                  font-size="52px"
                  size="160px"
                  style="cursor: pointer"
                  text-color="white"
                >
                  <q-img
                    :src="pic"
                    class="preview rounded-borders"
                    style="max-width: 160px"
                  />
                </q-avatar>
                <q-img
                  v-if="!props.avatar"
                  :src="pic"
                  class="preview rounded-borders"
                  style="max-width: 160px"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section></q-card-section>
      <!-- <q-card-actions class="bottom" align="right">
          <q-btn flat label="Confirmar" color="positive" v-close-popup />

          <q-btn flat label="Cancelar" color="negative" v-close-popup />
        </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { $t } from "src/services/i18n";
import { reactive, ref, watch } from "vue";

import VuePictureCropper, { cropper } from "vue-picture-cropper";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps({
  avatar: {
    type: Boolean,
    default: false,
  },
  pic: { default: "" },
  Width: { type: Number, default: 128 },
  Height: { type: Number, default: 128 },
  radio1: { type: Number, default: 1 },
  radio2: { type: Number, default: 1 },
  label: { type: String, default: $t("labels.selectPicture") },
  styleForm: { type: String, default: "borderless" },
  readonly: { type: Boolean, default: false },
});

const emits = defineEmits(["change"]);

// function updatePicture(newPicVal: string) {
//   pic.value = newPicVal;

//   emits('update:Picture');
//   console.log('update:Picture');
// }
//console.log(props.avatar);

const action = ref("");
const hasAction = ref(false);
const vCropper = ref();
const isShowModal = ref(false);
const uploadInput = ref(null);
const pic = props.pic !== undefined ? ref(props.pic) : ref("");
const imagen = ref();
const openCropFile = ref();
const startpic = ref("");

const cropVal = ref("");

let picHistory = [];
const model =
  props.pic && props.pic !== "/default/profile.svg" ? ref([]) : ref(null);
const result = reactive({
  dataURL: "",
  blobURL: "",
});

/**
 * Select the picture to be cropped
 */

function selectFile() {
  // Reset last selection and results
  //pic.value = '';
  pic.value = "";
  picHistory = [];
  result.dataURL = "";
  result.blobURL = "";
  // Get selected files
  const file = model?.value;

  if (!file) return;
  // console.log(data);
  // Convert to dataURL and pass to the cropper component
  //console.log(file);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    hasAction.value = true;
    // Update the picture source of the `img` prop
    pic.value = String(reader.result);
    imagen.value = file;
    startpic.value = String(reader.result);
    // Show the modal
    isShowModal.value = true;
    // Clear selected files of input element
    if (!uploadInput.value) return;
    uploadInput.value.value = "";
  };
}

function refreshFile() {
  // Reset last selection and results

  // Get selected files
  const data = model?.value;

  if (!data) return;
  //console.log(data);
  // Convert to dataURL and pass to the cropper component
  //const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(data);
  reader.onload = () => {
    hasAction.value = true;
    // Update the picture source of the `img` prop
    pic.value = String(reader.result);
    //updatePicture(String(reader.result));

    // Show the modal
    isShowModal.value = true;

    // Clear selected files of input element
    if (!uploadInput.value) return;
    uploadInput.value.value = "";
    emits("change", pic.value);
  };
}

/**
 * Get cropping results
 */

async function getResult() {
  if (!cropper) return;
  const base64 = await cropper.getDataURL();
  const blob = await cropper.getBlob();
  if (!blob) return;
  let file = null;

  if (cropper) file = await cropper.getFile();

  result.dataURL = base64;
  result.blobURL = URL.createObjectURL(blob);
  isShowModal.value = false;
  pic.value = result.dataURL;

  imagen.value = file;

  emits("change", pic.value);
}

async function Crop() {
  if (!cropper) return;
  const base64 = cropper.getDataURL();
  const blob = await cropper.getBlob();
  if (!blob) return;

  const file = await cropper.getFile();

  result.dataURL = base64;
  result.blobURL = URL.createObjectURL(blob);
  isShowModal.value = false;
  pic.value = result.dataURL;
  imagen.value = file;
  emits("change", pic.value);
}

/**
 * Clear the crop box
 */
function clear() {
  if (!cropper) return;
  cropper.clear();
}

/**
 * Reset the default cropping area
 */
function reset() {
  if (!cropper) return;
  cropper.reset();
}

function undo() {
  if (!cropper && picHistory.length === 0) return;
  pic.value = picHistory[-1];
  picHistory = picHistory.slice(0, picHistory.length - 1);
  //getResult();
  result.dataURL = pic.value;
  // emits("change", pic.value);

  getResult();
}

function componentReset() {
  if (!cropper) return;
  pic.value = "";
  imagen.value = {};
  picHistory = [];
  result.dataURL = "";
  result.blobURL = "";
  model.value = null;
  emits("change", pic.value);
}

function rotate() {
  if (!cropper) return;
  cropper.rotate(90);
}

/**
 * The ready event passed to Cropper.js
 */
async function ready() {
  if (!cropper) return;
  //console.log('Cropper is ready.');
}
</script>

<style lang="scss" scoped></style>
