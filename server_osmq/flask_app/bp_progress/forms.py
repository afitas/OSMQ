from flask_babel import lazy_gettext as _l, gettext as _
from flask_wtf import FlaskForm
from wtforms import validators, SelectField, IntegerField, SubmitField
from flask_app import consts


class AjoutEtatAvancement(FlaskForm):

    nbEspPubRec = IntegerField(_l("إجمالي عدد الفضاءات العمومية و الأهلة بالسكان المحصاة"), validators=[
                               validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 1
    nbEspPubBapt = IntegerField(_l("إجمالي عدد الفضاءات العمومية و الأهلة بالسكان المسماة قبل إنطلاق العملية سنة 2014"), validators=[
                                validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 2
    nbEspPubNonBapt = IntegerField(_l("عدد الفضاءات العمومية و الأهلة بالسكان غير المسماة و المنتظر تسميتها"), validators=[
                                   validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 3
    nbBapProp = IntegerField(_l("عدد إقتراحات التسمية المنتظر معالجتها من طرف اللجنة الولائية للتسمية"), validators=[
                             validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 4

    # Nombre des baptisations approuvées
    nbRueBoulVois = IntegerField(_l("الشوارع/ الطرق/ النهوج/ المسالك/ ... الخ"), validators=[
                                 validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 5
    nbCiteAglo = IntegerField(_l("الأحياء، التجمعات السكانية و التجزئات"), validators=[
                              validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 6
    nbJardPlace = IntegerField(_l("الحدائق، الساحات، الحظائر و الغابات"), validators=[
                               validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 7
    nbMonumHist = IntegerField(_l("المعالم التدكارية و الآثار التارخية"), validators=[
                               validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 8
    nbInstImmo = IntegerField(_l("المؤسسات، المباني، الأملاك، العقارات، و التجهيزات العمومية"), validators=[
                              validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 9
    nbAutre = IntegerField(_l("تسميات أخرى"), validators=[validators.InputRequired(
    )], render_kw={'class': 'form-control', 'type': 'number'})  # 10

    # Deuxieme section
    # Processus de nomination
    nbPlaqNomPrevParComm = IntegerField(_l("إجمالي عدد لوحات التسمية المتوقع تركيبها على مستوى البلدية"), validators=[
                                        validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 15
    nbPlaqNomNonInst = IntegerField(_l("عدد لوحات التسمية غير المركبة"), validators=[
                                    validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 16
    nbPlaqNomInst = IntegerField(_l("عدد لوحات التسمية المركبة"), validators=[
                                 validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 17
    entrPlaqNomFab = SelectField(_l('المؤسسات المكلفة بصناعة لوحات التسمية'), validators=[validators.InputRequired()],
                                 choices=consts.ENUM_STATS_ENTR.choices(),
                                 coerce=consts.ENUM_STATS_ENTR.coerce,
                                 render_kw={'class': 'form-control'})  # 19
    entrPlaqNomInst = SelectField(_l('المؤسسات المكلفة بتركيب لوحات التسمية'), validators=[validators.InputRequired()],
                                  choices=consts.ENUM_STATS_ENTR.choices(),
                                  coerce=consts.ENUM_STATS_ENTR.coerce,
                                  render_kw={'class': 'form-control'})  # 19

    # Processus de numérotation
    nbPlaqNumPrevParComm = IntegerField(_l("إجمالي عدد لوحات الترقيم المتوقع تركيبها على مستوى البلدية"), validators=[
        validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 20
    nbPlaqNumNonInst = IntegerField(_l("عدد لوحات الترقيم غير المركبة"), validators=[
        validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 21
    nbPlaqNumInst = IntegerField(_l("عدد لوحات الترقيم المركبة"), validators=[
        validators.InputRequired()], render_kw={'class': 'form-control', 'type': 'number'})  # 22
    entrPlaqNumFab = SelectField(_l('المؤسسات المكلفة بصناعة لوحات الترقيم'), choices=consts.ENUM_STATS_ENTR.choices(),
                                 coerce=consts.ENUM_STATS_ENTR.coerce,
                                 render_kw={'class': 'form-control'})  # 24
    entrPlaqNumInst = SelectField(_l('المؤسسات المكلفة بتركيب لوحات الترقيم'), choices=consts.ENUM_STATS_ENTR.choices(),
                                  coerce=consts.ENUM_STATS_ENTR.coerce,
                                  render_kw={'class': 'form-control'})  # 24
    submit = SubmitField(_l('إضافة'), render_kw={'class': 'btn btn-primary'})
