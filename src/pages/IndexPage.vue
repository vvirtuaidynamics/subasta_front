<template>
  <q-page class="flex flex-center ">

    <img alt="Subasta App" src="~assets/images/backgrounds/default.jpeg"
      style="width: 50%; height: auto; border-radius: 20px">

    <q-btn @click="$app.decrement">-</q-btn>
    <h2>{{ $app.counter }}</h2>
    <q-btn @click="$app.increment">+</q-btn>
  </q-page>
</template>

<script setup>
import { useCounterStore } from 'src/stores/example-store';

defineOptions({
  name: 'IndexPage'
});

const $app = useCounterStore()




</script>
