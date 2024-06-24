<script setup>
defineOptions({
  name: "WordRotator",
});
defineProps({

  title: {type: String, default: 'Title'},
  words: {type: Array, default: () => ["primera", "segunda"]},

  color: {type: String, default: '#0e6ffc'}
})

</script>

<template>
  <div class="wrapper">
    <div class="words">
      <span :style="`color:${color}`">good</span>
      <span>fantastic</span>
    </div>
  </div>

</template>

<style scoped lang="css">
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  //box-sizing: border-box;
  //font-size: inherit;
}

.wrapper {
  box-sizing: content-box;
  height: 50px;
  display: flex;
  //box-shadow: 0 20px 25px rgba(0,0,0,0.2);

}

.words {
  overflow: hidden;
}

span {
  display: block;
  height: 100%;
  padding-left: 10px;
  //border: solid 1px orange;
  animation: spin_words 10s infinite;

}

@keyframes spin_words {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-112%);
  }
  100% {
    transform: translateY(0%);
  }

}
</style>
