from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=True)
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    created_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'stars': self.stars,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'username': self.user.username,
            'created_at': self.created_at
        }
