import React from "react";
import './Footer.css'

const FooterComponent = () => {
    return (
        <div className="footer-container">
            <div>Developed by</div>
            <div>Parth Bhakta</div>
            <div><a target='_blank' rel="noreferrer" href={'https://www.linkedin.com/in/parth-bhakta-a7883998/'}><i className="fa-brands fa-linkedin"></i></a>
            <a target='_blank' rel="noreferrer" href={'https://github.com/parth610'}><i className="fa-brands fa-github"></i></a>
            </div>
        </div>
    )
}

export default FooterComponent;
