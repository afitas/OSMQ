from flask import render_template, make_response
from flask_app.extentions import db
from . import bp_dashboard
import numpy as np
from ..models import lineactuality, pointactuality, polygoneactuality,Completude, Created_line, Created_point, Created_polygon, Edited_line, Edited_point, Edited_poligon, Distinct, User_classification, Invalid_polygon, poly_by_mounth
import psycopg2
import os
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(BASE_DIR,'cache')
CACHE_DIR_point = os.path.join(BASE_DIR,'cache_point')
CACHE_DIR_poly = os.path.join(BASE_DIR,'cache_poly')
CACHE_DIR_poly = os.path.join(BASE_DIR,'cache_poly')


@bp_dashboard.route('/', methods=['GET'])
# @login_required
def landing_page():
    # pre traitement
    data = db.session.query(lineactuality).first()
    data2 = db.session.query(pointactuality).first()
    data3 = db.session.query(polygoneactuality).first()
    Completudedata = db.session.query(Completude).all()
    Created_linedata = db.session.query(Created_line).all()
    Created_pointdata = db.session.query(Created_point).all()
    Created_polygondata = db.session.query(Created_polygon).all()
    Edited_linedata = db.session.query(Edited_line).all()
    Edited_pointdata = db.session.query(Edited_point).all()
    Edited_polygondata = db.session.query(Edited_poligon).all()
    Distinctdata = db.session.query(Distinct).all()
    data4 = db.session.query(User_classification).first()
    Invalid_polygondata = db.session.query(Invalid_polygon).all()
    poly_by_mounthdata = db.session.query(poly_by_mounth).all()

    # Completude
    monthcomp = [el.date_trunc.strftime("%m/%Y") for el in Completudedata]
    y1 = [el.motorway_highway for el in Completudedata]
    y2 = [el.secondary_tertiary for el in Completudedata]
    y3 = [el.residential for el in Completudedata]
    y4 = [el.other_roads for el in Completudedata]  
    # Add values for stacking
    y2s = np.add(y2, y1)
    y3s = np.add(y2s, y3)
    y4s = np.add(y3s, y4)
    # Distinct user by mounth
    monthdist = [el.month.strftime("%m/%Y") for el in Distinctdata]
    dist = [el.count for el in Distinctdata]
    # invalid polygons
    monthpoly = [el.generate_series.strftime("%m/%Y") for el in poly_by_mounthdata]
    invalid = [el.poly_invalid for el in Invalid_polygondata]  
    by_mounth = [el.poly_total for el in poly_by_mounthdata]
    quotients = [0 if y==0 else x*100/y for x, y in zip(invalid,by_mounth)]
 

    # Point created and edited period
    monthpoint = [el.month.strftime("%m/%Y") for el in Created_pointdata]
    createdpoint = [el.created for el in Created_pointdata]
    editedpoint = [el.edited for el in Edited_pointdata]
   
    # line created and edited period
    monthline = [el.month.strftime("%m/%Y") for el in Created_linedata]
    createdline = [el.created for el in Created_linedata]
    editedline = [el.edited for el in Edited_linedata]

    # polygons created and edited period
    month = [el.month.strftime("%m/%Y") for el in Created_polygondata]
    createdpoly = [el.created for el in Created_polygondata]
    editedpoly = [el.edited for el in Edited_polygondata]

    
    colors = [
        "#F7464A", "#46BFBD", "#FDB45C", "#FEDCBA",
        "#ABCDEF", "#DDDDDD", "#ABCABC", "#4169E1",
        "#C71585", "#FF4500", "#FEDCBA", "#46BFBD"
    ]

    return render_template('dashboard/index.html', data=data, data2=data2, data3=data3, Completudedata=Completudedata, month=month, createdpoly=createdpoly, editedpoly=editedpoly,monthline=monthline, createdline=createdline, editedline=editedline,monthpoint=monthpoint, createdpoint=createdpoint, editedpoint=editedpoint, monthcomp=monthcomp, y1=y1, y2s=y2s, y3s=y3s, y4s=y4s, monthdist=monthdist, dist=dist, data4=data4, monthpoly=monthpoly, invalid=invalid, quotients=quotients)
    
def tile_ul(x, y, z):
    n = 2.0 ** z
    lon_deg = x / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * y / n)))
    lat_deg = math.degrees(lat_rad)
    return  lon_deg,lat_deg

