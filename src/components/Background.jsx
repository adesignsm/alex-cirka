import React, { useLayoutEffect } from "react";
import "../styles/background/background.css";

const Background = () => {
    const backgroundEffect = () => {
        const canvas = document.getElementById("canvas-container");

        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        class Ball {
            constructor(x, y, velx, vely, size, color) {
                this.x = x; 
                this.y = y; 
                this.velx = velx; 
                this.vely = vely; 
                this.size = size; 
                this.color = color; 
            }

            // create draw func
            drawBall() {
                ctx.beginPath(); 
                ctx.fillStyle = this.color; 
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.fill();
            }

            // create update func
            updateBall() {
                if (this.x + this.size >= width - 100 || this.x - this.size <= 0) {
                    this.velx = -this.velx;
                }

                if (this.y + this.size >= height || this.y - this.size <= 0) {
                    this.vely = -this.vely;
                }

                this.x += this.velx;
                this.y += this.vely;
            }
        }

        //   create random number generator func
        function random(min, max) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            return num;
        }

        const balls = [];
        const domElements = document.querySelectorAll(".circle");

        setInterval(() => {
            if (window.location.href.includes("/archive")) {
                domElements.forEach((el) => {
                    if (!el.classList.contains("yellow")) {
                        el.classList.remove("white");
                        el.classList.remove("transparent");
                        el.classList.add("yellow");
                    }
                })
            }
            
            if (!window.location.href.includes("/about") && !window.location.href.includes("/archive")) {
                domElements.forEach((el) => {
                    if (!el.classList.contains("transparent")) {
                        el.classList.remove("yellow");
                        el.classList.remove("white");
                        el.classList.add("transparent");
                    }
                }) 
            }

            if (window.location.href.includes("/about")) {
                domElements.forEach((el) => {
                    if (!el.classList.contains("white")) {
                        el.classList.remove("transparent");
                        el.classList.remove("yellow");
                        el.classList.add("white");
                    }
                }) 
            }
        }, 100);

        while (balls.length < domElements.length) {
            let size = 80;

            const ball = new Ball(
                random(size, width - size),
                random(size, height - size),
                random(-1, 1),
                random(-1, 1),
                size,
                `transparent`
            );

            balls.push(ball);
        }

        //   create loop func
        function loop() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            ctx.fillRect(0, 0, width, height);

            // run necessary func
            for (let i = 0; i < balls.length; i++) {
                balls[i].drawBall();
                balls[i].updateBall();
                domElements[i].style.setProperty("top", `${balls[i].y}px`)
                domElements[i].style.setProperty("left", `${balls[i].x}px`)
            }

            requestAnimationFrame(loop);
        }

        loop();
    }

    useLayoutEffect(() => {
        backgroundEffect();
    }, []);

    return (
        <>
            <div className="background-effect">
                <canvas id="canvas-container" />
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </>
    )
}

export default Background;