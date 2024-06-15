<template>
  <q-page>
    <div id="Home">
      <q-header :class="'header'">
        <q-bar
          id="header-bar"
          class="faa-parent animated-hover absolute-top"
          dense
          style="height: 50px"
        >
          <div class="row login-header">
            <q-btn
              flat
              @click="navigateTo({ path: '/' })"
              :title="$t('homeTip')"
            >
              <img :src="images.appLogo" alt="SUBASTA" />

              <div class="text-h6 text-uppercase">
                {{ appConfig.name }}
              </div>
              <q-tooltip
                :model-value="menuTip"
                :offset="[25, 10]"
                class="bg-amber text-black shadow-4 text-uppercase text-subtitle1 z-max"
                self="center left"
                anchor="center right"
              >
                <q-icon name="mdi-arrow-left-bold-outline" size="sm" />
                {{ $t("labels.options") }}
              </q-tooltip>

              <q-menu
                class="z-max"
                style="border-radius: 15px"
                transition-hide="jump-up"
                transition-show="jump-down"
                :offset="[0, 10]"
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
                    <q-item-section class="text-body1 text-uppercase"
                      >{{ $t("login") }}
                    </q-item-section>
                  </q-item>

                  <q-item clickable @click="navigateTo({ name: 'register' })">
                    <q-item-section avatar>
                      <q-icon name="mdi-account-arrow-up-outline" size="md" />
                    </q-item-section>
                    <q-item-section class="text-body1 text-uppercase"
                      >{{ $t("register") }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

          <q-space />
          <div class="row login-header-right">
            <LangSwitcher class="z-max q-ml-sm" />
            <DarkSwitcher
              class="z-max"
              size="md"
              colorDark="blue-6"
              colorLight="yellow-6"
              :model-value="$q.dark.isActive"
              @update="(val) => $q.dark.set(val)"
            />
          </div>
        </q-bar>
      </q-header>

      <q-card class="transparent">
        <q-carousel
          v-if="true"
          v-model="currentSlide"
          :style="`height:${$q.screen.height}px; background: transparent`"
          autoplay
          control-text-color="grey-1"
          control-type="unelevated"
          animated
          infinite
          navigation
          navigation-active-icon="check_circle"
          navigation-icon="circle"
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
        class="text-justify vertical-middle flex flex-center q-gutter q-gutter-sm q-gutter-y-md justify-around full-width q-px-sm"
      >
        <div
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
          :key="i"
          :style="
            !$q.screen.gt.xs
              ? `width: 100%`
              : `max-width:   ${parseInt(($q.screen.width - 70) / 3)}px`
          "
          class="justify-center items-center"
        >
          <q-card
            :class="$q.screen.gt.xs ? 'column' : 'row'"
            bordered
            class="services-card shadow-3"
          >
            <q-img
              :style="
                $q.screen.gt.xs
                  ? 'border-radius: 20px 20px 0px 0px'
                  : 'border-radius: 20px 0px 0px 20px'
              "
              class="col"
              fit="cover"
              src="/images/backgrounds/default.jpeg"
            />

            <q-card-section class="col">
              {{ lorem }}{{ lorem }}{{ lorem }}
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="q-pa-md text-justify font-poppins">
        <p v-for="n in 5" :key="n" class="text-size-16">
          {{ lorem }} {{ lorem }} {{ lorem }}
        </p>
      </div>

      <q-card class="q-mt-sm row page-footer bg-dark">
        <q-card-section class="col-12 row text-center q-pa-xs">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-12 q-gutter-sm">
            <q-img
              src="images/default.png"
              fit="scale-down"
              style="height: 48px; width: 96px"
            />
            <q-btn
              color="white"
              dense
              flat
              icon="email"
              round
              disabled
              :label="appConfig.email"
            ></q-btn>
            <q-btn
              color="white"
              dense
              flat
              disabled
              icon="phone"
              :label="appConfig.phone"
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
        <q-btn class="shadow-3" color="dark" icon="keyboard_arrow_up" round />
      </q-page-scroller>
    </div>
    <q-scroll-observer
      @scroll="scrollObserver"
      :debounce="100"
      axis="vertical"
    />
  </q-page>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted, watch, computed } from "vue";
import { $t } from "src/services/i18n";
import { useApp } from "src/composables/useApp";
import DarkSwitcher from "src/components/base/DarkSwitcher.vue";
import LangSwitcher from "src/components/base/LangSwitcher.vue";
import { useQuasar } from "quasar";
import { homeCarouselData } from "src/config/homeCarouselData";
import appConfig from "src/config/app.js";
import images from "src/config/theme/images";

const $q = useQuasar();
const $app = useApp();

const year = new Date().getFullYear();
const currentSlide = ref(0);
const slider = ref();
const { navigateTo } = $app;
const carouselItems = ref();

const scrollRef = ref();
const isTop = ref(true);

const scrollObserver = ({ direction, position }) => {
  if (position.top === 0) {
    isTop.value = true;
    showHide();
  } else {
    isTop.value = false;
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
  setTimeout(() => (menuTip.value = !menuTip.value), 1000);
  setTimeout(() => (menuTip.value = !menuTip.value), 5000);
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
  showHide();
});
</script>

<style lang="scss" scoped>
#Home {
  width: 100%;
  .q-header,
  .q-footer {
    z-index: 10;
  }

  .header {
    background-color: #0000001a;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  .custom-caption {
    height: calc(100vh * 0.3);
    text-align: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
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

  .logo-header-title {
    max-width: 250px;
  }
}
</style>
