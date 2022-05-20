import React, { useState, useEffect } from "react";
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
    // const [editphotos, setEditPhotos] = useState('')
    const [editbusinessType, setEditBusinessType] = useState(bus?.businessType)
    const [editErrors, setEditErrors] = useState([])
    const [showEditErrors, setShowEditErrors] = useState(false)

    console.log(edittitle, editabout, editphoneNumber, editstreetAddress, editcity, editstate, editzipCode, editbusinessType)

    useEffect(() => {
        const errorsData = []
        if (edittitle?.length < 1) errorsData.push('Title-field is required')
        if (editabout?.length < 1) errorsData.push('About-field is required')
        if (editabout?.length > 500) errorsData.push('About field character limit is 500')
        if (editphoneNumber?.length < 1) errorsData.push('Phone Number-field is required')
        if (editstreetAddress?.length < 1) errorsData.push('Street Address-field is required')
        if (editcity?.length < 1) errorsData.push('City-field is required')
        if (editstate?.length < 1) errorsData.push('State-field is required')
        if (editzipCode?.length < 1) errorsData.push('ZipCode-field is required')
        if (!editbusinessType || editbusinessType?.length < 1) errorsData.push('Select Business Type')

        setEditErrors(errorsData)
 }, [edittitle, editabout, editphoneNumber, editstreetAddress, editcity, editstate, editzipCode, editbusinessType])

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
            // photos: editphotos,
            businessType: editbusinessType
        }
        if (editErrors.length < 1) {
            await dispatch(editBusiness(editedInfoData))
            setShowEditForm(0)
        } else {
            setShowEditErrors(true)
        }
    }

    return (
        <div className="business-info-edit-form-container" >
            <form onSubmit={editBusinessInfo} className="business-listing-edit-form" onClick={(e) => e.stopPropagation()}>
                {
                showEditErrors && editErrors?.map(error => (
                    <div  key={error}>
                        <div className="bus-edit-form-errors">{error}</div>
                    </div>
                ))
                }
                <label>Business Title</label>
            <input placeholder="Business Title"
                    className="bus-edit-form-inputs"
                   value={edittitle}
                   onChange={e => setEditTitle(e.target.value)}
            >
            </input>
            <label>About</label>
            <input placeholder="About"
                    className="bus-edit-form-inputs"
                   value={editabout}
                   onChange={e => setEditAbout(e.target.value)}
            >
            </input>
            <label>Phone Number</label>
            <input placeholder="Phone Number"
                    className="bus-edit-form-inputs"
                    type='tel'
                   value={editphoneNumber}
                   onChange={e => setEditPhoneNumber(e.target.value)}
            >
            </input>
            <label>Street Address</label>
            <input placeholder="Street Address"
                    className="bus-edit-form-inputs"
                   value={editstreetAddress}
                   onChange={e => setEditStreetAddress(e.target.value)}
            >
            </input>
            <label>City</label>
            <input placeholder="City"
                    className="bus-edit-form-inputs"
                   value={editcity}
                   onChange={e => setEditCity(e.target.value)}
            >
            </input>
            <label>State</label>
            <input placeholder="State"
                    className="bus-edit-form-inputs"
                   value={editstate}
                   onChange={e => setEditState(e.target.value)}
            >
            </input>
            <label>Zip Code</label>
            <input placeholder="Zip Code"
                    className="bus-edit-form-inputs"
                   value={editzipCode}
                   type='number'
                   onChange={e => setEditZipCode(e.target.value)}
            >
            </input>
            {/* <label>Photos</label>
            <input placeholder="Photos"
                   value={editphotos}
                   onChange={e => setEditPhotos(e.target.value)}
            > */}
            {/* </input> */}
            <label>Business Title</label>
            <select placeholder="Business Title"
                value={editbusinessType}
                   onChange={e => setEditBusinessType(e.target.value)}
                className="bus-edit-form-inputs"
            >
                <option value=''>--Business type--</option>
                <option value='food'>Food</option>
                <option value='hotel'>Hotel</option>
                <option value='transportation'>Transportation</option>
                <option value='entertainment'>Entertainment</option>
            </select>
            <button className="bus-edit-form-submit-button" type="submit">Update</button>
        </form>
        </div>
    )
}

export default BusinessEditFormComponent;