def get_tile(z,x,y):
    xmin,ymin = tile_ul(x, y, z)
    xmax,ymax = tile_ul(x + 1, y + 1, z)
	
    tile = None
	
    tilefolder = "{}/{}/{}".format(CACHE_DIR,z,x)
    tilepath = "{}/{}.pbf".format(tilefolder,y)
    if not os.path.exists(tilepath): 
        conn = psycopg2.connect('dbname=oran user=postgres password=postgres host=localhost')
        cur = conn.cursor()
        
        query = "SELECT ST_AsMVT(tile) FROM (SELECT age, ST_AsMVTGeom(geom, ST_Makebox2d(ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857),ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857)), 4096, 0, false) AS geom FROM line_map) AS tile"
        cur.execute(query,(xmin,ymin,xmax,ymax))
        tile = bytes(cur.fetchone()[0])
        
        if not os.path.exists(tilefolder):
            os.makedirs(tilefolder)
        
        with open(tilepath, 'wb') as f:
            f.write(tile)
            f.close()

        cur.close()
        conn.close()
    else:
        tile = open(tilepath, 'rb').read()
	
    return tile

def get_tile_point(z,x,y):
    xmin,ymin = tile_ul(x, y, z)
    xmax,ymax = tile_ul(x + 1, y + 1, z)
	
    tile = None
	
    tilefolder = "{}/{}/{}".format(CACHE_DIR_point,z,x)
    tilepath = "{}/{}.pbf".format(tilefolder,y)
    if not os.path.exists(tilepath): 
        conn = psycopg2.connect('dbname=oran user=postgres password=postgres host=localhost')
        cur = conn.cursor()
        
        query = "SELECT ST_AsMVT(tile) FROM (SELECT age, ST_AsMVTGeom(geom, ST_Makebox2d(ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857),ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857)), 4096, 0, false) AS geom FROM point_map) AS tile"
        cur.execute(query,(xmin,ymin,xmax,ymax))
        tile = bytes(cur.fetchone()[0])
        
        if not os.path.exists(tilefolder):
            os.makedirs(tilefolder)
        
        with open(tilepath, 'wb') as f:
            f.write(tile)
            f.close()

        cur.close()
        conn.close()
    else:
        tile = open(tilepath, 'rb').read()
	
    return tile


def get_tile_poly(z,x,y):
    xmin,ymin = tile_ul(x, y, z)
    xmax,ymax = tile_ul(x + 1, y + 1, z)
	
    tile = None
	
    tilefolder = "{}/{}/{}".format(CACHE_DIR_poly,z,x)
    tilepath = "{}/{}.pbf".format(tilefolder,y)
    if not os.path.exists(tilepath): 
        conn = psycopg2.connect('dbname=oran user=postgres password=postgres host=localhost')
        cur = conn.cursor()
        
        query = "SELECT ST_AsMVT(tile) FROM (SELECT age, ST_AsMVTGeom(geom, ST_Makebox2d(ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857),ST_transform(ST_SetSrid(ST_MakePoint(%s,%s),4326),3857)), 4096, 0, false) AS geom FROM poly_map) AS tile"
        cur.execute(query,(xmin,ymin,xmax,ymax))
        tile = bytes(cur.fetchone()[0])
        
        if not os.path.exists(tilefolder):
            os.makedirs(tilefolder)
        
        with open(tilepath, 'wb') as f:
            f.write(tile)
            f.close()

        cur.close()
        conn.close()
    else:
        tile = open(tilepath, 'rb').read()
	
    return tile


@bp_dashboard.route('/map')
def show_map():
    return render_template('dashboard/map.html')

@bp_dashboard.route('/tmp')
def show_tmp():
    return render_template('dashboard/tmp.html')

@bp_dashboard.route('/tiles')
@bp_dashboard.route('/tiles/<int:z>/<int:x>/<int:y>', methods=['GET'])
def tiles(z=0, x=0, y=0):
    tile = get_tile(z, x, y)
    response = make_response(tile)
    response.headers['Content-Type'] = "application/octet-stream"
    return response

@bp_dashboard.route('/tiles_point')
@bp_dashboard.route('/tiles_point/<int:z>/<int:x>/<int:y>', methods=['GET'])
def tiles_point(z=0, x=0, y=0):
    tile = get_tile_point(z, x, y)
    response = make_response(tile)
    response.headers['Content-Type'] = "application/octet-stream"
    return response

@bp_dashboard.route('/tiles_poly')
@bp_dashboard.route('/tiles_poly/<int:z>/<int:x>/<int:y>', methods=['GET'])
def tiles_poly(z=0, x=0, y=0):
    tile = get_tile_poly(z, x, y)
    response = make_response(tile)
    response.headers['Content-Type'] = "application/octet-stream"
    return response