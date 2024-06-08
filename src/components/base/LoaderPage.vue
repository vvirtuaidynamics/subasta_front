<template>
  <transition
    :enter-active-class="`animated ${inAnimation}`"
    :leave-active-class="`animated ${outAnimation}`"
    appear
  >
    <div
      v-if="rProps.show"
      id="loadingPage"
      class="full-height full-width absolute absolute-full"
    >
      <div :class="dark ? 'bg-dark' : 'bg-white'" class="loadingContent">
        <div class="flex flex-center full-height full-width">
          <div
            :class="props.dark ? 'bg-dark text-warning' : 'bg-light text-dark'"
            class="q-px-xl q-py-md justify-center"
            style="border-radius: 15px 15px 15px 15px"
          >
            <div
              class="row justify-center items-center full-width"
              style="height: 155px"
            >
              <q-spinner-puff
                :style="`top:${$q.screen.height / 2 - 65}px; left:${
                  $q.screen.width / 2 - 26
                }px`"
                size="48px" color="warning"
                style="position: absolute; z-index: 1001"
              />
              <q-img :src="rProps.logo" fit="scale-down" height="180px" />
            </div>
            <div class="row full-width vertical-middle flex-center  ">
              <div
                class="text-h5  text-uppercase q-gutter q-gutter-x-xs"
              >

              </div>
              <div class="text-weight-medium text-uppercase">
                <q-spinner-dots size="16px" />
                {{ $t("labels.loading") }}
                <q-spinner-dots size="16px" />
              </div>
            </div>
            <div class="row full-width text-body2 flex-center">
              <div>
                {{ rProps.caption }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { QSpinnerPuff, QSpinnerDots } from "quasar";
import { reactive, ref } from "vue";
import images from "src/config/theme/images";
import {$t} from "src/services/i18n";


const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  caption: {
    type: String,
    default: "",
  },
  logo: {
    type: String,
    default: images.appLogo,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  inAnimation: {
    type: String,
    default: "slideInDown",
  },
  outAnimation: {
    type: String,
    default: "slideOutDown",
  },
});
const rProps = reactive(props);
const dark = ref(props.dark ?? $q.dark.isActive);
let position = ref({});

</script>

<style lang="scss">
#loadingPage {
  .loadingContent {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10000;
  }
}
</style>
