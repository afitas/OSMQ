from flask import current_app
from dateutil.parser import parse
from flask_babel import lazy_gettext as _l


def is_date(string, fuzzy=False):
    """
    Return whether the string can be interpreted as a date.

    :param string: str, string to check for date
    :param fuzzy: bool, ignore unknown tokens in string if True
    """
    try:
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False


def get_select_choices_from_db(cls):
    choices = [("", "")]
    records = cls.query.all()
    for record in records:
        choices.append((record.pk, _l(record.pk)))
    return choices
