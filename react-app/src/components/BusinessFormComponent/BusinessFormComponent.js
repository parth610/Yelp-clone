import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { createBusiness } from "../../store/businessListings";
import './BusinessFormStyle.css'

const BusinessFormComponent = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [photos, setPhotos] = useState('')
    const [businessType, setBusinessType] = useState('')
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

       useEffect(() => {
              const errorsData = []
              if (title.length < 1) errorsData.push('Title-field is required')
              if (about.length < 1) errorsData.push('About-field is required')
              if (about.length > 500) errorsData.push('About field character limit is 500')
              if (phoneNumber.length < 1) errorsData.push('Phone Number-field is required')
              if (streetAddress.length < 1) errorsData.push('Street Address-field is required')
              if (city.length < 1) errorsData.push('City-field is required')
              if (state.length < 1) errorsData.push('State-field is required')
              if (zipCode.length < 1) errorsData.push('ZipCode-field is required')
              if (businessType.length < 1) errorsData.push('Select Business Type')

              setErrors(errorsData)
       }, [title, about, phoneNumber, streetAddress, city, state, zipCode, businessType])

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
        if (errors.length < 1) {
              await dispatch(createBusiness(fD))
              history.push('/businesses-lists')
       } else {
              setShowErrors(true)
       }

    }

    return (
           <div className="bus-form-container">
        <form onSubmit={submitBusiness} className="business-listing-form">
        <div className='bus-form-errors'>
        {showErrors && errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
            <input placeholder="Business Title"
            className='bus-form-inputs'
                   value={title}
                   onChange={e => setTitle(e.target.value)}
            >
            </input>
            <input placeholder="About"
            className='bus-form-inputs'
                   value={about}
                   onChange={e => setAbout(e.target.value)}
            >
            </input>
            <input placeholder="Phone Number"
            className='bus-form-inputs'
                    type='tel'
                   value={phoneNumber}
                   onChange={e => setPhoneNumber(e.target.value)}
            >
            </input>
            <input placeholder="Street Address"
            className='bus-form-inputs'
                   value={streetAddress}
                   onChange={e => setStreetAddress(e.target.value)}
            >
            </input>
            <input placeholder="City"
            className='bus-form-inputs'
                   value={city}
                   onChange={e => setCity(e.target.value)}
            >
            </input>
            <input placeholder="State"
            className='bus-form-inputs'
                   value={state}
                   onChange={e => setState(e.target.value)}
            >
            </input>
            <input placeholder="Zip Code"
            className='bus-form-inputs'
                   value={zipCode}
                   type='number'
                   onChange={e => setZipCode(e.target.value)}
            >
            </input>
            <select placeholder="Business Title"
            className='bus-form-inputs'
                   onChange={e => setBusinessType(e.target.value)}
            >
                <option value=''>--Business type--</option>
                <option value='food'>Food</option>
                <option value='hotel'>Hotel</option>
                <option value='transportation'>Transportation</option>
                <option value='entertainment'>Entertainment</option>
            </select>
            <label className="upload-picture">Upload Pictures (optional)

            <input placeholder="Photos"
                     className="choose-file-input"
                    type="file"
                    multiple
                    onChange={e => setPhotos(e.target.files)}
                    >
            </input>
                   </label>
            <button className="bus-form-button" type="submit">Create</button>
        </form>
           </div>
    )
}

export default BusinessFormComponent;
