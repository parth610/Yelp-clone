import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";

const ReviewsFormComponent = ({bus, setShowReviewForm}) => {

    const dispatch = useDispatch()

    const [reviewContent, SetReviewContent] = useState('')
    const [reviewStars, setReviewStars] = useState(0)

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        const reviewData = {
            reviewContent,
            reviewStars,
            business_id: bus.id
        }

        await dispatch(createReview(dispatch(reviewData)))
        setShowReviewForm(0)
    }

    return (
        <div>
            <form onSubmit={handleReviewSubmit}>
            <input value={reviewStars} onChange={(e) => setReviewStars(e.target.value)} />
            <textarea value={reviewContent} onChange={(e) => SetReviewContent(e.target.value)}>
            </textarea>
            <button type="submit">
                Submit
            </button>
            </form>
            <button onClick={e => setShowReviewForm(0)}>Cancel</button>
        </div>
    )
}

export default ReviewsFormComponent;
