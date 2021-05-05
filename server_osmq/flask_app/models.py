import enum
import inspect
from json import JSONEncoder
import sqlalchemy
from sqlalchemy.types import TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy import func, cast, FLOAT, INTEGER, text
from geoalchemy2 import Geometry
from flask import current_app
from flask_security import UserMixin, RoleMixin
from flask_app.extentions import db
from flask_app import consts

from flask_app.postgresql_audit.flask import versioning_manager
versioning_manager.init(db.Model)


class Commune(db.Model):
    __versioned__ = {}
    pk = db.Column(db.String, primary_key=True)
    code_commune = db.Column(db.String)
    commune = db.Column(db.String)
    code_wilaya = db.Column(db.String)
    wilaya = db.Column(db.String)
    geomnorm = db.Column(Geometry())
    geombuff = db.Column(Geometry())
    type = db.Column(db.String)
    decision_number = db.relationship(
        "DecisionCommune", backref=db.backref('Commune'), uselist=False)


class DecisionCommune(db.Model):
    __versioned__ = {}
    pk_commune = db.Column(db.String, db.ForeignKey(
        Commune.pk), primary_key=True)
    nb_decision = db.Column(db.Integer)


class AddressComponentValue():
    value = {}
    type_addressComponentValue = consts.ENUM_AddressComponentValueType.DEFAULT_VALUE
    preferenceLevel = 0
    locale = consts.PRINCIPALE_LANGUAGE

    def __init__(self, value, type_addressComponentValue=consts.ENUM_AddressComponentValueType.DEFAULT_VALUE,
                 preferenceLevel=0, locale=consts.PRINCIPALE_LANGUAGE):
        self.value = value
        self.type_addressComponentValue = type_addressComponentValue.name if inspect.isclass(
            type_addressComponentValue) and issubclass(type_addressComponentValue, enum.Enum) else type_addressComponentValue
        self.preferenceLevel = preferenceLevel
        self.locale = locale


roles_users = db.Table('roles_users',
                       db.Column('user_id', db.Integer(),
                                 db.ForeignKey('user.id'), primary_key=True),
                       db.Column('role_id', db.Integer(), db.ForeignKey('role.id'), primary_key=True))


class Role(db.Model, RoleMixin):
    __versioned__ = {}
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))


class User(db.Model, UserMixin):
    __tablename__ = 'user'
    __versioned__ = {}
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean(), default=True)
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('User', lazy='dynamic'))
    decisions = db.relationship("Decision", back_populates="creator")
    affectation_id = db.Column(
        db.String, db.ForeignKey('commune.pk'))
    affectation = db.relationship("Commune")
    api_key = db.Column(UUID(as_uuid=True), index=True,
                        unique=True, server_default=sqlalchemy.text("uuid_generate_v4()"),)


class Decision (db.Model):
    __tablename__ = 'decision'
    __versioned__ = {}
    pk = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.String, index=True, unique=True)
    numero_a_debatise = db.Column(db.String, db.ForeignKey('decision.numero'))
    decision_a_debatise = db.relationship("Decision", backref=db.backref(
        "debatisation", uselist=False), remote_side=numero, uselist=False)
    date = db.Column(db.Date)
    decision_type = db.Column(
        db.String)  # db.Enum(consts.ENUM_DECISION_TYPE, native_enum=False))
    component_type = db.Column(
        db.String)  # db.Enum(consts.ENUM_ComponentType, native_enum=False))
    valueInformation = db.Column(JSONB)  # array of AddressComponentValue class
    created_at = db.Column(TIMESTAMP, default=func.now())
    scan_decision_name = db.Column(db.String, default=None, nullable=True)
    # db.Enum(consts.ENUM_DECISION_STATUS, native_enum=False))
    status = db.Column(db.String)

    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    creator = db.relationship("User", back_populates="decisions")
    addressComponent_id = db.Column(
        db.Integer, db.ForeignKey('address_component.id'))
    addressComponent = db.relationship(
        "AddressComponent", back_populates="decisions")
    pk_commune = db.Column(db.String, db.ForeignKey('commune.pk'))
    commune = db.relationship("Commune")
    view_time = db.Column(TIMESTAMP, default=func.now())
    validator_id = db.Column(db.Integer)


