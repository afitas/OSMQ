import json
from flask import render_template, request, flash, redirect, url_for, jsonify, make_response
from flask_security import login_required, roles_required, current_user, roles_accepted
from sqlalchemy import text, or_
from flask_app.extentions import db, decisionsUploadSet
from flask_app import consts, models
from flask_paginate import Pagination, get_page_parameter
from flask_security import roles_accepted, current_user
from sqlalchemy import text,asc

from . import bp_decision, forms, lib as decision_lib
from flask_babel import lazy_gettext as _l, gettext as _
from flask_app.lib import check_licence
from ..models import Commune, DecisionCommune, Decision

from .forms import delete_Decision,verify_Decision
from ..models import User
from datetime import  datetime,timedelta


@bp_decision.route('/check_decision_unique', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE)
def check_decision_unique():
    numero_decision = request.args.get('numero')
    exclude = request.args.get('exclude')
    if decision_lib.is_decision_unique(numero_decision, exclude, current_user.affectation_id):
        return "true"
    else:
        return "false"


@bp_decision.route('/detail/<key>', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE, consts.ROLE_NATIONAL, consts.ROLE_VALIDATEUR, consts.ROLE_WILAYA)
def pv_detail(key):
    pv = Decision.query.filter(Decision.numero == key)
    return render_template('decision/detail_pv.html', rows=pv)


@bp_decision.route('/list/<key>', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE, consts.ROLE_NATIONAL, consts.ROLE_VALIDATEUR, consts.ROLE_WILAYA)
def pv(key):
    if key == "soumis":
        if current_user.has_role(consts.ROLE_COMMUNE):
            pv = Decision.query.filter(Decision.status == "SUBMITTED").filter_by(
                creator_id=current_user.id)
        else:
            if current_user.has_role(consts.ROLE_VALIDATEUR):

                pv = Decision.query.filter(Decision.status == "SUBMITTED")
            else:
                pv = Decision.query
            # print("kaddour ", )
            # The sqlalchmey base query

    elif key == "VALID":
        # print("test")
        if current_user.has_role(consts.ROLE_COMMUNE):
            pv = Decision.query.filter(Decision.status == "VALID").filter_by(
                creator_id=current_user.id)
        else:
            if current_user.has_role(consts.ROLE_VALIDATEUR):

                pv = Decision.query.filter(Decision.status == "VALID").filter_by(
                    creator_id=current_user.id)
            else:
                pv = Decision.query

    elif key == "MODIFIER":
        if current_user.has_role(consts.ROLE_COMMUNE):
            pv = Decision.query.filter(Decision.status == "MODIFIER").filter_by(
                creator_id=current_user.id)
        else:
            if current_user.has_role(consts.ROLE_VALIDATEUR):

                pv = Decision.query.filter(Decision.status == "MODIFIER").filter_by(
                    creator_id=current_user.id)
            else:
                pv = Decision.query
    query = pv
    # Config items per page
    per_page = 10
    # The current page number, ex: 2
    page = request.args.get(get_page_parameter(), type=int, default=1)

    # the pagination processing part
    pagination = query.paginate(page=page, per_page=per_page)
    pagination_temp = Pagination(page=page, per_page=per_page, total=pagination.total, search=False,
                                 bs_version="4")
    return render_template('decision/pv_list.html', list=list, rows=pagination.items,
                           pagination=pagination_temp)


@bp_decision.route('/get', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE)
# WARNING it always filter by commune of the current_user
def get():
    numero = request.args.get('numero')
    numero = "".join(numero.split())
    if not numero:
        return jsonify([])

    decision = models.Decision.query.filter_by(numero=numero).filter_by(
        pk_commune=current_user.affectation_id).all()
    if len(decision) != 1:
        return jsonify([])
    decision = decision[0]
    resp = decision_lib.read_standard_json_value_information(
        decision.valueInformation)
    return jsonify({
        "component_type": _l(decision.component_type),
        "_type": resp["_type"],
        "value_ar": resp["value_ar"],
        "value_fr": resp["value_fr"]
    })


@bp_decision.route('/autocomplete_decision', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE)
# WARNING RETURN ONLY BATISATION DECISION and  it always filter by commune of the current_user
def autocomplete_decision():
    term = request.args.get('term')
    json_obj = []
    # TODO change it: use text search instead
    decisions = models.Decision.query.filter(models.Decision.numero != None).filter(models.Decision.numero != "").filter_by(decision_type=consts.ENUM_DECISION_TYPE.BATISATION.name).filter_by(pk_commune=current_user.affectation_id).filter(
        or_(models.Decision.numero.ilike("%" + term + "%"),
            models.Decision.valueInformation[0]["value"]["name"].astext.ilike("%" + term + "%"))).all()
    for decision in decisions:
        resp = decision_lib.read_standard_json_value_information(
            decision.valueInformation)
        json_obj.append({"label": resp["value_ar"] + " ( " + _("رقم") +
                         " : " + decision.numero + ")", "value": decision.numero})

    return json.dumps(json_obj)


