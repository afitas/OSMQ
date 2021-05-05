<template>
  <nav class="sidebar">
    <div>
      SIDE BAR GOES HERE <br /><br />
      {{ this.tronconNames }}
    </div>
  </nav>
</template>

<script>
import * as consts from "../consts";

export default {
  name: "SideBar",
  props: {
    msg: String,
  },
  computed: {
    tronconNames () {
      let res = []
      for ( const elt of this.$store.state.map.selectedTroncons) {
        res.push(elt.properties_[consts.GEOM_ID_COLUMN_NAME])
      }
      return res;
    }
  }
};
</script>

<style scoped>
.sidebar {
  height: 85vh; /* Full-height: remove this if you want "auto" height */
  width: 300px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 60px; /* Stay at the top */
  left: 0;
  background-color: whitesmoke; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}
</style>
