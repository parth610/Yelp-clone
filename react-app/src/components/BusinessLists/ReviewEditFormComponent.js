import React, { useDebugValue, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../store/reviews";

const ReviewEditFormComponent = ({review, setShowReviewEditForm}) => {

    const dispatch = useDispatch()

    const [editreviewContent, setEditReviewContent] = useState(review.content)
    const [editreviewStars, setEditReviewStars] = useState(review.stars)

    const handleEditReviewSubmit = async (e) => {
        e.preventDefault()
        const updatedData = {
            rev_id: review.id,
            editreviewContent,
            editreviewStars
        }
        await dispatch(updateReview(updatedData))
        setShowReviewEditForm(0)
    }

    return (
        <div>
            <form onSubmit={handleEditReviewSubmit}>
            <input value={editreviewStars} onChange={(e) => setEditReviewStars(e.target.value)} />
            <textarea value={editreviewContent} onChange={(e) => setEditReviewContent(e.target.value)}>
            </textarea>
            <button type="submit">
                Update
            </button>
            </form>
            <button onClick={e => setShowReviewEditForm(0)}>Cancel</button>
        </div>
    )
}

export default ReviewEditFormComponent
