import React, {useState, useEffect} from "react";
import sanityClient from "../client";

import {Style} from "react-style-tag";
import "../styles/hero/hero.css";

const Hero = () => {
    const [heroData, setHeroData] = useState("");
    const [fontData, setFontData] = useState([]);

    const editUrlString = (urlString) => {
        let strUrl = urlString.replace(/file-/g, "");
        strUrl = strUrl.replace("-", ".");

        setFontData(`https://cdn.sanity.io/files/ot5ilm3g/production/${strUrl}`);
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "hero"]{
                hero_description
              }`
        ).then((data) => {
            setHeroData(data[0].hero_description);
            sanityClient.fetch(
                `*[_type == "font"]{
                    font_file_upload,
                }`
            ).then((data) => {
                editUrlString(data[0].font_file_upload.asset._ref);
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            <div id = "hero-container">
                <div id = "hero-description">
                    <Style>
                        {`
                            @font-face {
                                font-family: "Hero Font";
                                src: url(${fontData});
                            }
                            `
                        }
                    </Style>
                    <h1 style={{fontFamily: "Hero Font"}}>{heroData}</h1> 
                </div>
            </div>
        </>
    )
}

export default Hero;