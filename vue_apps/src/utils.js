import * as consts from "./consts";
import * as olLayer from "ol/layer";
import * as olSource from "ol/source";
import * as olStyle from "ol/style";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import * as olFormat from "ol/format";

var gridsetName = "EPSG:4326";
var resolutions = consts.resolutions;
var gridNames = consts.gridNames;
var style = "";
var GEOSERVER_WMTS_URL = consts.GEOSERVER_WMTS_URL;
var projection = "EPSG:4326";

export const createBackgroundLayer = function(layerDefinition) {
  var format = "image/png";
  var layerName = layerDefinition.geoserverLayername;
  let baseParams = [
    "api_key",
    "VERSION",
    "LAYER",
    "STYLE",
    "TILEMATRIX",
    "TILEMATRIXSET",
    "SERVICE",
    "FORMAT",
  ];
  let params = {
    api_key: window.api_key,
    VERSION: "1.0.0",
    LAYER: layerName,
    STYLE: style,
    TILEMATRIX: gridsetName,
    TILEMATRIXSET: gridsetName,
    SERVICE: "WMTS",
    FORMAT: format,
  };
  var url = GEOSERVER_WMTS_URL + "?";
  for (var param in params) {
    if (baseParams.indexOf(param.toUpperCase()) < 0) {
      url = url + param + "=" + params[param] + "&";
    }
  }
  url = url.slice(0, -1);
  var layerBackground = new olLayer.Tile({
    zIndex: layerDefinition.zindex,
    source: new olSource.WMTS({
      url: url,
      layer: params["LAYER"],
      matrixSet: params["TILEMATRIXSET"],
      format: params["FORMAT"],
      projection: projection,
      tileGrid: new WMTSTileGrid({
        tileSize: [256, 256],
        extent: [-180.0, -90.0, 180.0, 90.0],
        origin: [-180.0, 90.0],
        resolutions: resolutions,
        matrixIds: gridNames,
      }),
      style: params["STYLE"],
      wrapX: true,
    }),
  });
  return layerBackground;
};


export const createTronconsLayer = function(layerDefinition) {
  var format = "application/vnd.mapbox-vector-tile";
  var layerName = consts.TRONCONS_LAYER_NAME;
  let params = {
    api_key: window.api_key,
    REQUEST: "GetTile",
    SERVICE: "WMTS",
    VERSION: "1.0.0",
    LAYER: layerName,
    STYLE: style,
    TILEMATRIX: gridsetName + ":{z}",
    TILEMATRIXSET: gridsetName,
    FORMAT: format,
    TILECOL: "{x}",
    TILEROW: "{y}",
  };
  var url = GEOSERVER_WMTS_URL + "?";
  for (var param in params) {
    url = url + param + "=" + params[param] + "&";
  }
  url = url.slice(0, -1);
  var tronconLayer = new olLayer.VectorTile({
    declutter: true,
    // minZoom: 14,
    zIndex: layerDefinition.zindex,
    source: new olSource.VectorTile({
      crossOrigin: "*",
      url: url,
      format: new olFormat.MVT(),
      projection: projection,
      tileGrid: new WMTSTileGrid({
        tileSize: [256, 256],
        origin: [-180.0, 90.0],
        resolutions: resolutions,
        matrixIds: gridNames,
      }),
      wrapX: true,
    }),
    // style: function(feature, resolution) {
    //   return new olStyle.Style({
    //     stroke: new olStyle.Stroke({
    //       color: "red",
    //       width: 3,
    //     }),
    //     text: new olStyle.Text({
    //       font: "12px Calibri,sans-serif",
    //       text: feature.get(consts.GEOM_ID_COLUMN_NAME),
    //       fill: new olStyle.Fill({
    //         color: "#000",
    //       }),
    //       stroke: new olStyle.Stroke({
    //         color: "#fff",
    //         width: 3,
    //       }),
    //     }),
    //   });
    // },
  });
  return tronconLayer;
};

export const equals = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

export function generateNewTronconStyleFunc(extent, zoom, selectedTroncons) {
  return function(feature, resolution) {
    let color = "orange";
    if (selectedTroncons
      .map(function(e) {
        return e.properties_[consts.GEOM_ID_COLUMN_NAME];
      }).includes(feature.get(consts.GEOM_ID_COLUMN_NAME)))
      color = "blue";
    let styleOpt = {};
    styleOpt["stroke"] = new olStyle.Stroke({
      color: color,
      width: 3,
    });
    // console.log(feature.get(consts.GEOM_ID_COLUMN_NAME));
    styleOpt["text"] = new olStyle.Text({
      font: "12px Calibri,sans-serif",
      text: feature.get(consts.GEOM_ID_COLUMN_NAME),
      fill: new olStyle.Fill({
        color: "#000",
      }),
      stroke: new olStyle.Stroke({
        color: "#fff",
        width: 3,
      }),
    });
    return new olStyle.Style(styleOpt);
  };
}