class AddressComponent (db.Model):
    __tablename__ = 'address_component'
    __versioned__ = {}
    pk = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.Integer, unique=True)
    component_type = db.Column(
        db.String)  # db.Enum(consts.ENUM_ComponentType, native_enum=False))
    valueInformation = db.Column(JSONB)  # array of AddressComponentValue class
    # locale = db.Column(db.String) # db.Enum(consts.ENUM_ComponentType, native_enum=False))

    validFrom = db.Column(db.Date)
    validTo = db.Column(db.Date)
    openRecord = db.Column(db.Date)
    closeRecord = db.Column(db.Date)
    version = db.Column(db.SmallInteger)
    lifecycleStage = db.Column(
        db.String)  # db.Enum(consts.ENUM_AddressLifecycleStage, native_enum=False))

    decisions = db.relationship("Decision", back_populates="addressComponent")
    lifespans = db.relationship(
        "LifespanAddressComponent", back_populates="addressComponent")


class LifespanAddressComponent (db.Model):
    __tablename__ = 'lifespan_address_component'
    __versioned__ = {}
    pk = db.Column(db.Integer, primary_key=True)
    component_type = db.Column(
        db.String)  # db.Enum(consts.ENUM_ComponentType, native_enum=False))
    valueInformation = db.Column(JSONB)  # array of AddressComponentValue class
    # db.Enum(consts.ENUM_Locale, native_enum=False))
    locale = db.Column(db.String)

    validFrom = db.Column(db.Date)
    validTo = db.Column(db.Date)
    openRecord = db.Column(db.Date)
    closeRecord = db.Column(db.Date)
    version = db.Column(db.SmallInteger)
    lifecycleStage = db.Column(
        db.String)  # db.Enum(consts.ENUM_AddressLifecycleStage, native_enum=False))

    addressComponent_id = db.Column(
        db.Integer, db.ForeignKey('address_component.id'))
    addressComponent = db.relationship(
        "AddressComponent", back_populates="lifespans")


class ReferenceObject(db.Model):
    __tablename__ = 'reference_object'
    pk = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.Integer, unique=True)
    addressComponent_id = db.Column(
        db.Integer, db.ForeignKey('address_component.id'))
    geoms_uuid = db.Column(
        UUID, db.ForeignKey('geoms.uuid'))


class Geoms(db.Model):
    __tablename__ = 'geoms'
    pk = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID, unique=True)
    data_source = db.Column(db.String)  # ====> consts.ENUM_GEOMS_DATA_SOURCE
    data_type = db.Column(db.String)    # ====> consts.ENUM_GEOMS_DATA_TYPE
    geom_id = db.Column(db.String)
    geom = db.Column(Geometry())


class EtatAvancement(db.Model):
    __tablename__ = 'etat_avancement'
    __versioned__ = {}
    # Premiere section
    pk = db.Column(db.Integer, primary_key=True)
    nbEspPubRec = db.Column(db.Integer)  # 1
    nbEspPubBapt = db.Column(db.Integer)  # 2
    nbEspPubNonBapt = db.Column(db.Integer)  # 3
    nbBapProp = db.Column(db.Integer)  # 4

    # Nombre des baptisations approuvées
    nbRueBoulVois = db.Column(db.Integer)  # 5
    nbCiteAglo = db.Column(db.Integer)  # 6
    nbJardPlace = db.Column(db.Integer)  # 7
    nbMonumHist = db.Column(db.Integer)  # 8
    nbInstImmo = db.Column(db.Integer)  # 9
    nbAutre = db.Column(db.Integer)  # 10

    # Deuxieme section
    # Processus de nomination
    nbPlaqNomPrevParComm = db.Column(
        db.Integer)  # 15
    nbPlaqNomNonInst = db.Column(db.Integer)  # 16
    nbPlaqNomInst = db.Column(db.Integer)  # 17
    entrPlaqNomFab = db.Column(db.String)  # 19
    entrPlaqNomInst = db.Column(db.String)  # 19

    # Processus de numérotation
    nbPlaqNumPrevParComm = db.Column(
        db.Integer)  # 20
    nbPlaqNumNonInst = db.Column(db.Integer)  # 21
    nbPlaqNumInst = db.Column(db.Integer)  # 22
    entrPlaqNumFab = db.Column(db.String)  # 24
    entrPlaqNumInst = db.Column(db.String)  # 24

    date = db.Column(TIMESTAMP, default=func.now())
    status = db.Column(db.String)
    pk_commune = db.Column(db.String, db.ForeignKey('commune.pk'))
    commune = db.relationship("Commune")


