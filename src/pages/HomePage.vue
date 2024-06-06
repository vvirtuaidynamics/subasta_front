<template>
  <q-page>
    <div id="Inicio">
      <q-header :class="'header'">
        <q-bar class="faa-parent animated-hover" dense style="height: 50px">
          <img
            src="/images/default.png"
            alt="LOGO"
            class="absolute-top-left q-ma-xs z-max"
            fit="scale-down"
            style="height: 48px; width: auto"
          />
          <q-space />
          <q-btn
            class="no-padding no-margin faa-ring faa-slow"
            flat
            round
            size="lg"
          >
            <q-icon
              class="no-padding"
              color="warning"
              name="mdi-menu"
              size="md"
            />

            <q-tooltip
              :model-value="menuTip"
              :offset="[10, 10]"
              class="bg-amber text-black shadow-4 text-uppercase text-subtitle1 z-max"
              self="center right"
              anchor="center left"
            >
              {{ $t("labels.options") }}
              <q-icon name="mdi-arrow-right-bold-outline" size="sm" />
            </q-tooltip>
            <q-menu
              class="z-max"
              style="border-radius: 15px"
              transition-hide="jump-up"
              transition-show="jump-down"
            >
              <q-list
                class="text-black text-caption text-uppercase"
                style="min-width: 180px"
              >
                <q-item
                  v-if="!false"
                  clickable
                  @click="navigateTo({ name: 'login' })"
                >
                  <q-item-section avatar>
                    <q-icon name="mdi-login" size="md" />
                  </q-item-section>
                  <q-item-section class="text-body1"
                    >{{ $t("login").toUpperCase() }}
                  </q-item-section>
                </q-item>

                <q-item clickable @click="navigateTo({ name: 'register' })">
                  <q-item-section avatar>
                    <q-icon name="mdi-account-arrow-up-outline" size="md" />
                  </q-item-section>
                  <q-item-section class="text-body1"
                    >{{ $t("register").toUpperCase() }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <!-- <q-separator vertical /> -->
          <!-- <LangSwitcher class="z-max" /> -->
        </q-bar>
      </q-header>

      <q-card class="transparent">
        <q-carousel
          v-if="true"
          v-model="currentSlide"
          :style="`height:${$q.screen.height - 50}px; background: transparent`"
          autoplay
          control-text-color="warning"
          control-type="unelevated"
          infinite
          navigation
          navigation-active-icon="mdi-truck-check-outline"
          navigation-icon="mdi-truck-outline"
          navigation-position="bottom"
          swipeable
          transition-next="fade"
          transition-prev="fade"
        >
          <q-carousel-slide
            v-for="slide in carouselItems"
            :key="slide.id"
            :img-src="slide.src"
            :name="slide.id"
            class="full-width"
          >
            <div class="absolute-bottom custom-caption">
              <div class="text-h3">{{ slide.title }}</div>
              <div class="text-subtitle1 fit-text">{{ slide.caption }}</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
      <q-separator class="q-my-sm transparent" />

      <div
        class="text-justify vertical-middle flex flex-center q-gutter q-gutter-md justify-around full-width"
      >
        <div
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :key="i"
          :style="
            !$q.screen.gt.sm
              ? `width: 100%`
              : `max-width:   ${parseInt(($q.screen.width - 50) / 3)}px`
          "
          class="justify-center items-center"
        >
          <q-card
            :class="$q.screen.gt.sm ? 'column' : 'row'"
            bordered
            class="services-card shadow-3"
          >
            <q-img
              :style="
                $q.screen.gt.sm
                  ? 'border-radius: 20px 20px 0px 0px'
                  : 'border-radius: 20px 0px 0px 20px'
              "
              class="col"
              fit="cover"
              src="/images/backgrounds/default.jpeg"
            />

            <q-card-section class="col">
              {{ lorem }}
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-pa-md text-justify font-poppins">
        <p v-for="n in 5" :key="n" class="text-size-16">
          {{ lorem }}
        </p>
      </div>

      <q-card class="q-mt-sm row page-footer bg-secondary">
        <q-card-section class="col-12 row text-center q-pa-xs">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-12 q-gutter-sm">
            <q-img
              src="images/default.png"
              fit="scale-down"
              style="height: 48px; width: 96px"
            />
            <q-btn
              color="warning"
              dense
              flat
              icon="fab fa-github"
              round
            ></q-btn>
            <q-btn
              color="warning"
              dense
              flat
              icon="fab fa-facebook"
              round
            ></q-btn>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-6 col-lg-12 text-caption q-mt-sm text-white"
          >
            {{ $q.screen.gt.sm ? $t("copyright") : "Copyright " }} &copy;
            {{ year }}
          </div>
        </q-card-section>
      </q-card>
      <q-page-scroller
        :offset="[18, 48]"
        :scroll-offset="$q.screen.height * 0.8"
        position="bottom-right"
      >
        <q-btn
          class="shadow-3"
          color="secondary"
          icon="keyboard_arrow_up"
          round
        />
      </q-page-scroller>
    </div>
    <q-scroll-observer @scroll="(v) => scrollObserver(v)" />
  </q-page>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted, watch, computed } from "vue";
import { $t } from "src/services/i18n";
import { useApp } from "src/composables/useApp";
import DarkSwitcher from "components/base/DarkSwitcher.vue";
import { useQuasar } from "quasar";
import { homeCarouselData } from "src/config/homeCarouselData";

const $q = useQuasar();
const $app = useApp();

const year = new Date().getFullYear();
const currentSlide = ref(0);
const slider = ref();
const { navigateTo } = $app;
const carouselItems = ref();

const scrollTo = ref({ direction: "", top: 0, left: 0 });

const isTop = computed(() => scrollTo.value.top === 0);

const scrollObserver = ({ direction, position }) => {
  if (position.top === 0) {
    console.log("top of screen", scrollTo.value);
    scrollTo.value.direction = direction;
    scrollTo.value.top = position.top;
  }
  if (position.top === $q.screen.height) {
    console.log("1 screen height", scrollTo.value);
    scrollTo.value.direction = direction;
    scrollTo.value.top = position.top;
  }

  // console.log({ direction, position });
};
const menuTip = ref(false);

const showHide = () => {
  setTimeout(() => (menuTip.value = true), 1000);
  setTimeout(() => (menuTip.value = false), 4000);
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...";

const getCarouselItems = () => {
  if (!homeCarouselData.length) return [];
  const Items = [];
  homeCarouselData.forEach((slide) => {
    let item = {};
    item.id = slide.id;
    item.title = slide.title;
    item.caption = slide.caption;
    item.src = slide.src;
    Items.push(item);
  });
  return Items;
};

onBeforeMount(() => {
  carouselItems.value = getCarouselItems();
});

onMounted(() => {
  // console.log("carousel: ", carouselItems.value);
});
</script>

<style lang="scss" scoped>
#Inicio {
  width: 100%;

  .q-header,
  .q-footer {
    z-index: 2000;
  }

  .header {
    background-color: #0000001a;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  background-image: linear-gradient(
    180deg,
    $secondary,
    rgb(45, 206, 204)
  ) !important;

  .custom-caption {
    height: calc(100vh * 0.3);
    text-align: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .page-footer {
    background-color: #1976d29f;
  }

  .services-card {
    border-radius: 20px;
    word-wrap: break-word;
    overflow: hidden;
    //max-height: 250px;
  }

  .fit-text {
    padding: 10px;
    word-wrap: break-word;
    overflow: hidden;
  }
}
</style>
