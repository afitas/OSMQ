export const GEOSERVER_WMTS_URL =
  process.env.VUE_APP_GEOSERVER_WMTS_URL ||
  "http://192.168.0.228:8080/geoserver/gwc/service/wmts";
// WARNING : DONT MODIFY THIS LINE if you want to set another GEOSERVER_WMTS_URL use envirenment variable VUE_APP_GEOSERVER_WMTS_URL using a .env file or cmd windows cli SET VUE_APP_GEOSERVER_WMTS_URL=http://127.0.0.1:8080/geoserver/gwc/service/wmts

export const BACKGROUND_LAYER_NAME =
  process.env.VUE_APP_BACKGROUND_LAYER_NAME || "rna:commune";
// SAME WARNING AS GEOSERVER_WMTS_URL
export const TRONCONS_LAYER_NAME =
  process.env.VUE_APP_TRONCONS_LAYER_NAME || "rna:geoms";
// SAME WARNING AS GEOSERVER_WMTS_URL
export const ORTHO_LAYER_NAME =
  process.env.VUE_APP_ORTHO_LAYER_NAME || "rna:arz50cm";
// SAME WARNING AS GEOSERVER_WMTS_URL
export const GEOM_ID_COLUMN_NAME =
  process.env.VUE_APP_GEOM_ID_COLUMN_NAME || "geom_id";
// SAME WARNING AS GEOSERVER_WMTS_URL


export const resolutions = [
  0.703125,
  0.3515625,
  0.17578125,
  0.087890625,
  0.0439453125,
  0.02197265625,
  0.010986328125,
  0.0054931640625,
  0.00274658203125,
  0.001373291015625,
  6.866455078125e-4,
  3.4332275390625e-4,
  1.71661376953125e-4,
  8.58306884765625e-5,
  4.291534423828125e-5,
  2.1457672119140625e-5,
  1.0728836059570312e-5,
  5.364418029785156e-6,
  2.682209014892578e-6,
  1.341104507446289e-6,
  6.705522537231445e-7,
  3.3527612686157227e-7,
];

export const gridNames = [
  "EPSG:4326:0",
  "EPSG:4326:1",
  "EPSG:4326:2",
  "EPSG:4326:3",
  "EPSG:4326:4",
  "EPSG:4326:5",
  "EPSG:4326:6",
  "EPSG:4326:7",
  "EPSG:4326:8",
  "EPSG:4326:9",
  "EPSG:4326:10",
  "EPSG:4326:11",
  "EPSG:4326:12",
  "EPSG:4326:13",
  "EPSG:4326:14",
  "EPSG:4326:15",
  "EPSG:4326:16",
  "EPSG:4326:17",
  "EPSG:4326:18",
  "EPSG:4326:19",
  "EPSG:4326:20",
  "EPSG:4326:21",
];
