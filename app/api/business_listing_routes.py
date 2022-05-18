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
            business_type = business_data['businessType']
        )
        db.session.add(business_listing)
        db.session.commit()
        return business_listing.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@business_routes.route('/', methods=['GET'])
def get_businesses():
    businesses = Business.query.all()
    return jsonify([business.to_dict() for business in businesses])

@business_routes.route('/<int:bus_id>', methods=['PUT'])
@login_required
def edit_business_listing(bus_id):
    sel_business = Business.query.get(bus_id)

    updated_data = request.get_json(force=True)
    if current_user.id == sel_business.creator_id:
        sel_business.name = updated_data['name']
        sel_business.about = updated_data['about'],
        sel_business.phone_number = updated_data['phone_number'],
        sel_business.street_address = updated_data['street_address'],
        sel_business.city = updated_data['city'],
        sel_business.state = updated_data['state'],
        sel_business.zip_code = updated_data['zip_code'],
        sel_business.business_type = updated_data['businessType']
    db.session.commit()
    return sel_business.to_dict()


@business_routes.route('/<int:bus_id>', methods=['DELETE'])
@login_required
def delete_business_listing(bus_id):
    print('-------------------------')
    sel_business = Business.query.get(bus_id)
    print(sel_business, '........................')
    if current_user.id == sel_business.creator_id:
        db.session.delete(sel_business)
        db.session.commit()
        return sel_business.to_dict()
    else:
        return
