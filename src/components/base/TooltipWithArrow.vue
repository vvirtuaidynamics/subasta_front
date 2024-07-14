<script setup>
import {computed, ref} from "vue";

defineOptions({
  name: "TooltipWithArrow",
});

const props = defineProps({
  dark: {type: Boolean, default: false},
  text: {
    type: String,
    default: 'text-body1',
  },
  background: {
    type: String,
    default: 'bg-white',
  },
  textColor: {
    type: String,
    default: 'text-grey-10',
  },
  arrow: {
    type: String,
    default: 'top',
  },
  show: {
    type: Boolean,
    default: false,
  },

  offset: {
    type: Array,
    default: () => [0, 0],
  },
})
const position = {
  top: {anchor: 'top middle', self: 'top middle', offset: [0, 0]},
  bottom: {anchor: 'bottom middle', self: 'bottom middle', offset: [0, 0]},
  left: {anchor: 'center left', self: 'center right', offset: [0, 0]},
  right: {anchor: 'center right', self: 'center left', offset: [0, 0]},
}
const refEl = ref(null)
const show = ref(props.show);
const offset = ref(props.offset);
const arrowClass = computed(() => {
  let arrowClassCorrected = props.arrow.replace(' ', '-');
  let allowedClasses = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom'];
  if (!allowedClasses.includes(arrowClassCorrected)) {
    console.warn(`Arrow class ${arrowClassCorrected} is not allowed. Allowed classes are ${allowedClasses.join(', ')}`)
  }

  return arrowClassCorrected;
});

defineExpose({
  refEl,

})
</script>

<template>
  <q-tooltip ref="refEl"
             :class="`tooltip tooltip-arrow-${arrowClass} ${props.background}  ${props.dark? 'bg-dark text-white' : ''} `"
             :model-value="show">
    <div class="tooltip-content"
         :class="`${props.text} ${props.background} ${props.textColor}`">

      <slot/>

    </div>

    <div class="tooltip-arrow absolute" :class="`${props.background}`"></div>

  </q-tooltip>
</template>

<style lang="scss">
$box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);

.tooltip {
  overflow: visible;
  background: transparent;
  padding: 0;
  box-shadow: $box-shadow;
  border-radius: 15px;

  &-content {
    border-radius: 15px;
    padding: 20px;
    position: relative;
  }

  &-arrow {
    box-shadow: $box-shadow;
    width: 30px;
    height: 30px;
    transform: translateX(-50%) rotate(-45deg) skew(-15deg, -15deg);
    z-index: -1;

    // top
    [class*="tooltip-arrow-top"] & {
      top: 0;
    }

    .tooltip-arrow-top & {
      left: 50%;
    }

    .tooltip-arrow-top-left & {
      left: 10%;
    }

    .tooltip-arrow-top-right & {
      left: 90%;
    }

    //bottom
    [class*="tooltip-arrow-bottom"] & {
      bottom: 0;
    }

    .tooltip-arrow-bottom & {
      left: 50%;
    }

    .tooltip-arrow-bottom-left & {
      left: 10%;
    }

    .tooltip-arrow-bottom-right & {
      left: 90%;
    }

    [class*="tooltip-arrow-left"] & {
      transform: translateY(-50%) rotate(45deg) skew(-15deg, -15deg);
    }

    .tooltip-arrow-left & {
      top: 50%;
      left: 0;
    }

    .tooltip-arrow-left-top & {
      top: 20px;
    }

    .tooltip-arrow-left-bottom & {
      bottom: -10px;
    }

    [class*="tooltip-arrow-right"] & {
      transform: translateY(-50%) rotate(45deg) skew(-15deg, -15deg);
      right: 0;

    }

    .tooltip-arrow-right & {
      top: 50%;
    }

    .tooltip-arrow-right-top & {
      top: 20px;
    }

    .tooltip-arrow-right-bottom & {
      bottom: -10px;
    }
  }

}


</style>
