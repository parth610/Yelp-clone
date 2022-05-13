import React from "react";
import { NavLink } from "react-router-dom";

const SplashComponent = () => {

    return (
        <div>
            Home Page
            <div>
            <NavLink to='/businesses-lists'>
                Businesses
            </NavLink>
            </div>
        </div>
    )
}

export default SplashComponent;
