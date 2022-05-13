const ADD_BUSINESS = 'business/create'
const LOAD_BUSINESSES = 'businesses/load'

const addBusiness = (business) => ({
    type: ADD_BUSINESS,
    business
})

const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})



export const createBusiness = (businessData) => async (dispatch) => {
    const response = await fetch('/api/business/', {
        method: 'POST',
        body: JSON.stringify(businessData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(addBusiness(data))
        return data
    }
}

export const getBusinesses = () => async (dispatch) => {
    const response = await fetch('/api/business/')

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBusinesses(data))
        return data
    }

}

const initialState = {};

export default function businessListingReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BUSINESS: {
            const newBusiness = {...state}
            newBusiness[action.business.id] = action.business;
            return newBusiness;
        }

        case LOAD_BUSINESSES: {
            const newBusinesses = {}
            action.businesses.map(bus => {
                return newBusinesses[bus.id] = bus
            })
            return newBusinesses
        }

        default:
            return state;
    }
}
