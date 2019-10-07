<template>
  <div class="rvTreeComponent">
    <md-list v-if="children">
      <md-list-item v-bind.sync="{ 'md-expanded': expanded == undefined ? true : expanded }" md-expand>
        <span class="md-list-item-text">{{ name }}</span>

        <md-list slot="md-expand">
          <LegendComponent
            class="md-inset"
            v-for="node in children"
            v-bind:key="node.name"
            :expanded="node.expanded"
            :name="node.name"
            :children="node.children"
          >{{ node.name }}</LegendComponent>
        </md-list>
      </md-list-item>
    </md-list>
    <div class="rvTreeComponentLeaf" v-else>{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "LegendComponent",
  props: ["expanded", "children", "name"]
};
</script>

<style scoped>
.rvTreeComponent {
  padding-left: 10px;
}
.rvTreeComponentLeaf {
  padding: 20px;
}
</style>