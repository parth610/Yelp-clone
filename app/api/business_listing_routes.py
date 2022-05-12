from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, business, db
from app.forms import BusinessForm
from .auth_routes import validation_errors_to_error_messages

business_routes = Blueprint('business', __name__)

@business_routes.route('/', methods=['POST'])
@login_required
def create_business_listing():
    business_data = request.get_json(force=True)
    form = BusinessForm()
    print(business_data, '........................')
    print(form.data['name'], '--------------------------------')
    # return {'checking': True}
    check_type = business_data['businessType']
    print(form.errors)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business_listing = Business(
            creator_id = current_user.id,
            name = form.data['name'],
            about = form.data['about'],
            phone_number = form.data['phone_number'],
            street_address = form.data['street_address'],
            city = form.data['city'],
            state = form.data['state'],
            zip_code = form.data['zip_code'],
            hotel = True,
            food = True,
            transportation = False,
            entertainment = False
        )
        db.session.add(business_listing)
        db.session.commit()
        return business_listing.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@business_routes.route('/', methods=['GET'])
def get_businesses():
    businesses = Business.query.all()
    return jsonify([business.to_dict() for business in businesses])
