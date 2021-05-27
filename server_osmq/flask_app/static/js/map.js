

var projection = ol.proj.get('EPSG:900913');
var projectionExtent = projection.getExtent();
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(14);
var matrixIds = new Array(14);
for (var z = 0; z < 14; ++z) {
// generate resolutions and matrixIds arrays for this WMTS
resolutions[z] = size / Math.pow(2, z);
matrixIds[z] = z;
}

//for the baselayer
var Base = {}
    Base['1'] = new ol.layer.Tile({
        source: new ol.source.OSM(),
        opacity: 0.4,
        baseLayer: true,
        displayInLayerSwitcher: true,
        visible: true,
        title: "Base Layer"
    });

//for the other layers:
var lineLayers = {};

        lineLayers['1'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:line_less_than_6_months', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Moins de 6 Mois',
        });
       
        lineLayers['2'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:Line_between_6m_and_1y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Entre 6 et 12 Mois'
        }); 
                
                
        lineLayers['3'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:Line_between_1y_and_2y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Entre 1 an et 2 ans'
        });    
               
        lineLayers['4'] =  new ol.layer.Image({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:Line_between_2y_and_2.5y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Plus de 2 ans'
        });
     
var pointLayers = {};

        pointLayers['1'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:point_less_than_6_months', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Moins de 6 Mois',
        });
       
        pointLayers['2'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:point_between_6m_and_1y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Entre 6 et 12 Mois'
        }); 
                
                
        pointLayers['3'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:point_between_1y_and_2y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Entre 1 an et 2 ans'
        });    
               
        pointLayers['4'] =  new ol.layer.Image({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:point_between_2y_and_2.5y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Plus de 2 ans'
        });
var polyLayers = {};

        polyLayers['1'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:polygon_less_than_6_months', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Moins de 6 Mois',
        });
       
        polyLayers['2'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:polygon_between_6m_and_1y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Entre 6 et 12 Mois'
        }); 
                
                
        polyLayers['3'] =  new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:polygon_between_1y_and_2y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Entre 1 an et 2 ans'
        });    
               
        polyLayers['4'] =  new ol.layer.Image({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms?',
                ratio: 1,	
                serverType: 'mapserver',
                projection: 'EPSG:4326',
                imageExtent: [-180, -90, 180, 90],
                params: {'LAYERS': 'myspace:polygon_between_2y_and_2.5y', 'FORMAT': 'IMAGE/png'},
                }),
            visible: false,
            title: 'Plus de 2 ans'
        });
     
var line = new ol.layer.Group({
title: 'Historique des lignes',
openInLayerSwitcher: false,
visible: false,
layers: Object.values(lineLayers),
});

var point = new ol.layer.Group({
    title: 'Historique des points',
    openInLayerSwitcher: false,
    visible: false,
    layers: Object.values(pointLayers),
    }); 

var poly = new ol.layer.Group({
        title: 'Historique des polygones',
        openInLayerSwitcher: false,
        visible: false,
        layers: Object.values(polyLayers),
        }); 



// this function to take the layers as array and add them into the switcher
function LayersToArray(layer) {
    var array = [];
    for( key in layer)
     array[array.length]= layer[key];
    return array;
}

var map = new ol.Map({
        target: 'map',
        logo:false,
        view: new ol.View({
            center: ol.proj.fromLonLat([-0.641085, 35.698944]),
            zoom: 12
          }),

     controls: ol.control.defaults().extend([
            new ol.control.LayerSwitcher,
            ]),
        layers:  LayersToArray(Base).concat( [poly, point, line] )

    });