# USEFUL COLUMNS FOR EtatAvancement
# 11
sum_BapValide = cast(EtatAvancement.nbRueBoulVois + EtatAvancement.nbCiteAglo
                     + EtatAvancement.nbJardPlace + EtatAvancement.nbMonumHist
                     + EtatAvancement.nbInstImmo
                     + EtatAvancement.nbAutre, INTEGER).label("sum_BapValide")  # 11

# 12
perc_BapValide = func.coalesce(cast(cast(EtatAvancement.nbRueBoulVois + EtatAvancement.nbCiteAglo
                                         + EtatAvancement.nbJardPlace + EtatAvancement.nbMonumHist
                                         + EtatAvancement.nbInstImmo
                                         + EtatAvancement.nbAutre, FLOAT)
                                    / func.nullif(cast(EtatAvancement.nbEspPubNonBapt, FLOAT)
                                                  + cast(EtatAvancement.nbBapProp, FLOAT)
                                                  + cast(EtatAvancement.nbRueBoulVois + EtatAvancement.nbCiteAglo
                                                         + EtatAvancement.nbJardPlace + EtatAvancement.nbMonumHist
                                                         + EtatAvancement.nbInstImmo
                                                         + EtatAvancement.nbAutre, FLOAT), 0) * 100, INTEGER), 0).label("perc_BapValide")  # 12

# 13
sum_bat_before_after = cast(EtatAvancement.nbEspPubBapt +
                            EtatAvancement.nbRueBoulVois + EtatAvancement.nbCiteAglo
                            + EtatAvancement.nbJardPlace + EtatAvancement.nbMonumHist
                            + EtatAvancement.nbInstImmo
                            + EtatAvancement.nbAutre, INTEGER).label("sum_bat_before_after")  # 13

# 14
perc_bat = func.coalesce(cast(cast(EtatAvancement.nbRueBoulVois + EtatAvancement.nbCiteAglo
                                   + EtatAvancement.nbJardPlace + EtatAvancement.nbMonumHist
                                   + EtatAvancement.nbInstImmo + EtatAvancement.nbAutre
                                   + EtatAvancement.nbEspPubBapt, FLOAT) /
                              func.nullif(cast(EtatAvancement.nbEspPubRec, FLOAT), 0) * 100, INTEGER), 0).label("perc_bat")  # 14

# 18
perc_PlaqNomInst = func.coalesce(cast(cast(EtatAvancement.nbPlaqNomInst, FLOAT) /
                                      func.nullif(
                                          cast(EtatAvancement.nbPlaqNomPrevParComm +
                                               EtatAvancement.nbPlaqNomNonInst +
                                               EtatAvancement.nbPlaqNomInst, FLOAT), 0)
                                      * 100, INTEGER), 0).label("perc_PlaqNomInst")  # 18

# 23
perc_PlaqNumInst = func.coalesce(cast(cast(EtatAvancement.nbPlaqNumInst, FLOAT) /
                                      func.nullif(
                                          cast(EtatAvancement.nbPlaqNumPrevParComm +
                                               EtatAvancement.nbPlaqNumInst +
                                               EtatAvancement.nbPlaqNumNonInst, FLOAT), 0)
                                      * 100, INTEGER), 0).label("perc_PlaqNumInst")  # 23
# ============================  CODE LISTS ====================================


class TypeVoie (db.Model):
    __tablename__ = 'type_voie'
    __versioned__ = {}
    pk = db.Column(db.String, primary_key=True)


class TypeOrganisme (db.Model):
    __tablename__ = 'type_organisme'
    __versioned__ = {}
    pk = db.Column(db.String, primary_key=True)


class TypeZone (db.Model):
    __tablename__ = 'type_zone'
    __versioned__ = {}
    pk = db.Column(db.String, primary_key=True)


class TypeLieudit (db.Model):
    __tablename__ = 'type_lieudit'
    __versioned__ = {}
    pk = db.Column(db.String, primary_key=True)


class TypeCite (db.Model):
    __tablename__ = 'type_cite'
    __versioned__ = {}
    pk = db.Column(db.String, primary_key=True)


class user_decision (db.Model):
    __tablename__ = 'user_decision'
    __versioned__ = {}
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey('user.id'))
    decision_id = db.Column(db.Integer, db.ForeignKey('decision.pk'))
    status = db.Column(db.String)
    comment = db.Column(db.String)
