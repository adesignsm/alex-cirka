import React, {useState, useEffect} from "react";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

import "../../styles/hero/hero.css";

const Hero = () => {
    const [heroImageData, setHeroImageData] = useState([]);
    const [heroImageRef, setHeroImageRef] = useState([]);

    const builder = imageUrlBuilder(sanityClient);

    const urlFor = (source, width) => {
        return builder.image(source).auto('format').width(width).url();  
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "heroimage"]{
                hero_image_upload,
                image_width
              }`
        ).then((data) => {
            setHeroImageRef(data[0].hero_image_upload.asset._ref);
            setHeroImageData(data[0]);
        }).catch(console.error);
    }, []);

    console.log(Object.keys(heroImageData).length);
    console.log(heroImageRef);

    return (
        <>
            {Object.keys(heroImageData).length ? <img id = "hero-image" src={urlFor(heroImageRef, heroImageData.image_width * 18.8)} /> : null}
        </>
    )
}

export default Hero;