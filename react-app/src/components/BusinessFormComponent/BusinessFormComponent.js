import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBusiness } from "../../store/businessListings";

const BusinessFormComponent = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [photos, setPhotos] = useState('')
    const [businessType, setBusinessType] = useState('')

    const submitBusiness = async (e) => {
        e.preventDefault();
        const businessData = {
            name: title,
            about,
            phone_number: phoneNumber,
            street_address: streetAddress,
            city,
            state,
            zip_code: zipCode,
            photos,
            businessType
        }
        await dispatch(createBusiness(businessData))
    }

    return (
        <form onSubmit={submitBusiness} className="business-listing-form">
            <input placeholder="Business Title"
                   value={title}
                   onChange={e => setTitle(e.target.value)}
            >
            </input>
            <input placeholder="About"
                   value={about}
                   onChange={e => setAbout(e.target.value)}
            >
            </input>
            <input placeholder="Phone Number"
                    type='tel'
                   value={phoneNumber}
                   onChange={e => setPhoneNumber(e.target.value)}
            >
            </input>
            <input placeholder="Street Address"
                   value={streetAddress}
                   onChange={e => setStreetAddress(e.target.value)}
            >
            </input>
            <input placeholder="City"
                   value={city}
                   onChange={e => setCity(e.target.value)}
            >
            </input>
            <input placeholder="State"
                   value={state}
                   onChange={e => setState(e.target.value)}
            >
            </input>
            <input placeholder="Zip Code"
                   value={zipCode}
                   type='number'
                   onChange={e => setZipCode(e.target.value)}
            >
            </input>
            <input placeholder="Photos"
                   value={photos}
                   onChange={e => setPhotos(e.target.value)}
            >
            </input>
            <select placeholder="Business Title"
                   onChange={e => setBusinessType(e.target.value)}
            >
                <option value=''>--Business type--</option>
                <option value='food'>Food</option>
                <option value='hotel'>Hotel</option>
                <option value='transportation'>Transportation</option>
                <option value='entertainment'>Entertainment</option>
            </select>
            <button type="submit">Create</button>
        </form>
    )
}

export default BusinessFormComponent;
