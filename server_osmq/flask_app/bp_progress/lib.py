import os
import io
from datetime import datetime
from flask_babel import lazy_gettext as _l, gettext as _
from flask_app.models import EtatAvancement, Commune
from sqlalchemy import func, cast, FLOAT, INTEGER, text, text, or_, desc
from flask_app.extentions import db
from flask import current_app
import xlsxwriter
import json
import uuid
import mimetypes
from flask_app import consts, extentions, models
from flask_app import flask_uploads
from flask import abort
from sqlalchemy.schema import Sequence
from ..models import EtatAvancement


def add_etat_commune(etat_commune=None, pk_commune=None, status="Submitted"):
    record = EtatAvancement()

    record.pk_commune = pk_commune
    record.status = status
    record.nbEspPubRec = etat_commune.get("nbEspPubRec")
    record.nbEspPubBapt = etat_commune.get("nbEspPubBapt")
    record.nbEspPubNonBapt = etat_commune.get("nbEspPubNonBapt")
    record.nbBapProp = etat_commune.get("nbBapProp")
    record.nbRueBoulVois = etat_commune.get("nbRueBoulVois")
    record.nbCiteAglo = etat_commune.get("nbCiteAglo")
    record.nbJardPlace = etat_commune.get("nbJardPlace")
    record.nbMonumHist = etat_commune.get("nbMonumHist")
    record.nbInstImmo = etat_commune.get("nbInstImmo")
    record.nbAutre = etat_commune.get("nbAutre")
    record.nbPlaqNomPrevParComm = etat_commune.get("nbPlaqNomPrevParComm")
    record.nbPlaqNomNonInst = etat_commune.get("nbPlaqNomNonInst")
    record.nbPlaqNomInst = etat_commune.get("nbPlaqNomInst")
    record.entrPlaqNomFab = etat_commune.get("entrPlaqNomFab")
    record.entrPlaqNomInst = etat_commune.get("entrPlaqNomInst")
    record.nbPlaqNumPrevParComm = etat_commune.get("nbPlaqNumPrevParComm")
    record.nbPlaqNumNonInst = etat_commune.get("nbPlaqNumNonInst")
    record.nbPlaqNumInst = etat_commune.get("nbPlaqNumInst")
    record.entrPlaqNumFab = etat_commune.get("entrPlaqNumFab")
    record.entrPlaqNumInst = etat_commune.get("entrPlaqNumInst")

    extentions.db.session.add(record)
    extentions.db.session.commit()


def generate_excel_national():

    query = get_progress_aggr_query()
    query = query.group_by(Commune.wilaya, Commune.code_wilaya)
    
    data = query.all()

    str_date = datetime.now().strftime("%d/%m/%Y-%H:%M")

    return generate_excel(
        data=data, title_in_excel='الوضعية الحالية لعملية العنونة عبر الولايات موقوفة إلى غاية : \n' + str_date,
        type_of_excel="national")


def generate_excel_wilaya(code_wilaya):
    query = get_progress_query()
    query = query.distinct(EtatAvancement.pk_commune)\
        .order_by(EtatAvancement.pk_commune.asc(), EtatAvancement.date.desc())

    if code_wilaya != "00":
        query = query.filter(Commune.code_wilaya == code_wilaya)

    data = query.all()
    wilaya_name = db.session.query(Commune.wilaya).filter(
        Commune.code_wilaya == code_wilaya).first()

    if hasattr(wilaya_name, "wilaya"):
        wilaya_name = wilaya_name.wilaya
    else:
        wilaya_name = ""

    str_date = datetime.now().strftime("%d/%m/%Y-%H:%M:%S")

    if code_wilaya == "00":
        title_in_excel = _("actual_stats_per_commune") + \
            " لكل الجزائر " + _("date_to") + "\n" + str_date
    else:
        title_in_excel = _("actual_stats_per_commune") + " لولاية " + \
            wilaya_name + " " + _("date_to") + "\n" + str_date

    return generate_excel(
        data=data, title_in_excel=title_in_excel, type_of_excel="commune")


