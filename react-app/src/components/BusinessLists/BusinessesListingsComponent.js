import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBusinesses, removeBusiness } from "../../store/businessListings";
import BusinessEditFormComponent from "../BusinessFormComponent/BusinessEditFormComponent";
import ReviewsFormComponent from "../BusinessFormComponent/ReviewsFormComponent";
import './BusinessLists.css'

const BusinessListingComponent = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const allBusinesses = useSelector(state => Object.values(state.businessListingReducer))
    const user = useSelector(state => state.session)


    const [showEditForm, setShowEditForm] = useState(0)
    const [showReviewForm, setShowReviewForm] = useState(0)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    const editFormHandle = (e) => {
        e.preventDefault();

        setShowEditForm(+e.target.id)
    }


    const businessinfoView = (e) => {
        const busId = +e.currentTarget.id;
        history.push(`/business/${busId}`)
    }

    const deleteBusinessHandle = async (e) => {
        const busId = e.currentTarget.id;

        await dispatch(removeBusiness(+busId))
    }

    return (
        <div className="business-listing-page">
        <div className="business-listings-container">

            {
                allBusinesses?.map(bus => (
                    <div className='business-info-container' key={bus.id}>
                        <div id={bus.id} className="bus-info-card" onClick={businessinfoView}>
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
                                <button id={bus.id} onClick={editFormHandle}>
                                    Edit
                                </button>
                            </div>
                        }
                        <button id = {bus.id} onClick={(e) => setShowReviewForm(bus.id)}>Add Review</button>
                        { showEditForm === bus.id &&
                        <div className="business-edit-form">
                            <BusinessEditFormComponent bus = {bus} setShowEditForm={setShowEditForm} />
                        </div>
                        }
                        {
                            showReviewForm === bus.id &&
                            <div>
                                <ReviewsFormComponent bus = {bus} setShowReviewForm={setShowReviewForm} />
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
