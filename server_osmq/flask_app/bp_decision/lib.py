import json
import uuid
import mimetypes
from flask_app import consts, extentions, models
from flask_app import flask_uploads
from flask import abort
from sqlalchemy.schema import Sequence
from datetime import  datetime,timedelta



def read_standard_json_value_information(valueInformation):
    _type = None
    value_ar = None
    value_fr = None
    if type(valueInformation) == list:
        for elt in valueInformation:
            _type = elt["value"]["type"]
            if elt["locale"] == consts.ENUM_Locale.ARABIC.name:
                value_ar = elt["value"]["name"]
            if elt["locale"] == consts.ENUM_Locale.FRENCH.name:
                value_fr = elt["value"]["name"]

    return {"_type": _type, "value_ar": value_ar, "value_fr": value_fr}


def build_standard_json_value_information(_type, value_fr, value_ar):
    obj = [models.AddressComponentValue(value={"name": value_ar, "type": _type},
                                        type_addressComponentValue=consts.ENUM_AddressComponentValueType.DEFAULT_VALUE.name,
                                        preferenceLevel=0, locale=consts.ENUM_Locale.ARABIC.name)]

    if value_fr:
        obj.append(
            models.AddressComponentValue(value={"name": value_fr, "type": _type},
                                         type_addressComponentValue=consts.ENUM_AddressComponentValueType.LOCALE_ALTERNATIVE.name,
                                         preferenceLevel=1, locale=consts.ENUM_Locale.FRENCH.name))

    return obj


def add_decision(
        numero=None,
        numero_a_debatise=None,
        date=None,
        decision_type=None,
        component_type=None,
        valueInformation=None,
        upload=None,
        creator=None,
        commune=None,
        status=consts.ENUM_DECISION_STATUS.SUBMITTED.name):

    db_decision = models.Decision()
    if upload != None and upload.filename != "":
        filename = str(uuid.uuid4())
        mime_type = upload.content_type
        ext = mimetypes.guess_extension(mime_type)
        if ext == None:
            raise flask_uploads.UploadNotAllowed
        filename = extentions.decisionsUploadSet.save(
            upload, folder= commune.pk, name=filename + ext)
        db_decision.scan_decision_name = filename
    db_decision.numero = "".join(numero.split())
    if db_decision.numero == "":
        next_numero = extentions.db.session.execute(Sequence("non_pv_decision_seq"))
        db_decision.numero = "nd-" + str(next_numero)
    db_decision.date = None if date == "" else date
    db_decision.decision_type = decision_type
    serilized_value_information = None
    if type(valueInformation) is list:
        serilized_value_information = []
        for elt in valueInformation:
            serilized_value_information.append(elt.__dict__)
    else:
        serilized_value_information = valueInformation
    if decision_type == consts.ENUM_DECISION_TYPE.BATISATION.name:
        db_decision.valueInformation = serilized_value_information
        db_decision.component_type = component_type
    elif decision_type == consts.ENUM_DECISION_TYPE.DEBATISATION.name:
        db_decision.numero_a_debatise = "".join(numero_a_debatise.split())
    db_decision.creator = creator
    db_decision.commune = commune
    db_decision.status = status
    db_decision.view_time=datetime(1962,7,5)
    #models.Decision.query.filter_by(numero = db_decision.numero_a_debatise).first()
    extentions.db.session.add(db_decision)
    extentions.db.session.commit()


def edit_decision(
        db_decision=None,
        numero=None,
        numero_a_debatise=None,
        date=None,
        decision_type=None,
        component_type=None,
        valueInformation=None,
        upload=None,
        delete_file=False,
        status=consts.ENUM_DECISION_STATUS.SUBMITTED.name):
    if db_decision == None:
        abort(404)
    if delete_file == True:
        db_decision.scan_decision_name = None
    if upload != None and upload.filename != "":
        filename = str(uuid.uuid4())
        mime_type = upload.content_type
        ext = mimetypes.guess_extension(mime_type)
        if ext == None:
            raise flask_uploads.UploadNotAllowed
        filename = extentions.decisionsUploadSet.save(
            upload, folder= db_decision.pk_commune, name=filename + ext)
        db_decision.scan_decision_name = filename
    db_decision.numero = "".join(numero.split())
    if numero == "":
        next_numero = extentions.db.session.execute(Sequence("non_pv_decision_seq"))
        db_decision.numero = "nd-" + str(next_numero)
    db_decision.date = None if date == "" else date
    db_decision.decision_type = decision_type
    serilized_value_information = None
    if type(valueInformation) is list:
        serilized_value_information = []
        for elt in valueInformation:
            serilized_value_information.append(elt.__dict__)
    else:
        serilized_value_information = valueInformation
    if decision_type == consts.ENUM_DECISION_TYPE.BATISATION.name:
        db_decision.valueInformation = serilized_value_information
        db_decision.numero_a_debatise = None
        db_decision.component_type = component_type
    elif decision_type == consts.ENUM_DECISION_TYPE.DEBATISATION.name:
        db_decision.numero_a_debatise = "".join(numero_a_debatise.split())
        db_decision.valueInformation = None
        db_decision.component_type = None
    db_decision.status = status
    extentions.db.session.add(db_decision)
    extentions.db.session.commit()

    return db_decision


def is_decision_unique(numero_decision, exclude=None, pk_commune=None):
    if exclude == None:
        exclude = ""
    if numero_decision == "":
        return True

    numero_decision = "".join(numero_decision.split())
    exclude = "".join(exclude.split())
    if numero_decision == exclude:
        return True
    q = models.Decision.query.filter(models.Decision.numero == numero_decision)
    if pk_commune != None:
        q = q.filter_by(pk_commune=pk_commune)
    if q.count() == 0:
        return True
    else:
        return False



def add_decision_commune(nb_decision=None, pk_commune=None):
    decision_commune = models.DecisionCommune(nb_decision=nb_decision, pk_commune=pk_commune)
    extentions.db.session.merge(decision_commune)
    extentions.db.session.commit()

def delete_decision(id):
        
        decision = models.Decision.query.get_or_404(id)
        decision.status=consts.ENUM_DECISION_STATUS.DELETED.name
        extentions.db.session.commit()

def view_time_decision(id,validator=None):
        
        decision = models.Decision.query.get_or_404(id)
        now = datetime.now() 
        decision.view_time=now
        decision.validator_id = validator
        extentions.db.session.commit()

def VALID_decision(id,validator=None):
        
        decision = models.Decision.query.get_or_404(id)
        decision.status=consts.ENUM_DECISION_STATUS.VALID.name
        decision.validator_id= validator
        extentions.db.session.commit()

def TO_MODIFY_decision(id):
        
        decision = models.Decision.query.get_or_404(id)
        decision.status=consts.ENUM_DECISION_STATUS.TO_MODIFY.name
        extentions.db.session.commit()

def validateur_decision(id,validator,choice,comment=None):
        db_user_decision=models.user_decision()
        db_user_decision.user=validator
        db_user_decision.decision_id=id
        db_user_decision.status=choice
        db_user_decision.comment=comment
        extentions.db.session.add(db_user_decision)
        extentions.db.session.commit()
        