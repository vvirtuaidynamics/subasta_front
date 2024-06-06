<template>
  <q-page class="flex flex-center ">

    <h2>LOGIN</h2>
  </q-page>
</template>

<script setup>
import { useCounterStore } from 'src/stores/example-store';

defineOptions({
  name: 'RegisterPage'
});

const $app = useCounterStore()




</script>
