import { mapState } from "vuex";
import * as utils from "../utils";

let mixin = {
  created() {
    this.olLayers = [];
  },

  mounted() {
    for (const layerDefinition of this.layersStore) {
      if (layerDefinition.id == "troncons") {
        // ********************************** troncons LAYER *************************************
        let tronconLayer = utils.createTronconsLayer(layerDefinition);
        if (typeof layerDefinition.visible === "boolean")
          tronconLayer.setVisible(layerDefinition.visible);
        this.olLayers.push(tronconLayer);
        this.olMap.addLayer(tronconLayer);
      } else if (layerDefinition.id == "background") {
        // ********************************************   BACKGROUND LAYER *************************************
        let layerBackground = utils.createBackgroundLayer(layerDefinition);
        if (typeof layerDefinition.visible === "boolean")
          layerBackground.setVisible(layerDefinition.visible);
        this.olLayers.push(layerBackground);
        this.olMap.addLayer(layerBackground);
      } else if (layerDefinition.id == "ortho") {
        // ********************************************   BACKGROUND LAYER *************************************
        let layerortho = utils.createBackgroundLayer(layerDefinition);
        if (typeof layerDefinition.visible === "boolean")
          layerortho.setVisible(layerDefinition.visible);
        this.olLayers.push(layerortho);
        this.olMap.addLayer(layerortho);
      }
    }
  },
  computed: {
    ...mapState({
      layersStore: (state) => state.map.layers,
      viewExtentStore: (state) => state.map.viewExtent,
      viewZoomStore: (state) => state.map.viewZoom,
      selectedTronconsStore: (state) => state.map.selectedTroncons,
    }),
    style() {
      return utils.generateNewTronconStyleFunc(
        this.viewExtentStore,
        this.viewZoomStore,
        this.selectedTronconsStore
      );
    },
  },
  watch: {
    layersStore: {
      handler: function() {
        for (let i = 0; i < this.layersStore.length; i++) {
          if (typeof this.layersStore[i].visible === "boolean")
            this.olLayers[i].setVisible(this.layersStore[i].visible);
        }
      },
      deep: true,
    },
    style: {
      handler: function() {
        let i=0;
        for (const layerDefinition of this.layersStore) {
          if (layerDefinition.id == "troncons") {
            this.olLayers[i].setStyle(this.style);
          }
          i++;
        }
      },
      deep: true,
    },
  },
};

export default mixin;
