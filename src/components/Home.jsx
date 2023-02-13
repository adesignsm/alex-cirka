import React from "react";

import Hero from "../components/main-components/Hero";
import Projects from "../components/main-components/Projects";
import Loading from "./Loading";

const Home = () => {
    return (
        <>
            <Loading />
            <Hero />
            <Projects />
        </>
    )
}

export default Home;