def generate_excel(data, title_in_excel, type_of_excel):
    # JUST FOR TRANSALATION
    _("pk_commune_excel")
    _("commune_excel")
    _("code_wilaya_excel")
    _("wilaya_excel")
    _("sum_BapValide_excel")
    _("sum_bat_before_after_excel")
    _("nbEspPubRec_excel")
    _("nbEspPubBapt_excel")
    _("nbEspPubNonBapt_excel")
    _("nbBapProp_excel")
    _("nbPlaqNomNonInst_excel")
    _("nbPlaqNomInst_excel")
    _("nbPlaqNumPrevParComm_excel")
    _("nbPlaqNomPrevParComm_excel")
    _("nbPlaqNumNonInst_excel")
    _("nbPlaqNumInst_excel")
    _("date_excel")
    output = io.BytesIO()
    workbook = xlsxwriter.Workbook(output, {'in_memory': True})
    header_format = workbook.add_format({
        'align':    'center',
        'valign':   'vcenter',
        'fg_color': '#D9DDDC',
        'text_wrap': True,
        'reading_order': 2,
        'border': True
    })
    white_row = workbook.add_format({
        'align':    'center',
        'valign':   'vcenter',
        'text_wrap': True,
        'border': True,
        'reading_order': 2,
    })
    gray_row = workbook.add_format({'align':    'center',
                                    'valign':   'vcenter',
                                    'text_wrap': True,
                                    'bg_color': '#CCCCCC',
                                    'border': True,
                                    'reading_order': 2, })

    worksheet = workbook.add_worksheet()
    worksheet.set_margins(left=0.4, right=0.4, top=0.4, bottom=0.4)
    worksheet.set_landscape()
    worksheet.set_paper(9)
    worksheet.fit_to_pages(1, 0)
    worksheet.right_to_left()
    worksheet.set_column('A:N', 10)

    # THE TITLE
    worksheet.set_row(0, 70)
    merge_format = workbook.add_format({
        'bold': 1,
        'border': 1,
        'align': 'center',
        'valign': 'vcenter',
        'reading_order': 2,
        'text_wrap': True,
        'font_size': 13})
    worksheet.merge_range('A1:N1', title_in_excel, merge_format)
    worksheet.merge_range('A2:H2', "عملية تسمية الفضاءات العمومية و الاهلة بالسكان", merge_format)
    worksheet.merge_range('I2:N2', "عملية الترقيم و تركيب اللوحات", merge_format)

    if len(data) > 0:
        j = 0
        if type_of_excel == "national":
            worksheet.write(2, j, _("code_wilaya" + "_excel"), header_format)
            j= j+1
        else:
            worksheet.write(2, j, _("pk_commune" + "_excel"), header_format)
            j= j+1
        if type_of_excel == "national":
            worksheet.write(2, j, _("wilaya" + "_excel"), header_format)
            j= j+1
        else:
            worksheet.write(2, j, _("commune" + "_excel"), header_format)
            j= j+1  
        worksheet.write(2, j, _("nbEspPubRec" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbEspPubBapt" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbEspPubNonBapt" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbBapProp" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("sum_BapValide" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("sum_bat_before_after" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbPlaqNomPrevParComm" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbPlaqNomNonInst" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbPlaqNomInst" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbPlaqNumPrevParComm" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbPlaqNumNonInst" + "_excel"), header_format)
        j= j+1
        worksheet.write(2, j, _("nbPlaqNumInst" + "_excel"), header_format)
        j= j+1

        i = 2
        j_start = 0
        for row in data:
            i = i+1
            if i % 2 == 0:
                style = white_row
            else:
                style = gray_row
            j = j_start
            if type_of_excel == "national":
                worksheet.write(i, j, row.code_wilaya, header_format)
                j = j + 1
            else:
                worksheet.write(i, j, row.pk_commune, header_format)
                j = j + 1
            if type_of_excel == "national":
                worksheet.write(i, j, row.wilaya,  style)
                j = j + 1
            else:
                worksheet.write(i, j, row.commune,  style)
                j = j + 1
            worksheet.write(i, j, row.nbEspPubRec,  style)
            j = j + 1
            worksheet.write(i, j, row.nbEspPubBapt,  style)
            j = j + 1
            worksheet.write(i, j, row.nbEspPubNonBapt,  style)
            j = j + 1
            worksheet.write(i, j, row.nbBapProp,  style)
            j = j + 1
            worksheet.write(i, j, row.sum_BapValide,  style)
            j = j + 1
            worksheet.write(i, j, row.sum_bat_before_after,  style)
            j = j + 1
            worksheet.write(i, j, row.nbPlaqNomPrevParComm,  style)
            j = j + 1
            worksheet.write(i, j, row.nbPlaqNomNonInst,  style)
            j = j + 1
            worksheet.write(i, j, row.nbPlaqNomInst,  style)
            j = j + 1
            worksheet.write(i, j, row.nbPlaqNumPrevParComm,  style)
            j = j + 1
            worksheet.write(i, j, row.nbPlaqNumNonInst,  style)
            j = j + 1
            worksheet.write(i, j, row.nbPlaqNumInst,  style)
            j = j + 1


    workbook.close()
    output.seek(0)
    return output


