<template>
  <div id="app">
    <lom-window-default>

      <lom-window title="Window 1" :close-button="true" :isOpen.sync="isOpen">

        <h1>Hello Yeah</h1>
      </lom-window>

      <button @click="isOpen = ! isOpen">Toggle Window 1</button>

    </lom-window-default>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    data() {
        return {
            isOpen: true,
        };
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
