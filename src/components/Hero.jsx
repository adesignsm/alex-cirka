import React, {useState, useEffect} from "react";
import sanityClient from "../client";

import "../styles/hero/hero.css";

const Hero = () => {
    const [heroData, setHeroData] = useState("");
    const [fontData, setFontData] = useState([]);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "hero"]{
                hero_description
              }`
        ).then((data) => {
            setHeroData(data[0].hero_description);
            sanityClient.fetch(
                `*[_type == "font"]{
                    font_file_upload
                }`
            ).then((data) => {
                setFontData(data);
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    console.log(fontData);

    return (
        <>
            <div id = "hero-container">
                <div id = "hero-description">
                    <h1> {heroData} </h1>
                </div>
            </div>
        </>
    )
}

export default Hero;