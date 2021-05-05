import datetime
from flask_babel import lazy_gettext as _l, gettext as _
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired

from wtforms import ValidationError, HiddenField, StringField, PasswordField, validators, SubmitField,\
    SelectField, FileField, IntegerField,RadioField

from wtforms.fields.html5 import DateField
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from flask_app import consts, models, helpers
from flask_app.extentions import decisionsUploadSet, db
from . import lib


def is_decision_unique_validator(form, field):
    if not lib.is_decision_unique(field.data):
        raise ValidationError(_l("هدا الرقم تم إدخاله من قبل"))


class MyDateField (DateField):
    def process_formdata(self, valuelist):
        if valuelist:
            date_str = ' '.join(valuelist)
            try:
                if date_str != "":
                    self.data = datetime.datetime.strptime(date_str, self.format).date()
            except ValueError:
                self.data = None
                raise ValueError(self.gettext('Not a valid date value'))


class AddDecision(FlaskForm):

    component_type = SelectField(_l('Type de structure'),
                                 choices=consts.ENUM_ComponentType.choices(excludes=[
                                     consts.ENUM_ComponentType.LOCALITE,
                                     consts.ENUM_ComponentType.NUMERO,
                                     consts.ENUM_ComponentType.LOCALITE,
                                     consts.ENUM_ComponentType.BP_POSTALE,
                                     consts.ENUM_ComponentType.NUM_APPART,
                                 ]),
                                 coerce=consts.ENUM_ComponentType.coerce,
                                 render_kw={'class': 'form-control',
                                            'id': 'component_type'})

    decision_type = SelectField(_l('Type de décision'), validators=[validators.DataRequired()],
                                choices=consts.ENUM_DECISION_TYPE.choices(),
                                coerce=consts.ENUM_DECISION_TYPE.coerce,
                                render_kw={'class': 'form-control',
                                           'id': 'decision_type'})

    numero = StringField(_l('Numero de décision'),
                         validators=[is_decision_unique_validator],
                         render_kw={'class': 'form-control',
                                    'id': 'numero'})

    numero_a_debatise = StringField(_l('Numero de décision à débatiser'),
                                    render_kw={'class': 'form-control',
                                               'id': 'numero_a_debatise'})

    upload = FileField(_l('Scan de la décision'), validators=[
                       FileAllowed(decisionsUploadSet, 'PDF')],
                       render_kw={"accept": "application/pdf"}
                       )

    date = MyDateField(_l('Date de la décision'),format='%d/%m/%Y',
                       render_kw={ 'type': 'input',
                                   "placeholder": _l("مثال : 30/12/2017"),
                                  'class': 'form-control',
                                  'id': 'date'})
    voie_type = SelectField(
        _l('Type de voie'),
        choices=[],
        render_kw={'class': 'form-control',
                   'id': 'voie_type'})
    voie_value_fr = StringField(_l('Nom en français'),
                                render_kw={'class': 'form-control',
                                           'id': 'voie_value_fr'})
    voie_value_ar = StringField(_l('Nom en arabe'),
                                render_kw={'class': 'form-control',
                                           'id': 'voie_value_ar'})

    organisme_type = SelectField(
        _l("Type de l'organisme"),
        choices=[],
        render_kw={'class': 'form-control',
                   'id': 'organisme_type'})
    organisme_value_fr = StringField(_l("Nom en français"),
                                     render_kw={'class': 'form-control',
                                                'id': 'organisme_value_fr'})
    organisme_value_ar = StringField(_l("Nom en arabe"),
                                     render_kw={'class': 'form-control',
                                                'id': 'organisme_value_ar'})

    cite_type = SelectField(
        _l('Type de la cité'),
        choices=[],
        render_kw={'class': 'form-control',
                   'id': 'cite_type'})
    cite_value_fr = StringField(_l("Nom en français"),
                                render_kw={'class': 'form-control',
                                           'id': 'cite_value_fr'})
    cite_value_ar = StringField(_l("Nom en arabe"),
                                render_kw={'class': 'form-control',
                                           'id': 'cite_value_ar'})

    lieudit_type = SelectField(
        _l('Type de lieu-dit'),
        choices=[],
        render_kw={'class': 'form-control',
                   'id': 'lieudit_type'})
    lieudit_value_fr = StringField(_l('Nom en français'),
                                   render_kw={'class': 'form-control',
                                              'id': 'lieudit_value_fr'})
    lieudit_value_ar = StringField(_l('Nom en arabe'),
                                   render_kw={'class': 'form-control',
                                              'id': 'lieudit_value_ar'})

    zone_type = SelectField(
        _l('Type de zone'),
        choices=[],
        render_kw={'class': 'form-control',
                   'id': 'zone_type'})
    zone_value_fr = StringField(_l('Nom en français'),
                                render_kw={'class': 'form-control',
                                           'id': 'zone_value_fr'})
    zone_value_ar = StringField(_l('Nom en arabe'),
                                render_kw={'class': 'form-control',
                                           'id': 'zone_value_ar'})

    def __init__(self, **kwargs):
        super().__init__(**kwargs)  # calls the base initialisation and then...
        self.voie_type.choices = helpers.get_select_choices_from_db(
            models.TypeVoie)
        self.organisme_type.choices = helpers.get_select_choices_from_db(
            models.TypeOrganisme)
        self.cite_type.choices = helpers.get_select_choices_from_db(
            models.TypeCite)
        self.lieudit_type.choices = helpers.get_select_choices_from_db(
            models.TypeLieudit)
        self.zone_type.choices = helpers.get_select_choices_from_db(
            models.TypeZone)

    @classmethod
    def validate_component_type(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_decision_type(cls, form, field):
        if field.data == "" or field.data == None:
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_numero_a_debatise(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.DEBATISATION.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))
        if field.data == form.numero.data and field.data != "" and form.numero.data != "":
            raise ValidationError(
                _("رقم المقرر إزالة التسمية يجب ان يكون مختلف على رقم مقرر المراد إزالة تسميته"))
        q = models.Decision.query.filter_by(numero = field.data)
        if field.data != "" and not db.session.query(q.exists()).scalar() :
            raise ValidationError("لا يوجد")
        # 
    @classmethod
    def validate_numero(cls, form, field):
        if (form.decision_type.data == consts.ENUM_DECISION_TYPE.DEBATISATION.name or  form.component_type.data == consts.ENUM_ComponentType.VOIE.name or form.component_type.data == consts.ENUM_ComponentType.CITE.name) and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_date(cls, form, field):
        if (form.decision_type.data == consts.ENUM_DECISION_TYPE.DEBATISATION.name or form.component_type.data == consts.ENUM_ComponentType.VOIE.name or form.component_type.data == consts.ENUM_ComponentType.CITE.name) and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_upload(cls, form, field):
        if (form.decision_type.data == consts.ENUM_DECISION_TYPE.DEBATISATION.name or form.component_type.data == consts.ENUM_ComponentType.VOIE.name or form.component_type.data == consts.ENUM_ComponentType.CITE.name or form.numero.data != "") and \
                (field.data == "" or field.data == None or field.data.filename == ""):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_voie_type(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.VOIE.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_voie_value_ar(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.VOIE.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_organisme_type(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.ORGANISME.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_organisme_value_ar(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.ORGANISME.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_cite_type(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.CITE.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_cite_value_ar(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.CITE.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_lieudit_type(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.LIEU_DIT.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_lieudit_value_ar(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.LIEU_DIT.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_zone_type(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.ZONE.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))

    @classmethod
    def validate_zone_value_ar(cls, form, field):
        if form.decision_type.data == consts.ENUM_DECISION_TYPE.BATISATION.name and form.component_type.data == consts.ENUM_ComponentType.ZONE.name and (field.data == "" or field.data == None):
            raise ValidationError(_("إلزامي"))


class EditDecision(AddDecision):

    numero = StringField(_l('Numero de décision'),
                         render_kw={'class': 'form-control',
                                    'id': 'numero'})

    old_numero = HiddenField(render_kw={'class': 'form-control',
                                        'id': 'old_numero'})

    scan_decision_url = HiddenField(
        render_kw={'class': 'form-control',
                   'id': 'scan_decision_url'})

    @classmethod
    def validate_upload(cls, form, field):
        if (form.decision_type.data == consts.ENUM_DECISION_TYPE.DEBATISATION.name or form.component_type.data == consts.ENUM_ComponentType.VOIE.name or form.numero.data != "") and \
                (field.data == "" or field.data == None or field.data.filename == "") \
                and form.scan_decision_url.data == "":
            raise ValidationError(_("إلزامي"))

    def validate(self):
        rv = FlaskForm.validate(self)
        if not rv:
            return False
        if lib.is_decision_unique(self.numero.data, exclude=self.old_numero.data) == False:
            self.numero.errors.append(_l("رقم المقرر مكرر"))
            return False
        return True
    scan_decision_name = HiddenField(
                       render_kw={'class': 'form-control',
                                  'id': 'scan_decision_name'})
    def validate(self):
        return True

class SetDecisionNumber(FlaskForm):
    nb_decision = IntegerField(render_kw={'class': 'form-control', 'type': 'number'})
    pk_commune = StringField(render_kw={'class': 'form-control', 'id': 'pk_commune', 'type': 'hidden'})



class delete_Decision(FlaskForm):
    submit = SubmitField(_l('حذف'), render_kw={'class': 'btn btn-danger'})

class verify_Decision(FlaskForm):
    btn_valid = SubmitField(_l('المعلومات صحيحة'), render_kw={'class': 'btn btn-success' })    
    btn_next = SubmitField(_l('الانتقال الى المقرر التالي'), render_kw={'class': 'btn btn-info left'})
    choice_switcher = RadioField(
        'Choice?',
        [validators.Required()],
        choices=[('choice1',  _l('المعلومات المحجوزة خاطئة ')) ,('choice2', _l('الصورة غير واضحة ')) ,('other',  _l('سبب اخر '))],
     render_kw={'class': 'form-check' , 'id' : 'choice_switcher'})
    comment  = StringField(_l('تعليق حول المشكل'),                         
                         render_kw={'class': 'form-control-col-xs-4',
                                    'id': 'comment'})
    btn_sent= SubmitField(_l('إرســــال'), render_kw={'class': 'btn btn-primary'  })