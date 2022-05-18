from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, business, db, review

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
    print('.........', reviews[0].to_dict())
    return jsonify([review.to_dict() for review in reviews])

@review_routes.route('/<int:rev_id>', methods=['PUT'])
@login_required
def edit_reviews(rev_id):
    review = Review.query.get(rev_id)

    updated_data = request.get_json(force=True)
    if current_user.id == review.user_id:
        review.content = updated_data['editreviewContent']
        review.stars = updated_data['editreviewStars']
    db.session.commit()
    return review.to_dict()

@review_routes.route('/<int:rev_id>', methods=['DELETE'])
@login_required
def delete_review(rev_id):
    review = Review.query.get(rev_id)
    if current_user.id == review.user_id:
        db.session.delete(review)
        db.session.commit()
        return review.to_dict()
    else:
        return
