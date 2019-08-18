<template>
  <div class="button" :style="style" @mouseenter="hover = true" @mouseleave="hover = false" @mousedown.stop="mousedown" @touchstart.stop="mousedown" @mouseup="mouseup" @touchend="mouseup" :disabled="disabled">
    <slot />
  </div>
</template>

<script lang="ts">
import { Button } from './script';
export default Button;
</script>


<style lang="scss" scoped>
.button {
  background-color: transparent;
  border: none;
  font-size: 16px;
  margin: 0;
  padding: 0 0.25em;
  border-radius: 4pt;

  &.close {
    cursor: pointer;
    &:hover {
      background-color: transparent !important;
    }

    min-width: 14px;
    min-height: 14px;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
