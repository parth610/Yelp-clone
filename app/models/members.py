from .db import db

members = db.Table(
    'members',
    db.Column('collaborator_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('business_id', db.Integer, db.ForeignKey('businesses.id'))
)
