<template>
  <div>
    <div
      id="map"
      ref="map"
    />
  </div>
</template>

<script>
import LayersMixin from "../mixins/LayersMixin.mixin.js";
import BaseMapMixin from "../mixins/BaseMapMixin.mixin.js";

export default {
  name: "Map",
  props: [],
  mixins: [BaseMapMixin, LayersMixin],
};
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
#map .ol-zoom .ol-zoom-out {
    margin-top: 0px;
}

.ol-zoom {
    display: block !important;
    top: 95px;
    left: 2em !important;
    left: unset;
}

.ol-zoom-extent {
    top: 180px;
    right: 2em !important;
    left: unset;
}

#map .ol-zoomslider {
    top: 200px;
    height: 200px;
    display: none;
}

.ol-zoomslider {
    right: 2em !important;
    left: unset;
}

#map .ol-zoom-in.ol-has-tooltip:hover [role="tooltip"],
#map .ol-zoom-in.ol-has-tooltip:focus [role="tooltip"] {
    top: 3px;
}

#map .ol-zoom-out.ol-has-tooltip:hover [role="tooltip"],
#map .ol-zoom-out.ol-has-tooltip:focus [role="tooltip"] {
    top: 232px;
}
</style>
