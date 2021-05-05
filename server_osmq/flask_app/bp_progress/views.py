import json
from datetime import datetime
from flask import render_template, request, flash, redirect, url_for, jsonify, make_response, abort, send_file
from flask_paginate import Pagination, get_page_parameter
from flask_app.extentions import db
from sqlalchemy import func, cast, FLOAT, INTEGER, text, text, or_, desc
from flask_security import login_required, roles_required, current_user, roles_accepted
from . import bp_progress
from flask_app import consts, models
from flask_app.models import EtatAvancement, Commune
from .lib import add_etat_commune, get_progress_query, get_progress_all_wilayas_query, get_progress_all_communes_query, generate_excel_national, generate_excel_wilaya, get_latest_detail
from flask_babel import lazy_gettext as _l, gettext as _
from flask_app.lib import check_licence
from .forms import AjoutEtatAvancement
from ..models import EtatAvancement
from geoalchemy2 import Geometry
from geoalchemy2.functions import ST_Centroid
from geoalchemy2 import functions

@bp_progress.route('/national/actual', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL)
def wilaya_situation():
    # TODO test performance of this query and optimize using indexes
    # SELECT commune.wilaya AS commune_wilaya, CAST(((CAST(sum(anon_1."nbRueBoulVois" + anon_1."nbCiteAglo" + anon_1."nbJardPlace" + anon_1."nbMonumHist" + anon_1."nbInstImmo" + anon_1."nbAutre") AS FLOAT) + CAST(sum(anon_1."nbEspPubBapt") AS FLOAT)) / CAST(sum(anon_1."nbEspPubRec") AS FLOAT)) * 100 AS INTEGER) AS perc_bat, CAST((CAST(sum(anon_1."nbRueBoulVois" + anon_1."nbCiteAglo" + anon_1."nbJardPlace" + anon_1."nbMonumHist" + anon_1."nbInstImmo" + anon_1."nbAutre") AS FLOAT) / CAST(sum(anon_1."nbBapProp") AS FLOAT)) * 100 AS INTEGER) AS "perc_BapValide", CAST((sum(CAST(anon_1."nbPlaqNomInst" AS
    # FLOAT)) / sum(CAST(anon_1."nbPlaqNomPrevParComm" AS FLOAT))) * 100 AS INTEGER) AS "perc_PlaqNomInst", sum(anon_1."nbEspPubRec") AS "sum_nbEspPubRec", sum(anon_1."nbEspPubBapt") AS "sum_nbEspPubBapt", sum(anon_1."nbEspPubNonBapt") AS "sum_nbEspPubNonBapt", sum(anon_1."nbBapProp") AS "sum_nbBapProp"
    # FROM (SELECT DISTINCT ON (etat_avancement.pk_commune, etat_avancement.date) etat_avancement.pk AS pk, etat_avancement."nbEspPubRec" AS "nbEspPubRec", etat_avancement."nbEspPubBapt" AS "nbEspPubBapt", etat_avancement."nbEspPubNonBapt" AS "nbEspPubNonBapt", etat_avancement."nbBapProp" AS "nbBapProp", etat_avancement."nbRueBoulVois" AS "nbRueBoulVois", etat_avancement."nbCiteAglo" AS "nbCiteAglo", etat_avancement."nbJardPlace" AS "nbJardPlace", etat_avancement."nbMonumHist" AS "nbMonumHist", etat_avancement."nbInstImmo" AS "nbInstImmo", etat_avancement."nbAutre" AS "nbAutre", etat_avancement."nbPlaqNomPrevParComm" AS "nbPlaqNomPrevParComm", etat_avancement."nbPlaqNomNonInst" AS "nbPlaqNomNonInst", etat_avancement."nbPlaqNomInst" AS "nbPlaqNomInst", etat_avancement."entrPlaqNomFab" AS "entrPlaqNomFab", etat_avancement."entrPlaqNomInst" AS "entrPlaqNomInst", etat_avancement."nbPlaqNumPrevParComm" AS "nbPlaqNumPrevParComm", etat_avancement."nbPlaqNumNonInst" AS "nbPlaqNumNonInst", etat_avancement."nbPlaqNumInst" AS "nbPlaqNumInst", etat_avancement."entrPlaqNumFab" AS
    # "entrPlaqNumFab", etat_avancement."entrPlaqNumInst" AS "entrPlaqNumInst", etat_avancement.date AS date, etat_avancement.status AS status, etat_avancement.pk_commune AS pk_commune
    # FROM etat_avancement ORDER BY etat_avancement.pk_commune ASC, etat_avancement.date DESC) AS anon_1 JOIN commune ON commune.pk = anon_1.pk_commune GROUP BY commune.wilaya

    query = get_progress_all_wilayas_query()

    sort = request.args.get("sort", type=str, default="")
    direction = request.args.get("dir", type=str, default="asc")
    q = request.args.get("q", type=str, default="")
    if q != "":
        query = query.filter(Commune.wilaya.ilike("%" + q + "%"))
    if sort != "":
        query = query.order_by(text("\""+sort + "\"" + " " + direction))

    per_page = 10
    page = request.args.get(get_page_parameter(), type=int, default=1)
    pagination = query.paginate(page=page, per_page=per_page)
    pagination_temp = Pagination(page=page, per_page=per_page, total=pagination.total, search=False,
                                 bs_version="4")

    return render_template('progress/national.html', stats_by_wilaya=pagination.items, rows=pagination.items,
                           pagination=pagination_temp, dir=direction, sort=sort, q=q)


