import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";

const ReviewsFormComponent = ({bus, setShowReviewForm}) => {

    const dispatch = useDispatch()

    const [reviewContent, setReviewContent] = useState('')
    const [reviewStars, setReviewStars] = useState(0)

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        const reviewData = {
            reviewContent,
            reviewStars,
            busId: bus.id
        }

        await dispatch(createReview(reviewData))
        setShowReviewForm(0)
    }

    return (
        <div>
            <form onSubmit={handleReviewSubmit}>
            <input value={reviewStars} onChange={(e) => setReviewStars(e.target.value)} />
            <textarea value={reviewContent} onChange={(e) => setReviewContent(e.target.value)}>
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
