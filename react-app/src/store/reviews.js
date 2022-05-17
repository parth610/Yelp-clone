const ADD_REVIEW = 'review/create'
const LOAD_REVIEWS = 'review/load'

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
})

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const createReview = (reviewData) => async (dispatch) => {
    const response = await fetch(`/api/reviews`, {
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
    const response = await fetch('/api/reviews')

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews())
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
            action.reviews.map(review => {
                return newState[review.id] = review
            })
            return newState
        }
        default:
            return state;
    }
}
