<template>
  <div id="app">
    <Legend v-bind:entries="$store.state.entries" />
  </div>
</template>

<script>
import Legend from "./components/Legend";

export default {
  name: "app",
  components: {
    Legend
  }
};
</script>

<style>
#app {
  margin: 10px;
}
</style>
