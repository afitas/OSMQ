<template>
  <div >
    <Map />
    <SideBar />
    <Layers />
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import SideBar from "./components/SideBar.vue";
import Layers from "./components/Layers.vue";

export default {
  name: "EditApp",
  components: {
    Map,
    SideBar,
    Layers
  }
};
</script>

<style>
</style>