@bp_decision.route('/add', methods=['GET', 'POST'])
@login_required
@roles_accepted(consts.ROLE_COMMUNE)
def add():
    check_licence(current_user.affectation_id)
    form = forms.AddDecision()
    if request.method == 'POST':
        if form.validate():
            component_type = form.component_type.data
            valueInformation = None
            if component_type == consts.ENUM_ComponentType.VOIE.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.voie_type.data,
                                                                                      form.voie_value_fr.data,
                                                                                      form.voie_value_ar.data)

            elif component_type == consts.ENUM_ComponentType.ORGANISME.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.organisme_type.data,
                                                                                      form.organisme_value_fr.data,
                                                                                      form.organisme_value_ar.data)

            elif component_type == consts.ENUM_ComponentType.ZONE.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.zone_type.data,
                                                                                      form.zone_value_fr.data,
                                                                                      form.zone_value_ar.data)
            elif component_type == consts.ENUM_ComponentType.CITE.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.cite_type.data,
                                                                                      form.cite_value_fr.data,
                                                                                      form.cite_value_ar.data)
            elif component_type == consts.ENUM_ComponentType.LIEU_DIT.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.lieudit_type.data,
                                                                                      form.lieudit_value_fr.data,
                                                                                      form.lieudit_value_ar.data)
            upload = request.files.get("upload")
            decision_lib.add_decision(numero=form.numero.data,
                                      numero_a_debatise=form.numero_a_debatise.data,
                                      date=form.date.data,
                                      decision_type=form.decision_type.data,
                                      component_type=form.component_type.data,
                                      valueInformation=valueInformation,
                                      upload=upload,
                                      creator=current_user,
                                      commune=current_user.affectation)
            flash(_("تمت إضافة المقرر بنجاح، الآن يمكنكم إضافة مقرر جديد."), 'success')
            return redirect(url_for("bp_decision.add"))
        else:
            flash(str(form.errors), "danger")
            return render_template('decision/add.html', form=form, enum_component_type=consts.ENUM_ComponentType, enum_decision_type=consts.ENUM_DECISION_TYPE)
    else:
        return render_template('decision/add.html', form=form, enum_component_type=consts.ENUM_ComponentType, enum_decision_type=consts.ENUM_DECISION_TYPE)


