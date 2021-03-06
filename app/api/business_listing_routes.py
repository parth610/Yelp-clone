from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, business, db
from app.forms import BusinessForm
from .auth_routes import validation_errors_to_error_messages
from app.aws_uploads.aws_helper_funcs import (allowed_file, get_unique_filename, upload_file_to_s3)

business_routes = Blueprint('business', __name__)

@business_routes.route('/', methods=['POST'])
@login_required
def create_business_listing():
    print('...................')
    # business_data = request.get_json(force=True)
    print('--------------------')
    form = BusinessForm()

    files = request.files.getlist('images')
    print(files, '......................')
    print(form.data, 'mndawdawkd;////////')
    photos_dict = {}
    for i in range(len(files)):
        if not allowed_file(files[i].filename):
            return {'errors': validation_errors_to_error_messages({"photos": ["file type not supported"]})}
        files[i].filename = get_unique_filename(files[i].filename)
        print(files[i].filename, '...............//////////////')
        upload = upload_file_to_s3(files[i])
        print(upload, '...............//////////////')
        if "url" not in upload:
            return upload, 400
        url = upload["url"]
        photos_dict[f"{i}"] = url

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
            business_type = request.form['businessType'],
            photos = photos_dict

        )
        db.session.add(business_listing)
        db.session.commit()
        return business_listing.to_dict()
    print(form.errors)
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
