import Vue from "vue";
import { buffer } from "ol/extent";
import * as consts from "../../consts";

const state = {
  layers: [
    {
      id: "ortho",
      title: "صورة أورثو",
      geoserverLayername: consts.ORTHO_LAYER_NAME,
      zindex: 0,
      visible: true,
    },
    {
      id: "background",
      title: "خلفية الخريطة",
      geoserverLayername: consts.BACKGROUND_LAYER_NAME,
      zindex: 1,
      visible: true,
    },
    {
      id: "troncons",
      title: "أقسام الطريق",
      geoserverLayername: consts.TRONCONS_LAYER_NAME,
      zindex: 3,
      visible: true,
    },
  ],
  selectedTroncons: [],
  viewExtent: [],
  viewZoom: 10,
};

const getters = {};

const actions = {
  featureSelected({ state, commit }, { feature }) {
    let extent = feature.extent_.slice();
    let e = buffer(extent, 0.0008) //after search
    commit("setStoreViewExtent", { viewExtent: e });
    if (state.viewZoom > 15) commit("setSelectedTroncon", { feature: feature });
  },
};

const mutations = {
  visibleLayer(state, payload) {
    state.layers[payload.index].visible = payload.visible;
  },

  setStoreViewExtent(state, { viewExtent }) {
    state.viewExtent = viewExtent;
  },
  setStoreViewZoom(state, { viewZoom }) {
    state.viewZoom = viewZoom;
  },
  setSelectedTroncon(state, { feature }) {
    // If it exist in selectedTroncons delete it else add it
    if (
      !state.selectedTroncons
        .map(function(e) {
          return e.properties_[consts.GEOM_ID_COLUMN_NAME];
        })
        .includes(feature.properties_[consts.GEOM_ID_COLUMN_NAME])
    ) {
      state.selectedTroncons.push(feature);
    } else {
      state.selectedTroncons.splice(
        state.selectedTroncons
          .map(function(e) {
            return e.properties_[consts.GEOM_ID_COLUMN_NAME];
          })
          .indexOf(feature.properties_[consts.GEOM_ID_COLUMN_NAME]),
        1
      );
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
