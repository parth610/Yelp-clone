import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, removeBusiness } from "../../store/businessListings";
import BusinessEditFormComponent from "../BusinessFormComponent/BusinessEditFormComponent";

const BusinessListingComponent = () => {

    const dispatch = useDispatch()
    const allBusinesses = useSelector(state => Object.values(state.businessListingReducer))
    const user = useSelector(state => state.session)

    const [showEditForm, setShowEditForm] = useState(false)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])


    const deleteBusinessHandle = async (e) => {
        const busId = e.currentTarget.id;

        await dispatch(removeBusiness(+busId))
    }

    return (
        <div className="business-listing-page">
        <div className="business-listings-container">

            {
                allBusinesses?.map(bus => (
                    <div key={bus.id}>
                        <div className="bus-info-card">
                            <div className="bus-info-name">
                            {bus.name}
                            </div>
                            <div>
                                {bus.business_type}
                            </div>
                            <div className="bus-info-about">
                                {bus.about}
                            </div>
                            <div>
                                {bus.phone_number}
                            </div>
                            <div>
                                {bus.street_address}
                            </div>
                            <div>
                                {bus.city} {bus.state}, {bus.zip_code}
                            </div>
                        </div>
                        { user?.user !== null && user?.user.id === bus.creator_id &&
                            <div>
                                <button id={bus.id} onClick={deleteBusinessHandle}>
                                    Delete
                                </button>
                                <button onClick={() => setShowEditForm(true)}>
                                    Edit
                                </button>
                            </div>
                        }
                        <button>Add Review</button>
                        { showEditForm &&
                        <div className="business-edit-form">
                            <BusinessEditFormComponent bus = {bus} />
                        </div>
                        }
                    </div>
                ))
            }
        </div>
        </div>
    )
}

export default BusinessListingComponent;
