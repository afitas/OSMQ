from flask_app.extentions import security
from flask_babel import lazy_gettext as _l
from flask_security.forms import LoginForm, ChangePasswordForm
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators, SubmitField, SelectField


class Login(LoginForm):
    email = StringField(_l('إسم المستخدم'), [validators.DataRequired()],
                        render_kw={'class': 'form-control',
                                   'id': 'username',
                                   'aria-describedby': 'usernameHelp'})

    password = PasswordField(_l('كلمة السر'), [validators.DataRequired()],
                             render_kw={'class': 'form-control',
                                        'id': 'password'})

    submit = SubmitField(_l('تسجيل الدخول'), render_kw={'class': 'btn btn-primary'})



class ChangePassword(ChangePasswordForm):
    password = PasswordField(_l('كلمة السر القديمة'), [validators.DataRequired()],
                             render_kw={'class': 'form-control',
                                        'id': 'password'})

    new_password = PasswordField(_l('كلمة السر الجديدة'),
                                 [validators.DataRequired(),
                                  validators.EqualTo('new_password_confirm', message=_l('يجب ان تتطابق كلمات السر.'))],
                                 render_kw={'class': 'form-control',
                                            'id': 'new_password'})

    new_password_confirm = PasswordField(_l('اعد كلمة السر الجديدة'), [validators.DataRequired()],
                                         render_kw={'class': 'form-control',
                                                    'id': 'new_password_confirm'})

    submit = SubmitField(_l('تغيير'), render_kw={
                         'class': 'btn btn-primary btn-lg'})


def check_uniqueness(form, field):
    if security.datastore.find_user(username=field.data) is not None:
        raise validators.ValidationError(_l('اسم المستخدم محجوز مسبقا'))


class AddUser(FlaskForm):
    username = StringField(_l('إسم المستخدم'),
                           [validators.Length(min=2, max=25), validators.DataRequired(), check_uniqueness],
                           render_kw={'class': 'form-control',
                                      'id': 'username',
                                      'aria-describedby': 'usernameHelp'})

    first_name = StringField(_l('الاسم'), [validators.Length(min=2, max=25), validators.DataRequired()],
                             render_kw={'class': 'form-control',
                                        'id': 'first_name',
                                        'aria-describedby': 'first_nameHelp'})

    last_name = StringField(_l('اللقب'), [validators.Length(min=2, max=25), validators.DataRequired()],
                            render_kw={'class': 'form-control',
                                       'id': 'last_name',
                                       'aria-describedby': 'last_nameHelp'})

    roles = SelectField(_l('الدور'), coerce=int, validators=[validators.InputRequired()],
                        render_kw={'class': 'custom-select d-block w-100',
                                   'onchange': 'setAffectationOptions();'})

    affectation = SelectField(_l('منطقة العمل'), coerce=int, validators=[validators.InputRequired()],
                              render_kw={'class': 'custom-select d-block w-100'})

    password = PasswordField(_l('كلمة السر'), [validators.DataRequired(),
                                               validators.EqualTo('confirm', message=_l('يجب ان تتطابق كلمات السر.'))],
                             render_kw={'class': 'form-control',
                                        'id': 'password'})

    confirm = PasswordField(_l('اعد كلمة السر'), [validators.DataRequired()],
                            render_kw={'class': 'form-control',
                                       'id': 'confirm'})

    submit = SubmitField(_l('إضافة'), render_kw={
                         'class': 'btn btn-primary btn-lg',
                         'style': 'margin-bottom:20px'})


class EditUser(FlaskForm):
    username = StringField(_l('إسم المستخدم'), render_kw={'class': 'form-control',
                                                          'readonly': True,
                                                          'id': 'username',
                                                          'aria-describedby': 'usernameHelp'})

    first_name = StringField(_l('الاسم'), [validators.Length(min=2, max=25), validators.DataRequired()],
                             render_kw={'class': 'form-control',
                                        'id': 'first_name',
                                        'aria-describedby': 'first_nameHelp'})

    last_name = StringField(_l('اللقب'), [validators.Length(min=2, max=25), validators.DataRequired()],
                            render_kw={'class': 'form-control',
                                       'id': 'last_name',
                                       'aria-describedby': 'last_nameHelp'})

    roles = SelectField(_l('الدور'), coerce=int, validators=[validators.InputRequired()],
                        render_kw={'class': 'custom-select d-block w-100',
                                   'onchange': 'setAffectationOptions();'})

    affectation = SelectField(_l('منطقة العمل'), coerce=int, validators=[validators.InputRequired()],
                              render_kw={'class': 'custom-select d-block w-100'})

    submit = SubmitField(_l('تعديل'), render_kw={'class': 'btn btn-primary'})


class reset_password_form(FlaskForm):


    new_password = PasswordField(_l('كلمة السر الجديدة'),
                                 [validators.DataRequired(),
                                  validators.EqualTo('new_password_confirm', message=_l('يجب ان تتطابق كلمات السر.'))],
                                 render_kw={'class': 'form-control',
                                            'id': 'new_password'})

    new_password_confirm = PasswordField(_l('اعد كلمة السر الجديدة'), [validators.DataRequired()],
                                         render_kw={'class': 'form-control',
                                                    'id': 'new_password_confirm'})

    submit = SubmitField(_l('تغيير'), render_kw={'class': 'btn btn-primary'})
