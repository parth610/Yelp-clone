const ADD_REVIEW = 'review/create'
const LOAD_REVIEWS = 'review/load'
const EDIT_REVIEW = 'review/edit'
const DELETE_REVIEW = 'review/delete'

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const editReview = (review) => ({
    type: EDIT_REVIEW,
    review
})

const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

export const updateReview = (reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewData.rev_id}`, {
        method: 'PUT',
        body: JSON.stringify(reviewData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(editReview(data))
        return data
    }

}

export const removeReview = (rev_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${rev_id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteReview(data))
        return data
    }

}

export const createReview = (reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews/`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(addReview(data))
        return data
    }
}

export const getReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews/')

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data))
        return data
    }
}


const initialState = {}

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_REVIEW: {
            const newState = {...state}
            newState[action.review.id] = action.review
            return newState;
        }
        case LOAD_REVIEWS: {
            const newState = {}
           
            action.reviews?.map(review => {
                return newState[review.id] = review
            })
            return newState
        }
        case EDIT_REVIEW: {
            const newState = {...state}
            newState[action.review.id] = action.review
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.review.id]
            return newState
        }
        default:
            return state;
    }
}