@bp_progress.route('/wilaya/actual', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL, consts.ROLE_WILAYA)
def commune_situation():

    if current_user.has_role(consts.ROLE_WILAYA):
        code_wilaya = current_user.affectation.code_wilaya
    else:
        code_wilaya = request.args.get("code_wilaya", type=str, default="00")

    query = get_progress_all_communes_query (code_wilaya)
    
    sort = request.args.get("sort", type=str, default="")
    direction = request.args.get("dir", type=str, default="asc")
    q = request.args.get("q", type=str, default="")
    if q != "":
        query = query.filter(Commune.commune.ilike("%" + q + "%"))
    if sort != "":
        s = query.subquery()
        query = db.session.query(s).order_by(
            text("\""+sort + "\"" + " " + direction))

    # return "dfdff"
    per_page = 10
    page = request.args.get(get_page_parameter(), type=int, default=1)
    pagination = query.paginate(page=page, per_page=per_page)
    pagination_temp = Pagination(page=page, per_page=per_page, total=pagination.total, search=False,
                                 bs_version="4")

    wilaya_list = db.session.query(Commune.code_wilaya, Commune.wilaya).distinct(
        Commune.code_wilaya).order_by(Commune.code_wilaya).all()
    return render_template('progress/wilaya.html', stats_by_commune=pagination.items, rows=pagination.items,
                           pagination=pagination_temp, dir=direction, sort=sort, q=q, code_wilaya=code_wilaya, wilaya_list=wilaya_list)


@bp_progress.route('/detail/<pk>', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL, consts.ROLE_WILAYA, consts.ROLE_COMMUNE)
def commune_etat_detail(pk=None):
    etatAvancement = get_progress_query()
    etatAvancement = etatAvancement.filter(EtatAvancement.pk == pk)

    if current_user.has_role(consts.ROLE_COMMUNE):
        etatAvancement = etatAvancement.filter(
            Commune.pk == current_user.affectation.pk)
    elif current_user.has_role(consts.ROLE_WILAYA):
        etatAvancement = etatAvancement.filter(
            Commune.code_wilaya == current_user.affectation.code_wilaya)
    etatAvancement = etatAvancement.first()
    if not etatAvancement:
        abort(404)

    history = request.args.get("history", type=str, default="false")
    return render_template('progress/detail.html', obj=etatAvancement, history=history)


@bp_progress.route('/national/detail/<code_wilaya>', methods=['GET'])
@bp_progress.route('/national/detail/', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL, consts.ROLE_WILAYA)
def wilaya_etat_detail(code_wilaya="00"):

    if current_user.has_role(consts.ROLE_WILAYA):
        code_wilaya = current_user.affectation.code_wilaya

    etatAvancement = get_latest_detail(code_wilaya)
    return render_template('progress/detail.html', obj=etatAvancement, code_wilaya=code_wilaya)


