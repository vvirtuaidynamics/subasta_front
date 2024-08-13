<template>
  <q-carousel
    v-if="typeof files === 'object' && Array.isArray(files) && files.length > 1"
    :autoplay="props.autoplay"
    swipeable
    animated
    v-model="slide"
    infinite
    :fullscreen="fullscreen"
    :navigation="fullscreen"
    class=""
    :class="fullscreen ? `image-viewer ${props.class}` : `${props.class}`"
    transition-prev="scale"
    transition-next="scale"
    style="display: block"
    :style="
      !fullscreen
        ? `max-height: ${props.height}px;max-width: ${props.width}px;`
        : ''
    "
  >
    <q-carousel-slide
      class="column no-wrap cursor-pointer"
      v-for="(src, index) in files"
      :name="index"
      :key="index"
      @click="fullscreen = !fullscreen"
    >
      <q-img
        :src="src"
        fit="cover"
        :style="fullscreen ? `border-radius: 15px` : ``"
      />
    </q-carousel-slide>

    <template v-slot:control>
      <q-btn
        v-if="fullscreen"
        class="absolute-top-right q-ma-sm"
        push
        round
        dense
        color="white"
        text-color="primary"
        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="fullscreen = !fullscreen"
      />
      <q-carousel-control
        position="right"
        class="no-padding no-margin"
        :offset="fullscreen ? [40, 20] : [5, 5]"
      >
      </q-carousel-control>
    </template>

    <template v-slot:navigation-icon="{ index, active, onClick }">
      <div class="full-width" v-if="multiple && fullscreen">
        <q-btn
          flat
          v-if="active"
          size="lg"
          icon="mdi-arrow-up-drop-circle"
          class="shadow-3"
          dense
          @click="onClick"
        />
        <q-btn v-else size="lg" color="white" flat dense @click="onClick">
          <q-avatar square class="shadow-3" size="100px">
            <q-img fit="cover" :src="files[index]" style="border-radius: 5px"/>
          </q-avatar>
        </q-btn>
      </div>
    </template>
  </q-carousel>
  <q-img
    v-if="files.length === 1 && Array.isArray(files)"
    fit="cover"
    :src="files[0]"
  />
  <q-img v-if="typeof files === 'string'" fit="cover" :src="files"/>
</template>
<script setup>
import {computed, onBeforeMount, ref} from "vue";

const props = defineProps({
  files: {
    default: () => [],
  },
  height: {
    type: Number,
    default: 200,
  },
  width: {
    type: Number,
    default: 300,
  },
  class: {
    type: String,
    default: "custom-caption",
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});

let slide = ref(0);
let fullscreen = ref(false);
let multiple = computed(() => props.files?.length > 1);

onBeforeMount(() => {
});
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 0
  color: white
  background-color: rgba(0, 0, 0, .2)

.image-viewer
  background-color: #000000DA
</style>
