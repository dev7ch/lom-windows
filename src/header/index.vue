<template>
  <div class="header">
    <div class="bullets">
      <slot name="button-1">
        <span class="bullet bullet-green"></span>
      </slot>
      <slot name="button-2">
        <span class="bullet bullet-yellow"></span>
      </slot>
      <template v-if="$parent.closeButton">
        <span class="bullet bullet-red">
          <slot name="closeButton"/>
        </span>
      </template>
    </div>
    <div class="title-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Header } from './script';
export default Header;
</script>

<style lang="scss" scoped>

  .header {
    height: 30px;
    padding-right: 75px;
    display: flex;
    align-items: center;
  }

  .title {
    flex: 1 1 320px;
    text-align: center;
    font-size: 12px;
    color: #766F79;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bullets {
    display: flex;
    flex: 0 0;
    align-items: center;
  }

  .bullet {
    position: relative;
    height: 12px;
    width: 12px;
    display: block;
    background: #ccc;
    border-radius: 100%;
    border: 1px solid;

    &:last-of-type {
      margin-right: 8px;
    }
  }

  .bullet + .bullet {
    margin-left: 5px;
  }

  .bullet-red {
    background: red;
    border-color: red;
  }

  .bullet-yellow {
    background: yellow;
    border-color: yellow;
  }

  .bullet-green {
    background: green;
    border-color: green;
  }

  .header.isUrl {
    background: #e8e8e8;
    &.title {
      background: #fff;
      flex: 1 1 320px;
      border-radius: 4px;
      line-height: 26px;
      margin-left: 17px;
      padding: 0 12px;
      text-align: left;
    }
  }

  .header.dark {
    &.title {
      color: white;
    }

    &.bullet {
      border-color: transparent;
    }

    &.isUrl {
      background: rgba(255, 255, 255, .1);
      &.title {
        background-color: rgba(156, 156, 156, 0.21);
      }
    }
  }

</style>
