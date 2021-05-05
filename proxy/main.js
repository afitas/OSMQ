const result = require("dotenv").config();
if (result.error) {
  throw result.error;
}

const GEOSERVER_ADR = process.env.GEOSERVER_ADR || "http://127.0.0.1:8080/";
const LISTEN_PORT = process.env.LISTEN_PORT || 8082;
const DB_URI =
  process.env.DB_URI || "postgresql://postgres:admin@localhost:5433/rna";
const GEOMS_LAYER_NAME = process.env.GEOMS_LAYER_NAME || "runitel:geoms";

var pgp = require("pg-promise")(/*options*/);
var express = require("express");
var app = express();
var httpProxy = require("http-proxy");
var cors = require("cors");
const cookieParser = require("cookie-parser");

var db = pgp(DB_URI);
var apiProxy = httpProxy.createProxyServer();
app.use(cors());
app.use(cookieParser());

function get_extent_from_tile_coordinates(tileCoord) {
  const origin = [-180.0, 90.0];
  const resolution = resolutions[tileCoord[0]];
  const tileSize = [256, 256];
  const minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
  const minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
  const maxX = minX + tileSize[0] * resolution;
  const maxY = minY + tileSize[1] * resolution;
  return [minX, minY, maxX, maxY];
}

app.use(function (req, res, next) {
  for (var key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
});

app.get("/*", async function (req, res) {
  try {
    let api_key = req.query["api_key"];
    if (req.query["layer"] == GEOMS_LAYER_NAME) {
      let resp = await db.oneOrNone(
        "SELECT code_commune,ST_AsText(ST_Envelope(geomnorm)) as polyg from commune, public.user WHERE " +
          "api_key = '" +
          api_key +
          "' and " +
          " affectation_id = commune.pk "
      );
      // INTERSECTS(geom, POLYGON((-180 90,-180 -90, 180 -90 ,180 90,-180 90)))
      if (resp)
        req.url =
          req.url + "&cql_filter=INTERSECTS(geom, " + resp["polyg"] + ")";
      else {
        res.status(500).send("Erreur");
        return;
      }
    }
    let extent = [0, 0, 0, 0];
    if (req.query["service"] == "WMTS") {
      extent = get_extent_from_tile_coordinates([
        parseInt(req.query["tilematrix"].match(/4326:(.*)$/)[1]),
        parseInt(req.query["tilecol"]),
        parseInt(req.query["tilerow"]),
      ]);
    } else if (req.query["service"] == "WMS") {
      extent = req.query["bbox"].split(",").map((x) => {
        return parseFloat(x);
      });
      let save_var = extent[1];
      extent[1] = extent[0];
      extent[0] = save_var;
      save_var = extent[3];
      extent[3] = extent[2];
      extent[2] = save_var;
    } else {
      res.status(500).send("Erreur");
      return;
    }

    db.oneOrNone(
      "SELECT " +
        " ST_Intersects(commune.geomnorm::geometry, ST_MakeEnvelope(" +
        extent[0] +
        ", " +
        extent[1] +
        ", " +
        extent[2] +
        ", " +
        extent[3] +
        ", 4326)) as intesects" +
        " from  public.user, commune where " +
        "api_key = '" +
        api_key +
        "' and " +
        " affectation_id = commune.pk "
    )
      .then(function (data) {
        if (data && data["intesects"] == true) {
          apiProxy.web(req, res, { target: GEOSERVER_ADR }, function (e) {
            console.log(e);
          });
        } else {
          res.status(500).send("Erreur");
          return;
        }
      })
      .catch(function (error) {
        console.log("ERROR:", error);
        res.status(500).send("Erreur");
        return;
      });
  } catch (e) {
    console.log("ERROR:", e);
    res.status(500).send("Erreur");
    return;
  }
});

app.listen(LISTEN_PORT, function () {
  console.log(
    "Started : proxying from port " + LISTEN_PORT + " to " + GEOSERVER_ADR
  );
});

const resolutions = [
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