@bp_progress.route('/add', methods=['GET', 'POST'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE)
def addProgress():

    old_data = EtatAvancement.query.filter(
        EtatAvancement.pk_commune == current_user.affectation_id).order_by(desc(EtatAvancement.date)).first()

    form = AjoutEtatAvancement()

    if request.method == 'POST':
        if form.validate():

            add_etat_commune(form.data, current_user.affectation_id)
            flash(_("تمت إضافة الإحصائيات بنجاح."), 'success')
            return redirect(url_for("bp_dashboard.dashboard"))
        else:
            flash(_("لم تتم العملية، يرجى التحقق من البيانات."), "danger")
            return render_template('progress/add.html', form=form, old_data=old_data)
    else:
        return render_template('progress/add.html', form=form, old_data=old_data)


@bp_progress.route('/report/national', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL)
def excel_national():
    fn = generate_excel_national()
    str_date = datetime.now().strftime("%d_%m_%Y_%H_%M")
    return send_file(fn, as_attachment=True, attachment_filename="rapport_national_" + str_date + ".xlsx", mimetype='application/vnd.ms-excel')


@bp_progress.route('/report/wilaya/', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL, consts.ROLE_WILAYA)
def excel_wilaya():
    if current_user.has_role(consts.ROLE_WILAYA):
        code_wilaya = current_user.affectation.code_wilaya
    else:
        code_wilaya = request.args.get("code_wilaya", type=str, default="00")
    return_data = generate_excel_wilaya(code_wilaya)
    str_date = datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
    return send_file(return_data, as_attachment=True, attachment_filename="rapport_wilaya_" + str_date + ".xlsx", mimetype='application/vnd.ms-excel')


@bp_progress.route('/stats', methods=['GET', 'POST'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE, consts.ROLE_WILAYA, consts.ROLE_NATIONAL)
def commune_prev_stats():

    query = get_progress_query()
    query = query.order_by(EtatAvancement.pk_commune.asc(), EtatAvancement.date.desc())

    if current_user.has_role(consts.ROLE_COMMUNE):
        query = query.filter(Commune.pk == current_user.affectation.pk)

    elif current_user.has_role(consts.ROLE_WILAYA):
        query = query.filter(Commune.code_wilaya ==
                             current_user.affectation.code_wilaya)

    sort = request.args.get("sort", type=str, default="")
    direction = request.args.get("dir", type=str, default="asc")
    q = request.args.get("q", type=str, default="")
    if q != "":
        query = query.filter(Commune.commune.ilike("%" + q + "%"))
    if sort != "":
        s = query.subquery()
        query = db.session.query(s).order_by(
            text("\""+sort + "\"" + " " + direction))

    # return "dfdff"
    per_page = 10
    page = request.args.get(get_page_parameter(), type=int, default=1)
    pagination = query.paginate(page=page, per_page=per_page)
    pagination_temp = Pagination(page=page, per_page=per_page, total=pagination.total, search=False,
                                 bs_version="4")

    return render_template('progress/previous.html', stats_by_commune=pagination.items, rows=pagination.items,
                           pagination=pagination_temp, dir=direction, sort=sort, q=q)


@bp_progress.route('/map_stats', methods=['GET', 'POST'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL)
def map_stats():

    query_commune = db.session.query(
        Commune.commune.label("commune"),
        functions.ST_X(ST_Centroid(Commune.geomnorm)),
        functions.ST_Y(ST_Centroid(Commune.geomnorm)),
        Commune.pk.label("pk_commune"),
        models.sum_BapValide,
        EtatAvancement.nbBapProp.label("nbBapProp"),
        EtatAvancement.nbEspPubNonBapt.label("nbEspPubNonBapt"),
    )\
        .distinct(EtatAvancement.pk_commune)\
        .join(Commune).order_by(EtatAvancement.pk_commune.asc(), EtatAvancement.date.desc())

    
    donnes_commune = query_commune.all()

    subquery = db.session.query(EtatAvancement).distinct(EtatAvancement.pk_commune)\
        .order_by(EtatAvancement.pk_commune.asc(), EtatAvancement.date.desc()).subquery()

    query_wilaya = db.session.query(
        Commune.wilaya,
        cast(func.sum(functions.ST_X(ST_Centroid(Commune.geomnorm))) / func.count(Commune.geomnorm), FLOAT).label("x"),
        cast(func.sum(functions.ST_Y(ST_Centroid(Commune.geomnorm))) / func.count(Commune.geomnorm), FLOAT).label("y"),
        Commune.code_wilaya,
        cast(func.sum(subquery.c.nbRueBoulVois + subquery.c.nbCiteAglo + subquery.c.nbJardPlace + subquery.c.nbMonumHist
            + subquery.c.nbInstImmo + subquery.c.nbAutre), INTEGER).label("sum_BapValide"),
        func.sum(subquery.c.nbBapProp).label("sum_nbBapProp"),
        func.sum(subquery.c.nbEspPubNonBapt).label("sum_nbEspPubNonBapt"),
    ).join(Commune).group_by(Commune.wilaya, Commune.code_wilaya)

    donnes_wilaya = query_wilaya.all()

    return render_template('progress/stats_map.html', donnes_commune=donnes_commune ,donnes_wilaya=donnes_wilaya)