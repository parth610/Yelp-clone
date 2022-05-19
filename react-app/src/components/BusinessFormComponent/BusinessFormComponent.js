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
        const fD = new FormData()
        for (let i = 0; i < photos.length; i++) {
            fD.append('images', photos[i])
        }
        fD.append('name', title)
        fD.append('about', about)
        fD.append('phone_number', phoneNumber)
        fD.append('street_address', streetAddress)
        fD.append('city', city)
        fD.append('state', state)
        fD.append('zip_code', zipCode)
        fD.append('businessType', businessType)

        await dispatch(createBusiness(fD))
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
            <select placeholder="Business Title"
                   onChange={e => setBusinessType(e.target.value)}
            >
                <option value=''>--Business type--</option>
                <option value='food'>Food</option>
                <option value='hotel'>Hotel</option>
                <option value='transportation'>Transportation</option>
                <option value='entertainment'>Entertainment</option>
            </select>
            <label>Upload Pictures(optional)</label>
            <input placeholder="Photos"
                    type="file"
                    multiple
                   onChange={e => setPhotos(e.target.files)}
            >
            </input>
            <button type="submit">Create</button>
        </form>
    )
}

export default BusinessFormComponent;
