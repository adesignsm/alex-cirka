import React, {useState, useEffect} from "react";
import "../styles/footer/footer.css";
import sanityClient from "../client";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState("");

    useEffect(() => {
        let date = new Date();
        let year = date.getFullYear();
        setCurrentYear(year);
    }, []);

    return (
        <>
            <div id = "footer-container">
                <h4> © {currentYear} </h4>
            </div>
        </>
    )
}

export default Footer;