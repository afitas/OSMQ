import enum
from flask_babel import lazy_gettext as _l


class MyEnum(enum.Enum):
    @classmethod
    def choices(cls, excludes=[]):
        d = [("", "")]
        for choice in cls:
            if not choice in excludes:
                d.append((choice.name, _l(choice.name)))
        return d

    @classmethod
    def coerce(cls, item):
        return item
        if item == "" or item == None:
            return None
        return cls(item) if not isinstance(item, cls) else item

    def __str__(self):
        return str(self.value)


@enum.unique
class ENUM_Locale(MyEnum):
    ARABIC = "ARABIC"
    TAMAZIGH = "TAMAZIGH"
    FRENCH = "FRENCH"
    ENGLISH = "ENGLISH"


@enum.unique
class ENUM_AddressLifecycleStage(MyEnum):
    CURRENT = "CURRENT"
    PROPOSED = "PROPOSED"
    REFUSED = "REFUSED"
    RESERVED = "RESERVED"
    RETIRED = "RETIRED"
    UNKNOWN = "UNKNOWN"


@enum.unique
class ENUM_ComponentType(MyEnum):
    NUMERO = "NUMERO"
    LOCALITE = "LOCALITE"
    VOIE = "VOIE"
    CITE = "CITE"
    LIEU_DIT = "LIEU_DIT"
    ORGANISME = "ORGANISME"
    BP_POSTALE = "BP_POSTALE"
    ZONE = "ZONE"
    NUM_APPART = "NUM_APPART"


@enum.unique
class ENUM_GEOMS_DATA_TYPE(MyEnum):
    TRONCON = "TRONCON"
    CITE = "CITE"
    ZONE = "ZONE"
    ORGANISME = "ORGANISME"
    ACCEE = "ACCEE"
    CODE_POSTALE = "CODE_POSTALE"


@enum.unique
class ENUM_GEOMS_DATA_SOURCE(MyEnum):
    INCT = "INCT"
    POSTE = "POSTE"


@enum.unique
class ENUM_AddressComponentValueType(MyEnum):
    DEFAULT_VALUE = "DEFAULT_VALUE"
    ABBREVIATED_ALTERNATIVE = "ABBREVIATED_ALTERNATIVE"
    COLLOQUIAL_ALTERNATIVE = "COLLOQUIAL_ALTERNATIVE"
    LIFECYCLE_ALTERNATIVE = "LIFECYCLE_ALTERNATIVE"
    LOCALE_ALTERNATIVE = "LOCALE_ALTERNATIVE"


@enum.unique
class ENUM_DECISION_TYPE(MyEnum):
    BATISATION = "BATISATION"
    DEBATISATION = "DEBATISATION"


@enum.unique
class ENUM_DECISION_STATUS(MyEnum):
    SUBMITTED = "SUBMITTED"
    VALID = "VALID"
    TO_MODIFY = "TO_MODIFY"
    DELETED = "DELETED"


@enum.unique
class ENUM_STATS_ENTR(MyEnum):
    VIDE = "VIDE"
    PUBLIC = "PUBLIC"
    PRIVE = "PRIVE"
    SERV_TECH = "SERV_TECH"


ROLE_ADMIN = "مسؤول تقني"
ROLE_NATIONAL = "مسؤول وطني"
ROLE_WILAYA = "مسؤول ولاية"
ROLE_VALIDATEUR = "مصادق"
ROLE_COMMUNE = "مسؤول بلدية"

PRINCIPALE_LANGUAGE = ENUM_Locale.ARABIC


# Just to force babel translation extraction (lang.bat) to create entries in its catalogues
_l("ARABIC")
_l("TAMAZIGH")
_l("FRENCH")
_l("ENGLISH")
_l("NUMERO")
_l("LOCALITE")
_l("VOIE")
_l("CITE")
_l("LIEU_DIT")
_l("ORGANISME")
_l("BP_POSTALE")
_l("ZONE")
_l("NUM_APPART")
_l("BATISATION")
_l("DEBATISATION")
_l("VIDE")
_l("PUBLIC")
_l("PRIVE")
_l("SERV_TECH")
