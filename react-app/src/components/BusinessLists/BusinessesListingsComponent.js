import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses, removeBusiness } from "../../store/businessListings";

const BusinessListingComponent = () => {

    const dispatch = useDispatch()
    const allBusinesses = useSelector(state => Object.values(state.businessListingReducer))
    const user = useSelector(state => state.session)
    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    console.log(user.user.id)

    const deleteBusinessHandle = async (e) => {
        const busId = e.currentTarget.id;
        console.log(+busId)
        await dispatch(removeBusiness(+busId))
    }

    return (
        <div className="business-listings-container">
            {
                allBusinesses?.map(bus => (
                    <div key={bus.id}>
                        {bus.name}
                        { user.user !== null && user.user.id === bus.creator_id &&
                            <div>
                                <button id={bus.id} onClick={deleteBusinessHandle}>
                                    Delete
                                </button>
                                <button>
                                    Edit
                                </button>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default BusinessListingComponent;
