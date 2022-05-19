import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editBusiness } from "../../store/businessListings";
import './BusinessEditForm.css'


const BusinessEditFormComponent = ({bus, setShowEditForm}) => {

    const dispatch = useDispatch()

    const [edittitle, setEditTitle] = useState(bus?.name)
    const [editabout, setEditAbout] = useState(bus?.about)
    const [editphoneNumber, setEditPhoneNumber] = useState(bus?.phone_number)
    const [editstreetAddress, setEditStreetAddress] = useState(bus?.street_address)
    const [editcity, setEditCity] = useState(bus?.city)
    const [editstate, setEditState] = useState(bus?.state)
    const [editzipCode, setEditZipCode] = useState(bus?.zip_code)
    const [editphotos, setEditPhotos] = useState('')
    const [editbusinessType, setEditBusinessType] = useState(bus?.businessType)
    const [editErrors, setEditErrors] = useState([])


    const editBusinessInfo = async (e) => {
        e.preventDefault()
        const editedInfoData = {
            busId: bus.id,
            creatorId: bus.creator_id,
            name: edittitle,
            about: editabout,
            phone_number: editphoneNumber,
            street_address: editstreetAddress,
            city: editcity,
            state: editstate,
            zip_code: editzipCode,
            photos: editphotos,
            businessType: editbusinessType
        }
        if (editErrors.length < 1) {
            await dispatch(editBusiness(editedInfoData))
            setShowEditForm(0)
        }
    }

    return (
        <div className="business-info-edit-form-container" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={editBusinessInfo} className="business-listing-form">
                <label></label>
            <input placeholder="Business Title"
                   value={edittitle}
                   onChange={e => setEditTitle(e.target.value)}
            >
            </input>
            <label></label>
            <input placeholder="About"
                   value={editabout}
                   onChange={e => setEditAbout(e.target.value)}
            >
            </input>
            <label></label>
            <input placeholder="Phone Number"
                    type='tel'
                   value={editphoneNumber}
                   onChange={e => setEditPhoneNumber(e.target.value)}
            >
            </input>
            <label></label>
            <input placeholder="Street Address"
                   value={editstreetAddress}
                   onChange={e => setEditStreetAddress(e.target.value)}
            >
            </input>
            <label></label>
            <input placeholder="City"
                   value={editcity}
                   onChange={e => setEditCity(e.target.value)}
            >
            </input>
            <label></label>
            <input placeholder="State"
                   value={editstate}
                   onChange={e => setEditState(e.target.value)}
            >
            </input>
            <label></label>
            <input placeholder="Zip Code"
                   value={editzipCode}
                   type='number'
                   onChange={e => setEditZipCode(e.target.value)}
            >
            </input>
            <label></label>
            <input placeholder="Photos"
                   value={editphotos}
                   onChange={e => setEditPhotos(e.target.value)}
            >
            </input>
            <label></label>
            <select placeholder="Business Title"
                value={editbusinessType}
                   onChange={e => setEditBusinessType(e.target.value)}
            >
                <option value=''>--Business type--</option>
                <option value='food'>Food</option>
                <option value='hotel'>Hotel</option>
                <option value='transportation'>Transportation</option>
                <option value='entertainment'>Entertainment</option>
            </select>
            <button type="submit">Save</button>
        </form>
            <button onClick={(e) => setShowEditForm(0)}>Cancel</button>
        </div>
    )
}

export default BusinessEditFormComponent;
