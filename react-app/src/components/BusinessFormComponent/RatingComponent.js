import React, { useState } from "react";
import './RatingComponentStyle.css'

const RatingComponent = ({reviewStars, setReviewStars}) => {
    const [starHover, setStarHover] = useState()
    return (
        <div>
            {
                [...Array(5)].map((star, i) =>{
                    const rateVal = i + 1;
                    return (
                        <label key={i}>
                            <input onClick={() => setReviewStars(rateVal)} className="star-radio-buttons" type="radio" name="reviewStars" value={rateVal}/>
                            <i className="fas fa-star" id={rateVal <= (starHover || reviewStars) ? 'yellow-star' : 'grey-star'} onMouseEnter={() => setStarHover(rateVal)} onMouseLeave={() => setStarHover(null)} />
                        </label>
                    )
                })
            }
        </div>
    )
}

export default RatingComponent;