@login_required
@roles_accepted(consts.ROLE_COMMUNE)
@bp_decision.route('/edit/<id>', methods=['GET', 'POST'])
def edit_decision(id):
    check_licence(current_user.affectation_id)
    decision = models.Decision.query.get_or_404(id)
    resp = decision_lib.read_standard_json_value_information(
        decision.valueInformation)
    form = forms.EditDecision(obj=decision)
    if form.component_type.data == consts.ENUM_ComponentType.VOIE.name:
        form.voie_type.data = resp["_type"]
        form.voie_value_fr.data = resp["value_fr"]
        form.voie_value_ar.data = resp["value_ar"]
    elif form.component_type.data == consts.ENUM_ComponentType.CITE.name:
        form.cite_type.data = resp["_type"]
        form.cite_value_fr.data = resp["value_fr"]
        form.cite_value_ar.data = resp["value_ar"]
    elif form.component_type.data == consts.ENUM_ComponentType.ORGANISME.name:
        form.organisme_type.data = resp["_type"]
        form.organisme_value_fr.data = resp["value_fr"]
        form.organisme_value_ar.data = resp["value_ar"]
    elif form.component_type.data == consts.ENUM_ComponentType.ZONE.name:
        form.zone_type.data = resp["_type"]
        form.zone_value_fr.data = resp["value_fr"]
        form.zone_value_ar.data = resp["value_ar"]
    elif form.component_type.data == consts.ENUM_ComponentType.LIEU_DIT.name:
        form.lieudit_type.data = resp["_type"]
        form.lieudit_value_fr.data = resp["value_fr"]
        form.lieudit_value_ar.data = resp["value_ar"]
    form.scan_decision_url.data = decisionsUploadSet.url(
        decision.scan_decision_name) if decision.scan_decision_name else ""
    form.old_numero.data = form.numero.data
    if request.method == 'POST':
        form = forms.EditDecision()     # important dont delete
        if form.validate():
            component_type = form.component_type.data
            valueInformation = None
            if component_type == consts.ENUM_ComponentType.VOIE.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.voie_type.data,
                                                                                      form.voie_value_fr.data,
                                                                                      form.voie_value_ar.data)

            elif component_type == consts.ENUM_ComponentType.ORGANISME.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.organisme_type.data,
                                                                                      form.organisme_value_fr.data,
                                                                                      form.organisme_value_ar.data)

            elif component_type == consts.ENUM_ComponentType.ZONE.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.zone_type.data,
                                                                                      form.zone_value_fr.data,
                                                                                      form.zone_value_ar.data)
            elif component_type == consts.ENUM_ComponentType.CITE.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.cite_type.data,
                                                                                      form.cite_value_fr.data,
                                                                                      form.cite_value_ar.data)
            elif component_type == consts.ENUM_ComponentType.LIEU_DIT.name:
                valueInformation = decision_lib.build_standard_json_value_information(form.lieudit_type.data,
                                                                                      form.lieudit_value_fr.data,
                                                                                      form.lieudit_value_ar.data)
            upload = request.files.get("upload")
            if form.scan_decision_url.data == "" and \
                    (upload == None or upload.filename == ""):
                delete_file = True
            else:
                delete_file = False
            decision = decision_lib.edit_decision(db_decision=decision,
                                                  numero=form.numero.data,
                                                  numero_a_debatise=form.numero_a_debatise.data,
                                                  date=form.date.data,
                                                  decision_type=form.decision_type.data,
                                                  component_type=form.component_type.data,
                                                  valueInformation=valueInformation,
                                                  upload=upload,
                                                  delete_file=delete_file)
 #                                    creator=current_user)
            # flash('تمت إضافة المستخدم {} بنجاح'.format(form.username.data), 'success')
            form.scan_decision_url.data = decisionsUploadSet.url(
                decision.scan_decision_name) if decision.scan_decision_name else ""
            form.old_numero.data = decision.numero
            flash(_("تم تعديل المقرر بنجاح"), 'success')
            # TODO Change it to bp_decision.list when its task is completed
            return redirect(url_for("bp_dashboard.index"))

        else:
            flash(str(form.errors), "danger")
            return render_template('decision/add.html', edit_mode=True, form=form, enum_component_type=consts.ENUM_ComponentType, enum_decision_type=consts.ENUM_DECISION_TYPE)
    else:
        return render_template('decision/add.html', edit_mode=True, form=form, enum_component_type=consts.ENUM_ComponentType, enum_decision_type=consts.ENUM_DECISION_TYPE)


@bp_decision.route('/number', methods=['POST'])
@roles_accepted(consts.ROLE_WILAYA)
def post_number():
    form = forms.SetDecisionNumber()
    if request.method == 'POST':
        if form.validate():
            decision_lib.add_decision_commune(
                nb_decision=form.nb_decision.data,
                pk_commune=form.pk_commune.data
            )
    return 'true'


@bp_decision.route('/number', methods=['GET'])
@roles_accepted(consts.ROLE_WILAYA)
def get_number():
    form = forms.SetDecisionNumber()

    commune_list = Commune.query.filter(
        Commune.code_wilaya == current_user.affectation.code_wilaya)

    # The sqlalchmey base query
    query = commune_list
    # Config items per page
    per_page = 10
    # The current page number, ex: 2
    page = request.args.get(get_page_parameter(), type=int, default=1)

    # The sort filed, ex name, id ....
    sort = request.args.get("sort", type=str, default="")
    # The sort direction, two values (asc, desc)
    direction = request.args.get("dir", type=str, default="asc")

    # the filter filed value, ex for name: ahmed, ahme, hicham, .....
    q = request.args.get("q", type=str, default="")

    if q != "":
        query = query.filter(Commune.commune.ilike("%" + q + "%"))

    # the sort processing part
    if sort != "":
        query = query.order_by(text(sort + " " + direction))

    # the pagination processing part
    pagination = query.paginate(page=page, per_page=per_page)
    pagination_temp = Pagination(page=page, per_page=per_page, total=pagination.total, search=False,
                                 bs_version="4")
    return render_template('decision/set_number.html', users=commune_list, rows=pagination.items,
                           pagination=pagination_temp, dir=direction, sort=sort, q=q, form=form)


