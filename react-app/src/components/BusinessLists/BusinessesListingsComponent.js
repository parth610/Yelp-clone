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
    const [showUserButtons, setShowUserButtons] = useState(0)
    const [showDeleteModal, setShowDeleteModal] = useState(0)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    const editFormHandle = (e) => {
        e.preventDefault();

        setShowEditForm(+e.target.id)
        setShowUserButtons(0)
    }

    const deleteModalHandle = (e) => {
        e.preventDefault();

        setShowDeleteModal(+e.target.id)
        setShowUserButtons(0)
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
                        <div id={bus.id} className="bus-info-card" >
                            <div className="bus-info-text">
                                <div className="bus-type-cont">
                                    {bus.business_type}
                                </div>
                                <div className="bus-info-name">
                                {bus.name}
                                </div>
                                {/* <div className="bus-info-about">
                                    {bus.about}
                                </div> */}
                                <div className="bus-phone-number">
                                    PHONE: {bus.phone_number}
                                </div>
                                <div>
                                    {bus.street_address}
                                </div>
                                <div>
                                    {bus.city} {bus.state}, {bus.zip_code}
                                </div>
                                <div className="bus-info-card-buttons">
                                    <button className="view-solo-bus-button" id={bus.id} onClick={businessinfoView}>View Page </button>
                                    { user?.user?.id !== bus?.creator_id &&
                                        <button className="hm-review-add-button" id = {bus.id} onClick={(e) => setShowReviewForm(bus.id)}>Add Review</button>
                                        }
                                    {user?.user !== null && user?.user.id === bus.creator_id &&  <div onClick={() => setShowUserButtons(bus.id)} className="bus-info-options"><i className="fas fa-ellipsis-v"></i></div>}
                                    {showUserButtons === bus.id && user?.user !== null && user?.user.id === bus.creator_id &&
                                        <div className="user-bus-edit-buttons">
                                            <div onClick={(() => setShowUserButtons(0))} className="user-bus-edit-buttons-bg">
                                            </div>
                                            <button id={bus.id} onClick={editFormHandle}>
                                                Edit
                                            </button>
                                            <button id={bus.id} onClick={deleteModalHandle}>
                                                Delete
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="bus-images-container">
                                { bus.photos && Object.values(bus.photos).length > 0 ?
                                        <div className="bus-ind-photo-container">
                                            <img className="bus-ind-photo" src={bus.photos["0"]}></img>
                                        </div>
                                    :
                                    <div className="no-photos-container"></div>
                                }
                            </div>
                        </div>
                        { showEditForm === bus.id &&
                        <div className="business-edit-form" onClick={() => setShowEditForm(false)}>
                            <BusinessEditFormComponent bus = {bus} setShowEditForm={setShowEditForm} />
                        </div>
                        }
                        {
                            showReviewForm === bus.id &&
                            <div className="add-review-home" onClick={() => setShowReviewForm(false)}>
                                <ReviewsFormComponent bus = {bus} setShowReviewForm={setShowReviewForm} />
                            </div>
                        }
                        {
                            showDeleteModal === bus.id &&
                            <div className="delete-modal-bg" onClick={() => setShowDeleteModal(0)}>
                                <div className="delete-modal-container" onClick={(e) => e.stopPropagation()}>
                                    <p>Are you sure you want to delete {bus.name}?</p>
                                    <button id={bus.id} className="delete-bus-modal-button" onClick={deleteBusinessHandle}>Delete</button>
                                    <button className="delete-cancel-bus-modal-button" onClick={() => setShowDeleteModal(0)}>Cancel</button>
                                </div>
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
