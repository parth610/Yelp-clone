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
    const averageSumRating = (objArr) => {
        let sum = 0
        for (let obj in objArr) {
            sum += objArr[obj].stars
        }
        return sum / objArr.length
    }
    const averageRating = averageSumRating(relatedReviews);

    const [showReviewForm, setShowReviewForm] = useState(0)
    const [showReviewEditForm, setShowReviewEditForm] = useState(0)
    const [showReviewDeleteModal, setShowReviewDeleteModal] = useState(0)

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch, busId])

    useEffect(() => {
        dispatch(getReviews())
    }, [dispatch, busId])

    const deleteReviewHandle = async (e) => {
        await dispatch(removeReview(+e.target.id))
    }

console.log(isNaN(averageRating), averageRating)
    return (
        <div className="bus-solo-view-container">
            <div className="bus-photos-container">
                {
                    // currBusiness?.photos && Object.values(currBusiness?.photos) ? Object.values(currBusiness.photos).slice(0, 2).map(photo => (
                    //     <div className="solo-ind-img-box" key={photo}>
                    //         <img className="solo-ind-img" src={photo}></img>
                    //     </div>
                    // )) :
                     <div className="solo-ind-img-box-no-photos"></div>
                }
                <div className="gradient-on-photos"></div>
                <div className="bus-solo-name-and-ratings">
                    <div className="bus-solos-name">{currBusiness?.name}</div>
                    <div className="bus-solo-type">
                    {currBusiness?.business_type}
                    </div>
                    <div>
                        {isNaN(averageRating) ? 'Not Rated' : averageRating.toFixed(1)}
                        {
                            [...Array(5)].map((star, i) => {
                                const starId = i + 1;
                                return(
                                    <label key={starId}>
                                        <i className="fas fa-star" id={starId <= averageRating ? 'yellow-star-rate': 'grey-star-rate'}></i>
                                  </label>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="bus-solo-info">
                <div className="bus-solo-basic-info">
                <div>
                    Phone: {currBusiness?.phone_number}
                </div>
                <div>
                    Street Address: {currBusiness?.street_address}
                </div>
                <div>
                    {currBusiness?.city} {currBusiness?.state}, {currBusiness?.zip_code}
                </div>
                </div>
                <div className="bus-solo-info-about">
                    <div className="bus-solo-about-text">Abouth this Business</div>{currBusiness?.about}
                </div>
            </div>
            <div className="bus-reviews">
                {
                user?.user?.id !== currBusiness?.creator_id &&
                <div>
                    <button className="bus-solo-add-review-button" onClick={() => setShowReviewForm(currBusiness?.id)}>Add Review</button>
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
                        <div className="reviews-solo-container" key={review.id}>
                            <div>
                                {review.username}
                            </div>
                            <div>
                                {review.stars}
                                {
                            [...Array(5)].map((star, i) => {
                                const starId = i + 1;
                                return(
                                    <label key={starId}>
                                        <i className="fas fa-star" id={starId <= review.stars ? 'yellow-star-rate': 'grey-star-rate'}></i>
                                  </label>
                                )
                            })
                        }
                            </div>
                            <div className="review-content-text">
                                {review?.content}
                            </div>
                            {
                                user?.user?.id === review.user_id &&
                                <div className="edit-delete-review-buttons-container">
                                    <button className="review-edit-button" onClick={() => setShowReviewEditForm(review.id)}>Edit</button>
                                    <button className="review-delete-button" id={review.id} onClick={() => setShowReviewDeleteModal(review.id)}>Delete</button>
                                </div>
                            }
                            {
                                showReviewEditForm === review.id &&
                                <div className="review-edit-form-solo" onClick={() => setShowReviewEditForm(0)}>
                                    <ReviewEditFormComponent review={review} setShowReviewEditForm={setShowReviewEditForm} />
                                </div>
                            }
                            {
                                        showReviewDeleteModal === review.id &&
                                        <div className="delete-modal-bg" onClick={() => setShowReviewDeleteModal(0)}>
                                            <div className="delete-modal-container" onClick={(e) => e.stopPropagation()}>
                                                <p>Are you sure you want to delete this review?</p>
                                                <button id={review.id} className="delete-bus-modal-button" onClick={deleteReviewHandle}>Delete</button>
                                                <button className="delete-cancel-bus-modal-button" onClick={() => setShowReviewDeleteModal(0)}>Cancel</button>
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

export default BusinessSoloComponenent;
