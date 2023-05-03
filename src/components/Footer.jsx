import React, {useState, useEffect} from "react";
import "../styles/footer/footer.css";

import pfp from "../media/footer-pfp.jpg";
import footerMiddleLight from "../media/footer-middle-image-light.png";
import footerMiddleDark from "../media/footer-middle-image-dark.png";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState("");

    useEffect(() => {
        let date = new Date();
        let year = date.getFullYear();
        setCurrentYear(year);

        setInterval(() => {
            if (window.location.href.includes("/archive")) {
                document.getElementById("footer-container").style.backgroundColor = "#000";
                document.getElementById("footer-container").style.border = "3px solid #fff";
                document.getElementById("footer-middle-image").src = footerMiddleLight;
            } else {
                document.getElementById("footer-container").style.backgroundColor = "#e3e192";
                document.getElementById("footer-container").style.border = "3px solid #000";
                document.getElementById("footer-middle-image").src = footerMiddleDark;
            }
        }, 10);
    }, []);

    return (
        <>
            <div id = "footer-container">
                <div className="column">
                    <img className="footer-image-pfp" src={pfp} />
                </div>
                <div className="column">
                    <img id="footer-middle-image" src={footerMiddleDark} />
                </div>
                <div className="column">
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                    <img src="https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                </div>
            </div>
        </>
    )
}

export default Footer;