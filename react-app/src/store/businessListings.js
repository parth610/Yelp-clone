const ADD_BUSINESS = 'business/create'
const LOAD_BUSINESSES = 'businesses/load'
const UPDATE_BUSINESS = 'business/update'
const DELETE_BUSINESS = 'business/delete'

const addBusiness = (business) => ({
    type: ADD_BUSINESS,
    business
})

const loadBusinesses = (businesses) => ({
    type: LOAD_BUSINESSES,
    businesses
})

const updateBusiness = (business) => ({
    type: UPDATE_BUSINESS,
    business
})

const deleteBusiness = (business) => ({
    type: DELETE_BUSINESS,
    business
})

export const editBusiness = (businessData) => async (dispatch) => {
    const response = await fetch(`/api/business/${businessData.busId}`, {
        method: 'PUT',
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
        dispatch(updateBusiness(data))
        return data
    }
}

export const removeBusiness = (busId) => async (dispatch) => {
    console.log(busId)
    const response = await fetch(`/api/business/${busId}`, {
        method: 'DELETE'
    })
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteBusiness(data))
        return data
    }
}



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

        case UPDATE_BUSINESS: {
            const newBusiness = {...state}
            newBusiness[action.business.id] = action.business;
            return newBusiness;
        }

        case DELETE_BUSINESS: {
            const allBusinesses = {...state}
            delete allBusinesses[action.business.id]
            return allBusinesses;
        }

        default:
            return state;
    }
}
