import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from "../../store/businessListings";
import { getReviews, removeReview } from "../../store/reviews";
import ReviewsFormComponent from "../BusinessFormComponent/ReviewsFormComponent";
import ReviewEditFormComponent from "./ReviewEditFormComponent";
import './BusinessSoloStyle.css'


const BusinessSoloComponenent = () => {
    const dispatch = useDispatch()
    const {busId} = useParams()
    const allBusinesses = useSelector(state => Object.values(state.businessListingReducer))
    const allReviews = useSelector(state => Object.values(state.reviewsReducer))
    const user = useSelector(state => state.session)

    const currBusiness = allBusinesses.find(bus => bus.id === +busId)
    const relatedReviews = allReviews.filter(rev => rev.business_id === +busId)
    console.log(user)

    const [showReviewForm, setShowReviewForm] = useState(0)
    const [showReviewEditForm, setShowReviewEditForm] = useState(0)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch, busId])

    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch, busId])

    const deleteReviewHandle = async (e) => {
        await dispatch(removeReview(+e.target.id))
    }

    return (
        <div>
            <div className="bus-solo-info">
                <div>
                {currBusiness?.name}
                </div>
                <div>
                    {currBusiness?.business_type}
                </div>
                <div className="bus-info-about">
                    {currBusiness?.about}
                </div>
                <div>
                    {currBusiness?.phone_number}
                </div>
                <div>
                    {currBusiness?.street_address}
                </div>
                <div>
                    {currBusiness?.city} {currBusiness?.state}, {currBusiness?.zip_code}
                </div>
            </div>
            <div className="bus-reviews">
                {
                user?.user?.id !== currBusiness?.creator_id &&
                <div>
                    <button onClick={() => setShowReviewForm(currBusiness?.id)}>Add Review</button>
                </div>}
                {
                            showReviewForm === currBusiness?.id &&
                            <div className="review-form-bg-solo" onClick={() => setShowReviewForm(0)}>
                                <ReviewsFormComponent bus = {currBusiness} setShowReviewForm={setShowReviewForm} />
                            </div>
                        }
                    <div>
                        <h1>
                        Reviews
                        </h1>
                    </div>
                {
                    relatedReviews?.map(review => (
                        <div key={review.id}>
                            <div>
                                {review.stars}
                            </div>
                            <div>
                                {review?.content}
                            </div>
                            {
                                user?.user?.id === review.user_id &&
                                <div>
                                    <button onClick={() => setShowReviewEditForm(review.id)}>Edit</button>
                                    <button id={review.id} onClick={deleteReviewHandle}>Delete</button>
                                </div>
                            }
                            {
                                showReviewEditForm === review.id &&
                                <div className="review-edit-form-solo" onClick={() => setShowReviewEditForm(0)}>
                                    <ReviewEditFormComponent review={review} setShowReviewEditForm={setShowReviewEditForm} />
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default BusinessSoloComponenent;
