from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, business, db

review_routes = Blueprint('review', __name__)

@review_routes.route('/', methods=['POST'])
@login_required
def create_reviews():
    review_data = request.get_json(force=True)

    add_review = Review(
        content = review_data['reviewContent'],
        stars = review_data['reviewStars'],
        user_id = current_user.id,
        business_id = review_data['busId']
    )
    db.session.add(add_review)
    db.session.commit()
    return add_review.to_dict()

@review_routes.route('/', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews])