@bp_decision.route('/delete/<id>', methods=['GET', 'POST'])
@roles_accepted(consts.ROLE_WILAYA)
def delete_decision(id):
    form = delete_Decision()

    if request.method == 'POST':
        decision_lib.delete_decision(id)
        return redirect(url_for("bp_dashboard.index"))

    decision = models.Decision.query.get_or_404(id)

    if(decision.status == "DELETED" or (current_user.affectation.pk != decision.pk_commune)):

        return redirect(url_for("bp_dashboard.index"))

    if (decision.decision_type == 'DEBATISATION'):

        decision_type = decision.decision_type
        decision_num_deb = decision.numero_a_debatise
        decision_num = decision.numero
        decision = models.Decision.query.filter_by(
            numero=decision.numero_a_debatise).first()
        resp = decision_lib.read_standard_json_value_information(
            decision.valueInformation)
        name_pdf = decision.scan_decision_name
        component_type = decision.component_type

        scan_decision_url = decisionsUploadSet.url(
            decision.scan_decision_name)if decision.scan_decision_name else "None"

    else:
        resp = decision_lib.read_standard_json_value_information(
            decision.valueInformation)

        name_pdf = decision.scan_decision_name
        component_type = decision.component_type
        decision_type = decision.decision_type
        decision_num = decision.numero
        decision_num_deb = decision.numero_a_debatise
        scan_decision_url = decisionsUploadSet.url(
            decision.scan_decision_name)if decision.scan_decision_name else "None"

    return render_template('decision/delete.html', scan_decision_url=str(scan_decision_url), resp=resp,
                           component_type=component_type, decision_type=decision_type,
                           decision_num=decision_num, decision_num_deb=decision_num_deb, form=form)


@bp_decision.route('/validate/<id>', methods=['GET', 'POST'])
@roles_accepted(consts.ROLE_VALIDATEUR)

def validate(id):
    form = verify_Decision()
    decision = models.Decision.query.get_or_404(id)
    
    if request.method == 'POST':
        if (decision.status != consts.ENUM_DECISION_STATUS.SUBMITTED.name):
            # error page
            return redirect(url_for("bp_dashboard.index"))
        else:
            if form.btn_sent.data:             
                if (form.choice_switcher.data == 'other'):
                    comment_valus=form.comment.data
                else : 
                    comment_valus=str(dict(form.choice_switcher.choices).get(form.choice_switcher.data))
                decision_lib.TO_MODIFY_decision(id)
                decision_lib.validateur_decision(id,validator=current_user.id,choice=consts.ENUM_DECISION_STATUS.TO_MODIFY.name,comment=comment_valus)
          
            if form.btn_valid.data:
                decision_lib.VALID_decision(id,validator=current_user.id)
                decision_lib.validateur_decision(id,validator=current_user.id,choice=consts.ENUM_DECISION_STATUS.VALID.name)
        
        now_time = datetime.now()
        decision_next=models.Decision.query.filter(models.Decision.status ==consts.ENUM_DECISION_STATUS.SUBMITTED.name).\
        filter(models.Decision.view_time <= now_time-timedelta(minutes=1) ).join(models.Commune).\
        filter(models.Commune.code_wilaya == current_user.affectation.code_wilaya).\
        order_by(asc(models.Decision.created_at)).first()

        if (decision_next ==None):            
            return redirect(url_for("bp_dashboard.index")) 
        else : 
            return redirect(url_for('bp_decision.validate',id=decision_next.pk))
    if(decision.status == consts.ENUM_DECISION_STATUS.DELETED.name or (current_user.affectation.pk != decision.pk_commune) ):
        return redirect(url_for("bp_dashboard.index")) # error page 
    if (decision.status == consts.ENUM_DECISION_STATUS.SUBMITTED.name ):
        if(decision.view_time < datetime.now()-timedelta(minutes=1)):
            button_vue=True
        elif  (current_user.id == decision.validator_id ):
            button_vue=True
        else :
            button_vue=False
    else:
        button_vue=False
    if (decision.decision_type == 'DEBATISATION'):
        decision_type=decision.decision_type
        decision_num_deb=decision.numero_a_debatise
        decision_num=decision.numero
        decision=models.Decision.query.filter_by(numero=decision.numero_a_debatise).first()
        resp = decision_lib.read_standard_json_value_information(
            decision.valueInformation)
        name_pdf = decision.scan_decision_name 
        component_type=decision.component_type
               
        scan_decision_url = decisionsUploadSet.url(
            decision.scan_decision_name)if decision.scan_decision_name else "None"
    else : 
        resp = decision_lib.read_standard_json_value_information(
            decision.valueInformation)
        name_pdf = decision.scan_decision_name 
        component_type=decision.component_type
        decision_type=decision.decision_type
        decision_num=decision.numero
        decision_num_deb=decision.numero_a_debatise
        scan_decision_url = decisionsUploadSet.url(
            decision.scan_decision_name)if decision.scan_decision_name else "None"
        
    decision_lib.view_time_decision(id,validator=current_user.id)
    return render_template('decision/validate.html' ,scan_decision_url=str(scan_decision_url) ,resp= resp  ,
            component_type=component_type ,decision_type=decision_type ,
            decision_num=decision_num ,decision_num_deb=decision_num_deb , id_decision=id ,form=form ,button_vue=button_vue)
