import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

import "./styles/root/root.css";

import Menu from "./components/Menu";
import Loading from "./components/Loading";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

const App = () => {
    const [loadingState, setLoadingState] = useState(false);

    setTimeout(() => {
        setLoadingState(true);
        removeLoading();
    }, 1000);

    const removeLoading = () => {
        if (loadingState === true) $("#loading-page-div").fadeOut(500);
    }

    return (
        <>
            <Menu />
            <div id = "loading-page-div"><Loading /></div>
            <Hero />
            <Projects />
            <Footer />
        </>
    )
}

export default App;