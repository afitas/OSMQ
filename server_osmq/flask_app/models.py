from sqlalchemy import MetaData
from flask_app.extentions import db


class lineactuality(db.Model):
    __table__ = db.Table('Line_actuality', MetaData(),db.Column("c1", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)

class pointactuality(db.Model):
    __table__ = db.Table('Point_actuality', MetaData(),db.Column("p1", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)

class polygoneactuality(db.Model):
    __table__ = db.Table('Polygone_actuality', MetaData(),db.Column("pl1", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)

class Completude(db.Model):
        __table__ = db.Table('tmp', MetaData(),db.Column("date_trunc", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)

class Distinct(db.Model):
        __table__ = db.Table('Distinct_user_by_mounth', MetaData(),db.Column("month", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)

class Created_line(db.Model):
        __table__ = db.Table('Created_line', MetaData(),db.Column("month", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine) 
class Edited_line(db.Model):
        __table__ = db.Table('Edited_line', MetaData(),db.Column("month", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine) 
class Created_point(db.Model):
        __table__ = db.Table('Created_point', MetaData(),db.Column("month", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)                                                                                     
class Edited_point(db.Model):
        __table__ = db.Table('Edited_point', MetaData(),db.Column("month", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)       
class Created_polygon(db.Model):
        __table__ = db.Table('Created_polygon', MetaData(),db.Column("month", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine) 
class Edited_poligon(db.Model):
        __table__ = db.Table('Edited_poligon', MetaData(),db.Column("month", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)                                                             
class User_classification(db.Model):
        __table__ = db.Table('User_classification', MetaData(),db.Column("senior_mappers", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)
class Invalid_polygon(db.Model):
        __table__ = db.Table('Invalid_polygon', MetaData(),db.Column("generate_series", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)
class poly_by_mounth(db.Model):
        __table__ = db.Table('total_poly_by_mounth', MetaData(),db.Column("generate_series", db.Integer, primary_key=True),
                      autoload=True, autoload_with=db.engine)

