from flask_security import roles_accepted
from flask_app.bp_progress.lib import get_latest_detail
from flask import render_template, redirect, url_for, request
from flask_app.extentions import db
from flask_security import current_user, login_required
from . import bp_dashboard
from flask_app import consts
from ..models import Commune


@bp_dashboard.route('/', methods=['GET'])
@login_required
def index():
    if current_user.has_role(consts.ROLE_ADMIN):
        return redirect(url_for("bp_account.users"))
    else: 
        return redirect(url_for("bp_dashboard.landing_page"))
    # if current_user.has_role(consts.ROLE_NATIONAL):
    #      return redirect(url_for("bp_dashboard.dashboard"))
    #     #return redirect(url_for("bp_dashboard.landing_page"))
    # if current_user.has_role(consts.ROLE_WILAYA):
    #     return redirect(url_for("bp_dashboard.dashboard"))

    # if current_user.has_role(consts.ROLE_VALIDATEUR):
    #     return redirect(url_for("bp_decision.pv", key="soumis"))

    # if current_user.has_role(consts.ROLE_COMMUNE):
    #     return redirect(url_for("bp_dashboard.dashboard"))



@bp_dashboard.route('/main', methods=['GET'])
@login_required
def landing_page():
    return render_template('dashboard/index.html')
    
@bp_dashboard.route('/admin', methods=['GET'])
@login_required
def admin():
    return render_template('dashboard/admin.html')


@bp_dashboard.route('/dashboard', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_NATIONAL, consts.ROLE_WILAYA, consts.ROLE_COMMUNE)
def dashboard():

    if current_user.has_role(consts.ROLE_WILAYA):
        code_wilaya = current_user.affectation.code_wilaya
    else:
        code_wilaya = request.args.get("code_wilaya", type=str, default="00")

    if current_user.has_role(consts.ROLE_COMMUNE):
        pk_commune = current_user.affectation.pk
    else:
        pk_commune = request.args.get("pk_commune", type=str, default="")

    etatAvancement = get_latest_detail(code_wilaya, pk_commune)
    print(etatAvancement)
    print("------------------------------------------------------------------------------------------------------------------")

    wilaya_list = db.session.query(Commune.code_wilaya, Commune.wilaya).filter(
        (Commune.type == "wilaya") | (Commune.type == "national")).order_by(Commune.code_wilaya).all()

    commune_list = db.session.query(Commune.pk, Commune.commune).filter(
        (Commune.type == "commune")).order_by(Commune.pk)
    if code_wilaya != "00":
        commune_list = commune_list.filter(Commune.code_wilaya == code_wilaya)
    commune_list = commune_list.all()

    wilaya_name = Commune.query.distinct(Commune.code_wilaya).filter(
        Commune.code_wilaya == code_wilaya).order_by(Commune.code_wilaya).first()
    commune_name = Commune.query.filter(
        Commune.pk == pk_commune).first()
    if wilaya_name:
        wilaya_name = wilaya_name.wilaya
    if commune_name:
        commune_name = commune_name.commune
    return render_template('dashboard/dashboard.html', wilaya_list=wilaya_list, obj=etatAvancement,
                           code_wilaya=code_wilaya,
                           pk_commune=pk_commune,
                           commune_list=commune_list,
                           wilaya_name=wilaya_name,
                           commune_name=commune_name)


@bp_dashboard.route('/validateur', methods=['GET'])
@login_required
def validateur():
    return render_template('dashboard/validateur.html')
