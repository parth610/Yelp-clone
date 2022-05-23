import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../store/reviews";
import RatingComponent from "../BusinessFormComponent/RatingComponent";
import '../BusinessFormComponent/RatingFormComponentStyle.css'

const ReviewEditFormComponent = ({review, setShowReviewEditForm}) => {

    const dispatch = useDispatch()

    const [editreviewContent, setEditReviewContent] = useState(review.content)
    const [editreviewStars, setEditReviewStars] = useState(review.stars)
    const [editreviewErrors, seteditReviewErrors] = useState([])
    const [showeditreviewErrors, setShoweditreviewErrors] = useState(false)

    useEffect(() => {
        const errors = []
        if (editreviewStars < 1) errors.push('please select the ratings before submitting.');
        if (editreviewContent.length > 300) errors.push('review should be less than 300 characters.')
        seteditReviewErrors(errors)
    }, [editreviewStars, editreviewContent])

    const handleEditReviewSubmit = async (e) => {
        e.preventDefault()
        const updatedData = {
            rev_id: review.id,
            editreviewContent,
            editreviewStars
        }
        if (editreviewErrors < 1) {

            await dispatch(updateReview(updatedData))
            setShowReviewEditForm(0)
        } else {
            setShoweditreviewErrors(true)
        }
    }

    return (
        <div className="add-review-form-container" onClick={(e) => e.stopPropagation()}>
            <form className="add-review-form" onSubmit={handleEditReviewSubmit}>
            <div className="review-form-errors">{showeditreviewErrors && editreviewErrors?.map(error => (
                    <div key={error}>{error}</div>
                ))}</div>
            <label className="add-review-form-label">Update your rating</label>
            <RatingComponent className='add-review-form-rating' reviewStars={editreviewStars} setReviewStars={setEditReviewStars} />
            <label className="add-review-form-label">Write your experience that you want to share with people. (optional)</label>
            <div className="character-limit-review">character limit {(300 - editreviewContent.length) < 0 ? '0' : (300 - editreviewContent.length)}</div>
            <textarea className="add-review-form-textarea" value={editreviewContent} onChange={(e) => setEditReviewContent(e.target.value)}>
            </textarea>
            <button className="add-review-submit-button" type="submit">
                Update
            </button>
            </form>
            {/* <button onClick={e => setShowReviewEditForm(0)}>Cancel</button> */}
        </div>
    )
}

export default ReviewEditFormComponent
