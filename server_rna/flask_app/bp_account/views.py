from flask import render_template, request, flash, url_for, redirect
from flask_app import consts
from flask_app.extentions import security
from flask_babel import lazy_gettext as _l
from flask_paginate import Pagination, get_page_parameter
from flask_security import login_required, current_user, roles_accepted
from flask_security.utils import hash_password
from . import bp_account
from .forms import AddUser, EditUser, ChangePassword, reset_password_form
from ..models import User, Role, Commune

from flask_security.utils import hash_password, verify_hash, verify_password, login_user
from flask_paginate import Pagination, get_page_parameter
from flask_app import consts
from sqlalchemy import text


@bp_account.route('/add', methods=['GET', 'POST'])
@login_required
@roles_accepted(consts.ROLE_ADMIN, consts.ROLE_WILAYA)
def add_user():
    form = AddUser()

    if current_user.has_role(consts.ROLE_ADMIN):
        form.roles.choices = [(1, consts.ROLE_NATIONAL),
                              (2, consts.ROLE_WILAYA)]
        q = Commune.query.filter(
            (Commune.type == "wilaya") | (Commune.type == "national")).order_by(Commune.code_wilaya)
        form.affectation.choices = [
            (element.pk, element.wilaya) for element in q]
        form.affectation.render_kw.__setitem__("disabled", True)

    else:
        form.roles.choices = [(4, consts.ROLE_COMMUNE),
                            #   (3, consts.ROLE_VALIDATEUR)
                              ]
        q = Commune.query.filter(
            Commune.code_wilaya == current_user.affectation.code_wilaya, Commune.type == "commune").order_by(Commune.pk)

        form.affectation.choices = [
            (element.pk, element.commune) for element in q]
        # form.affectation.render_kw.__setitem__("disabled", True)
    if request.method == 'POST':
        if form.validate():
            role = security.datastore.find_role(
                dict(form.roles.choices).get(form.roles.data))
            affectation = Commune.query.filter(
                Commune.pk == form.affectation.raw_data[0]).first()
            security.datastore.create_user(username=form.username.data,
                                           first_name=form.first_name.data,
                                           last_name=form.last_name.data,
                                           roles=[role],
                                           affectation=affectation,
                                           password=hash_password(form.password.data))

            security.datastore.commit()
            flash('تمت إضافة المستخدم {} بنجاح'.format(
                form.username.data), 'success')
            return redirect(url_for("bp_account.users"))
        else:
            return render_template('account/add_user.html', title=_l("إضافة مستخدم جديد"), form=form)
    else:

        return render_template('account/add_user.html', title=_l("إضافة مستخدم جديد"), form=form)


@bp_account.route('/edit/<username>', methods=['GET', 'POST'])
@login_required
@roles_accepted(consts.ROLE_ADMIN, consts.ROLE_WILAYA)
def edit_user(username):
    user = User.query.filter_by(username=username).first()

    form = EditUser()

    form.username.default = user.username
    form.first_name.default = user.first_name
    form.last_name.default = user.last_name

    if current_user.has_role(consts.ROLE_ADMIN):
        roles_choices = [(1, consts.ROLE_NATIONAL), (2, consts.ROLE_WILAYA)]
        form.roles.choices = roles_choices
        form.roles.default = user.roles[0].id
        q = Commune.query.filter(
            (Commune.type == "wilaya") | (Commune.type == "national")).order_by(Commune.code_wilaya)

        affectation_choices = [
            (element.pk, element.wilaya) for element in q]

        if user.roles[0].id == 1:
            form.affectation.choices = affectation_choices
            form.affectation.default = user.affectation.pk
            form.affectation.render_kw.__setitem__("disabled", True)
        else:
            affectation_choices.pop(0)
            form.affectation.choices = affectation_choices
            form.affectation.default = user.affectation.pk
            form.affectation.render_kw.__setitem__("disabled", False)
    else:
        roles_choices = [ # (3, consts.ROLE_VALIDATEUR), 
                         (4, consts.ROLE_COMMUNE)]
        form.roles.choices = roles_choices
        form.roles.default = user.roles[0].id
        q = Commune.query.filter(
            Commune.code_wilaya == current_user.affectation.code_wilaya, Commune.type == "commune").order_by(Commune.pk)

        affectation_choices = [
            (element.pk, element.commune) for element in q]
        form.affectation.choices = affectation_choices
        form.affectation.default = user.affectation.pk
        if user.roles[0].id == 3:
            form.affectation.render_kw.__setitem__("disabled", True)
        else:
            form.affectation.render_kw.__setitem__("disabled", False)

    form.process()
    if request.method == 'POST':
        if form.validate():
            role = security.datastore.find_role(
                dict(form.roles.choices).get(int(form.roles.raw_data[0])))
            user.first_name = form.first_name.raw_data[0],
            user.last_name = form.last_name.raw_data[0],
            user.roles = [role]
            user.affectation = Commune.query.filter(
                Commune.pk == str(form.affectation.raw_data[0])).first()
            security.datastore.put(user)
            security.datastore.commit()

            flash('تم تعديل بيانات المستخدم {} بنجاح'.format(
                form.username.data), 'success')
            return redirect(url_for("bp_account.users"))
        else:
            return render_template('account/edit_user.html', title=_l("تعديل بيانات المستخدم"), form=form)
    else:
        return render_template('account/edit_user.html', title=_l("تعديل بيانات المستخدم"), form=form)


@bp_account.route('/change_password', methods=['GET', 'POST'])
@login_required
# @roles_required('admin')
def change_password():
    form = ChangePassword()
    return render_template('security/change_password.html', form=form)


@bp_account.route('/delete_user/<username>', methods=['GET', 'POST'])
@login_required
def delete_user(username):
    user = security.datastore.get_user(username)
    security.datastore.delete_user(user)
    security.datastore.commit()
    return redirect(url_for("bp_account.users"))


@bp_account.route('/users', methods=['GET'])
@login_required
@roles_accepted(consts.ROLE_ADMIN, consts.ROLE_WILAYA)
def users():
    if current_user.has_role(consts.ROLE_ADMIN):
        user_list = User.query.join(User.roles).join(Commune).filter(
            Role.name.in_([consts.ROLE_NATIONAL, consts.ROLE_WILAYA]))
    else:
        user_list = User.query.join(User.roles).join(Commune)\
            .filter(Role.name.in_([consts.ROLE_VALIDATEUR, consts.ROLE_COMMUNE]))\
            .filter(Commune.code_wilaya == current_user.affectation.code_wilaya)

    # The sqlalchmey base query
    query = user_list
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
        query = query.filter(User.username.ilike("%" + q + "%"))

    # the sort processing part
    if sort != "":
        query = query.order_by(text(sort + " " + direction))

    # the pagination processing part
    pagination = query.paginate(page=page, per_page=per_page)
    pagination_temp = Pagination(page=page, per_page=per_page, total=pagination.total, search=False,
                                 bs_version="4")
    return render_template('account/users.html', users=user_list, rows=pagination.items,
                           pagination=pagination_temp, dir=direction, sort=sort, q=q)


@bp_account.route('/reset_password/<username>', methods=['GET', 'POST'])
@login_required
@roles_accepted(consts.ROLE_ADMIN, consts.ROLE_WILAYA)
def reset_password(username):
    form = reset_password_form()
    if request.method == 'POST':

        if form.validate():
            user = User.query.filter_by(username=username).first()
            user.password = hash_password(form.new_password.data)
            security.datastore.commit()

            return redirect(url_for("bp_account.users"))

        else:
            return render_template('account/reset_password.html', form=form)

    else:
        return render_template('account/reset_password.html', form=form)
