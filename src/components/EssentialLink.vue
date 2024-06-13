<template>
  <q-item clickable tag="a" @click="navigateTo({ name: props.link })">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from "vue-router";
defineOptions({
  name: "EssentialLink",
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: String,
    default: "#",
  },

  icon: {
    type: String,
    default: "",
  },
});
const $router = useRouter();
function navigateTo(payload) {
  // console.log("payload: ", payload);
  if (payload && typeof payload === "string") {
    if (payload.startsWith("http") || payload.startsWith("https")) {
      window.open(payload, "_blank");
    } else {
      $router.push({ name: payload }); // sino es link por defecto asumo que es name
    }
  }
  if (payload && typeof payload === "object") {
    const path = payload.path ?? false;
    if (path && $route.path !== path) {
      $router.push(path);
    }
    if (payload.name) $router.push({ name: payload.name });
    if (payload.path) $router.push({ path: payload.path });
  }
}
</script>
