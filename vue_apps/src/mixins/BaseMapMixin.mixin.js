import { mapState } from "vuex";
import * as ol from "ol";
import { defaults } from "ol/interaction";
import * as olProj from "ol/proj";
import * as utils from "@/utils";
import * as consts from "@/consts";
import "ol/ol.css";

let mixin = {
  created() {
    this.olMap = {};
  },
  mounted() {
    var resolutions = consts.resolutions;
    this.olMap = new ol.Map({
      interactions: defaults({ doubleClickZoom: false }),
      layers: [],
      target: "map",
      view: new ol.View({
        projection: "EPSG:4326",
        center: [-0.32, 35.85],
        // constrainResolution: true,
        resolutions: resolutions,
        zoom: 14,
        extent: olProj.get("EPSG:4326").getExtent(),
        smoothExtentConstraint: false,
      }),
    });
    // LISTEN CLICK event
    this.olMap.on("dblclick", (evt) => {
      this.olMap.forEachFeatureAtPixel(
        evt.pixel,
        (feature, layer) => {
          let clone_feature = Object.assign({}, feature);
          this.$store.dispatch("featureSelected", {
            feature: clone_feature,
          });
          return;
        },
        { hitTolerance: 5 }
      );
    });
    this.olMap
      .getView()
      .fit(
        [
          -0.343666017055512,
          35.84114074707031,
          -0.297061741352081,
          35.865203857421875,
        ],
        this.olMap.getSize()
      );
    // LISTEN moveend
    this.olMap.on("moveend", () => {
      let viewExtent = this.olMap.getView().calculateExtent();
      this.$store.commit("setStoreViewExtent", {
        viewExtent: viewExtent,
      });
      this.$store.commit("setStoreViewZoom", {
        viewZoom: this.olMap.getView().getZoom(),
      });
    });
    this.$store.commit("setStoreViewExtent", {
      viewExtent: this.olMap.getView().calculateExtent(),
    });
  },
  computed: {
    ...mapState({
      viewExtentStore: (state) => state.map.viewExtent,
      viewZoomStore: (state) => state.map.viewZoom,
    }),
  },
  methods: {
    setViewExtent(extent) {
      this.olMap.getView().fit(extent);
    },
    setViewZoom(level) {
      console.log(level)
      this.olMap.getView().setZoom(level);
    },
  },
  watch: {
    viewExtentStore: {
      handler: function() {
        if (
          !utils.equals(
            this.viewExtentStore,
            this.olMap.getView().calculateExtent()
          )
        ) {
          this.setViewExtent(this.viewExtentStore);
        }
      },
      deep: true,
    },
    viewZoomStore: {
      handler: function() {
        if (this.viewZoomStore != this.olMap.getView().getZoom()) {
          this.setViewZoom(this.viewZoomStore);
        }
      },
      deep: true,
    },
  },
};

export default mixin;
