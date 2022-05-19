import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import splash_image from '../../images/sharate_splash_vector.png'
import './SplashPageStyle.css'

const SplashComponent = () => {

    const user = useSelector(state => state.session)

    return (
        <div className="splash-page-bg">
            <div className="splash-text-info-container">
            <div className="splash-text-header">Rate your Experience</div>
            <div className="splash-text">Find the best Food, Hotel, Transportation Service and Entertainment places in your area or while traveling </div>
            <NavLink className='business-link-splash' to={user?.user === null ? '/login' : '/businesses-lists'}>
                Find a Business to Review
            </NavLink>
            </div>
            <div className="splash-vector-container">
                <img className="splash-vector" src={splash_image} />
            </div>
        </div>
    )
}

export default SplashComponent;
