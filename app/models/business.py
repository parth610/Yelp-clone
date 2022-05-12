from .db import db

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    about = db.Column(db.Text, nullable=True)
    phone_number = db.Column(db.Integer, nullable=True)
    street_address = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    photos = db.Column(db.JSON, nullable=True)
    hotel = db.Column(db.Boolean, nullable=False)
    food = db.Column(db.Boolean, nullable=False)
    transportation = db.Column(db.Boolean, nullable=False)
    entertainment = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='business')
    reviews = db.relationship('Review', back_populates='business')

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'name': self.name,
            'about': self.about,
            'phone_number': self.phone_number,
            'street_address': self.street_address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'photos': self.photos,
            'hotel': self.hotel,
            'food': self.food,
            'transportation': self.transportation,
            'entertainment': self.entertainment,
            'created_at': self.created_at
        }
