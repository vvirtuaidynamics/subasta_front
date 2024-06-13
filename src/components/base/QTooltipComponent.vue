<template>
  <q-tooltip :class="props.class" v-if="props.title">
    {{ props.title }}</q-tooltip
  >
</template>

<script setup>
defineOptions({
  name: "QTooltipComponent",
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  class: { type: String, default: "bg-primary" },
});
</script>

<style lang="scss" scoped></style>