def get_latest_detail(code_wilaya="00", pk_commune=""):
    query = get_progress_aggr_query()
    # query = query.filter(Commune.pk == "3106")
    if pk_commune != "":
        query = query.filter(Commune.pk == pk_commune)
    elif code_wilaya != "00":
        query = query.filter(Commune.code_wilaya == code_wilaya).group_by(
            Commune.wilaya, Commune.code_wilaya)
    etatAvancement = query.first()
    return etatAvancement


def get_progress_query ():
    query = db.session.query(
        Commune.code_wilaya.label("code_wilaya"),
        Commune.wilaya.label("wilaya"),
        Commune.commune.label("commune"),
        Commune.pk.label("pk_commune"),
        EtatAvancement.pk.label("pk"),
        EtatAvancement.nbEspPubRec.label("nbEspPubRec"),
        EtatAvancement.nbEspPubBapt.label("nbEspPubBapt"),
        EtatAvancement.nbEspPubNonBapt.label("nbEspPubNonBapt"),
        EtatAvancement.nbBapProp.label("nbBapProp"),
        EtatAvancement.nbRueBoulVois.label("nbRueBoulVois"),
        EtatAvancement.nbCiteAglo.label("nbCiteAglo"),
        EtatAvancement.nbJardPlace.label("nbJardPlace"),
        EtatAvancement.nbMonumHist.label("nbMonumHist"),
        EtatAvancement.nbInstImmo.label("nbInstImmo"),
        EtatAvancement.nbAutre.label("nbAutre"),
        EtatAvancement.nbPlaqNomPrevParComm.label(
            "nbPlaqNomPrevParComm"),
        EtatAvancement.nbPlaqNomNonInst.label("nbPlaqNomNonInst"),
        EtatAvancement.nbPlaqNomInst.label("nbPlaqNomInst"),
        EtatAvancement.entrPlaqNomFab.label("entrPlaqNomFab"),
        EtatAvancement.entrPlaqNomInst.label("entrPlaqNomInst"),
        EtatAvancement.nbPlaqNumPrevParComm.label(
            "nbPlaqNumPrevParComm"),
        EtatAvancement.nbPlaqNumNonInst.label("nbPlaqNumNonInst"),
        EtatAvancement.nbPlaqNumInst.label("nbPlaqNumInst"),
        EtatAvancement.entrPlaqNumFab.label("entrPlaqNumFab"),
        EtatAvancement.entrPlaqNumInst.label("entrPlaqNumInst"),
        EtatAvancement.date.label("date"),
        models.sum_BapValide,
        models.perc_BapValide,
        models.sum_bat_before_after,
        models.perc_bat,
        models.perc_PlaqNomInst,
        models.perc_PlaqNumInst
    ).join(Commune)
    return query


