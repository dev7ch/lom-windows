<template>
  <transition name="fade" @after-leave="$emit('close')" @after-enter="$emit('open')">
    <div v-show="isOpen" class="window" :style="styleWindow" ref="window" @mousedown="activate" @touchstart="activate">
      <div :style="styleTitlebar" class="titlebar" ref="titlebar">
        <my-header>
          <div class="title">
            <template v-if="$slots.title">
              <slot name="title" />
            </template>
            <template v-else>{{title}}</template>
          </div>
          <slot name="close" />
          <template v-slot:closeButton>
            <my-button class="close" @click="closeButtonClick"></my-button>
          </template>
        </my-header>
      </div>
      <div class="content" :style="styleContent" ref="content">
        <slot />
      </div>
      <div class="lom-actions">
        <slot name="actions"></slot>
      </div>
      <div class="lom-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { WindowType } from './script';
export default WindowType;
</script>

<style lang="scss" scoped>
.window {
  display: flex;
  flex-flow: column;
  position: absolute;
  border-radius: 4pt;
}

.titlebar {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 0 0 0 0;
  font-family: sans-serif;
  padding: 0.5em;
  flex: 0 0 auto;
}

.title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  flex-grow: 1;
  padding: 0.5em;
}

.draggable-handle {
  cursor: move;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}
</style>
