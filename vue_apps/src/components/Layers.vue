<template>
  <div class="layers-list">
    <!-- <h2>{{ $t("BgLayersList") }}</h2> -->

    <template v-for="(val, index) in this.$store.state.map.layers">
      <input
        type="checkbox"
        @change="updateLayerStore(index, ! val.visible)"
        :checked="val.visible"
        :key="val.title"
      />
      {{ val.title }}
      <br :key="index" />
    </template>
  </div>
</template>

<script>
export default {
  name: "Layers",
  methods: {
    updateLayerStore(index, visible) {
      this.$store.commit("visibleLayer", { index, visible });
    }
  }
};
</script>

<style scoped>
.layers-list {
    position: absolute;
    top: 56px;
    left: 0;
    z-index: 2;
    color: black;
    padding: 20px;
}
</style>