def get_progress_aggr_query () :
    subquery = db.session.query(EtatAvancement).distinct(EtatAvancement.pk_commune)\
        .order_by(EtatAvancement.pk_commune.asc(), EtatAvancement.date.desc()).subquery()

    query = db.session.query(
        func.max(Commune.code_wilaya).label("code_wilaya"),
        func.max(Commune.wilaya).label("wilaya"),
        func.max(subquery.c.date).label("date"),
        func.sum(subquery.c.nbEspPubRec).label("nbEspPubRec"),
        func.sum(subquery.c.nbEspPubBapt).label("nbEspPubBapt"),
        func.sum(subquery.c.nbEspPubNonBapt).label("nbEspPubNonBapt"),
        func.sum(subquery.c.nbBapProp).label("nbBapProp"),
        func.sum(subquery.c.nbRueBoulVois).label("nbRueBoulVois"),
        func.sum(subquery.c.nbCiteAglo).label("nbCiteAglo"),
        func.sum(subquery.c.nbJardPlace).label("nbJardPlace"),
        func.sum(subquery.c.nbMonumHist).label("nbMonumHist"),
        func.sum(subquery.c.nbInstImmo).label("nbInstImmo"),
        func.sum(subquery.c.nbAutre).label("nbAutre"),
        # 11
        cast(func.sum(subquery.c.nbRueBoulVois + subquery.c.nbCiteAglo + subquery.c.nbJardPlace + subquery.c.nbMonumHist
                      + subquery.c.nbInstImmo + subquery.c.nbAutre), INTEGER).label("sum_BapValide"),
        # 12
        func.coalesce(cast((cast(func.sum(subquery.c.nbRueBoulVois + subquery.c.nbCiteAglo + subquery.c.nbJardPlace + subquery.c.nbMonumHist
                                          + subquery.c.nbInstImmo + subquery.c.nbAutre), FLOAT) / 
                                          func.nullif(cast(func.sum(subquery.c.nbEspPubNonBapt), FLOAT) + 
                                          cast(func.sum(subquery.c.nbBapProp), FLOAT) + 
                                          cast(func.sum(subquery.c.nbRueBoulVois + subquery.c.nbCiteAglo + subquery.c.nbJardPlace + subquery.c.nbMonumHist
                                          + subquery.c.nbInstImmo + subquery.c.nbAutre), FLOAT), 0)) * 100, INTEGER), 0).label("perc_BapValide"),
        # 13
        cast(func.sum(subquery.c.nbEspPubBapt + subquery.c.nbRueBoulVois + subquery.c.nbCiteAglo + subquery.c.nbJardPlace + subquery.c.nbMonumHist
                      + subquery.c.nbInstImmo + subquery.c.nbAutre), INTEGER).label("sum_bat_before_after"),
        # 14
        func.coalesce(cast(((cast(func.sum(subquery.c.nbRueBoulVois + subquery.c.nbCiteAglo + subquery.c.nbJardPlace + subquery.c.nbMonumHist
                                           + subquery.c.nbInstImmo + subquery.c.nbAutre), FLOAT) +
                             cast(func.sum(subquery.c.nbEspPubBapt), FLOAT)) /
                            func.nullif(cast(func.sum(subquery.c.nbEspPubRec), FLOAT), 0)) * 100, INTEGER), 0).label("perc_bat"),
        # 18
        func.coalesce(cast((func.sum(cast(subquery.c.nbPlaqNomInst, FLOAT)) / 
              func.nullif(func.sum(cast(subquery.c.nbPlaqNomPrevParComm, FLOAT) + cast(subquery.c.nbPlaqNomNonInst, FLOAT) + cast(subquery.c.nbPlaqNomInst, FLOAT)),0)) * 100, INTEGER), 0).label("perc_PlaqNomInst"),
        # 23
        func.coalesce(cast((func.sum(cast(subquery.c.nbPlaqNumInst, FLOAT)) /
              func.nullif(func.sum(cast(subquery.c.nbPlaqNumPrevParComm, FLOAT) + cast(subquery.c.nbPlaqNumNonInst, FLOAT) +cast(subquery.c.nbPlaqNumInst, FLOAT)),0)) * 100, INTEGER), 0).label("perc_PlaqNumInst"),

        func.sum(subquery.c.nbPlaqNomPrevParComm).label("nbPlaqNomPrevParComm"),
        func.sum(subquery.c.nbPlaqNomNonInst).label("nbPlaqNomNonInst"),
        func.sum(subquery.c.nbPlaqNomInst).label("nbPlaqNomInst"),
        func.sum(subquery.c.nbPlaqNumPrevParComm).label("nbPlaqNumPrevParComm"),
        func.sum(subquery.c.nbPlaqNumNonInst).label("nbPlaqNumNonInst"),
        func.sum(subquery.c.nbPlaqNumInst).label("nbPlaqNumInst"),
    ).join(Commune)

    return query


def get_progress_all_wilayas_query () :

    query = get_progress_aggr_query()
    query = query.group_by(Commune.wilaya, Commune.code_wilaya)

    return query


def get_progress_all_communes_query (code_wilaya):
    
    query = get_progress_query()
    query = query.distinct(EtatAvancement.pk_commune)\
        .order_by(EtatAvancement.pk_commune.asc(), EtatAvancement.date.desc())
    
    if code_wilaya != "00":
        query = query.filter(Commune.code_wilaya == code_wilaya)
    
    return query