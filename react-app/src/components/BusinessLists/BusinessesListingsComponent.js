import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinesses } from "../../store/businessListings";

const BusinessListingComponent = () => {

    const dispatch = useDispatch()
    const allBusinesses = useSelector(state => Object.values(state.businessListingReducer))

    useEffect(() => {
        dispatch(getBusinesses())
    }, [dispatch])

    console.log(allBusinesses)

    return (
        <div className="business-listings-container">
            {
                allBusinesses?.map(bus => (
                    <div key={bus.id}>
                        {bus.name}
                    </div>
                ))
            }
        </div>
    )
}

export default BusinessListingComponent;
