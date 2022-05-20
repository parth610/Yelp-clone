import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";
import RatingComponent from "./RatingComponent";
import './RatingFormComponentStyle.css'

const ReviewsFormComponent = ({bus, setShowReviewForm}) => {

    const dispatch = useDispatch()

    const [reviewContent, setReviewContent] = useState('')
    const [reviewStars, setReviewStars] = useState(0)
    const [reviewErrors, setReviewErrors] = useState([])
    const [showreviewErrors, setShowreviewErrors] = useState(false)

    useEffect(() => {
        const errors = []
        if (reviewStars < 1) errors.push('please select the ratings before submitting.');
        if (reviewContent.length > 300) errors.push('review should be less than 300 characters.')
        setReviewErrors(errors)
    }, [reviewStars, reviewContent])

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        const reviewData = {
            reviewContent,
            reviewStars,
            busId: bus.id
        }
        if (reviewErrors < 1) {
            await dispatch(createReview(reviewData))
            setShowReviewForm(0)
        } else {
            setShowreviewErrors(true)
        }
    }

    return (
        <div className="add-review-form-container" onClick={(e) => e.stopPropagation()}>
            <form className="add-review-form" onSubmit={handleReviewSubmit}>
                <div className="review-form-errors">{showreviewErrors && reviewErrors?.map(error => (
                    <div key={error}>{error}</div>
                ))}</div>
            <label className="add-review-form-label">Rate your experience with {bus.name}</label>
            <RatingComponent className='add-review-form-rating' reviewStars={reviewStars} setReviewStars={setReviewStars} />
            <label className="add-review-form-label">Write your experience that you want to share with people. (optional)</label>
            <div className="character-limit-review">character limit {300 - reviewContent.length}</div>
            <textarea className="add-review-form-textarea" value={reviewContent} onChange={(e) => setReviewContent(e.target.value)}>
            </textarea>
            <button className="add-review-submit-button" type="submit">
                Submit
            </button>
            </form>
            {/* <button className="" onClick={e => setShowReviewForm(0)}>Cancel</button> */}
        </div>
    )
}

export default ReviewsFormComponent;
