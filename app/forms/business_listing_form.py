from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, BooleanField, TextAreaField
from wtforms.validators import DataRequired


class BusinessForm(FlaskForm):
    name = StringField('Business Title', validators=[DataRequired()])
    about = TextAreaField('About')
    phone_number = StringField('Phone Number')
    street_address = TextAreaField('Street Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    zip_code = StringField('Zip Code', validators=[DataRequired()])
