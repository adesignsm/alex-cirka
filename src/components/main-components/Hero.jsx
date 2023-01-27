import React, {useState, useEffect} from "react";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

import "../../styles/hero/hero.css";

const Hero = () => {
    const [heroImageData, setHeroImageData] = useState([]);
    const [heroImageRef, setHeroImageRef] = useState([]);
    const [heroVideoEmbedRef, setHeroVideoEmbedRef] = useState([]);
    const [heroVideoRef, setHeroVideoRef] = useState([]);

    const builder = imageUrlBuilder(sanityClient);

    const urlFor = (source, width) => {
        return builder.image(source).auto('format').width(width).url();  
    }

    const editUrlString = (urlString) => {
        let strUrl = urlString.replace(/file-/g, "");
        strUrl = strUrl.replace("-", ".");

        return `https://cdn.sanity.io/files/ot5ilm3g/production/${strUrl}`;
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "heroimage"]{
                hero_image_upload,
                image_width,
                video_embed,
                video_file
              }`
        ).then((data) => {
            if (data[0].hasOwnProperty("hero_image_upload")) {
                setHeroImageRef(data[0].hero_image_upload.asset._ref);
                setHeroImageData(data[0]);
            } else if (data[0].hasOwnProperty("video_embed")) {
                setHeroVideoEmbedRef(data[0].video_embed);
            } else if (data[0].hasOwnProperty("video_file")) {
                setHeroVideoRef(editUrlString(data[0].video_file.asset._ref));
            }
        }).catch(console.error);
    }, []);

    return (
        <>
            {Object.keys(heroImageData).length ? <img id = "hero-image" src={urlFor(heroImageRef, heroImageData.image_width * 18.8)} /> : null}
            {Object.keys(heroVideoEmbedRef).length ? <iframe src={heroVideoEmbedRef} allowFullScreen></iframe> : null}
            {Object.keys(heroVideoRef).length ? <video autoPlay loop muted><source src={heroVideoRef} type="video/mp4"/></video> : null}
        </>
    )
}

export default Hero;