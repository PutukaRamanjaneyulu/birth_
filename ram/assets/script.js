/* =========================================================
   CHANGE THESE TWO SETTINGS
========================================================= */

const WIFE_NAME = "Anjali";

/*
   CHANGE THIS TO HER BIRTHDAY.

   Example:
   October 10, 2026
*/

const BIRTHDAY_DATE =
    "October 22, 2026 00:00:00";


/* =========================================================
   PUT HER NAME EVERYWHERE
========================================================= */

document.querySelectorAll("[data-wife-name]")
    .forEach(element => {

        element.textContent = WIFE_NAME;

    });


/* =====================================================
   BIRTHDAY MUSIC
===================================================== */

const birthdayMusic =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const musicStatus =
    document.getElementById("musicStatus");


if (
    birthdayMusic &&
    musicButton
) {

    let musicPlaying = false;


    musicButton.addEventListener(
        "click",
        async () => {

            try {

                if (birthdayMusic.paused) {

                    await birthdayMusic.play();

                    musicPlaying = true;

                    musicButton.textContent =
                        "🔊";

                    musicButton.classList.add(
                        "music-playing"
                    );


                    if (musicStatus) {

                        musicStatus.textContent =
                            "Playing ❤️";

                    }

                } else {

                    birthdayMusic.pause();

                    musicPlaying = false;

                    musicButton.textContent =
                        "🎵";

                    musicButton.classList.remove(
                        "music-playing"
                    );


                    if (musicStatus) {

                        musicStatus.textContent =
                            "Paused";

                    }

                }

            } catch (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            }

        }
    );


    birthdayMusic.addEventListener(
        "ended",
        () => {

            musicButton.textContent =
                "🎵";

            musicButton.classList.remove(
                "music-playing"
            );

        }
    );

}

/* =========================================================
   COUNTDOWN
========================================================= */

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


if (
    daysElement &&
    hoursElement &&
    minutesElement &&
    secondsElement
) {

    const target =
        new Date(BIRTHDAY_DATE).getTime();


    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            target - now;


        if (difference <= 0) {

            daysElement.textContent =
                "00";

            hoursElement.textContent =
                "00";

            minutesElement.textContent =
                "00";

            secondsElement.textContent =
                "00";

            return;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                ) /
                1000
            );


        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );
}


/* =========================================================
   FIREWORKS
========================================================= */

const canvas =
    document.getElementById(
        "fireworksCanvas"
    );


if (canvas) {

    const ctx =
        canvas.getContext("2d");


    let fireworks = [];

    let particles = [];


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    class Firework {

        constructor() {

            this.x =
                Math.random()
                * canvas.width;

            this.y =
                canvas.height;

            this.targetY =
                canvas.height *
                (
                    .12 +
                    Math.random() * .42
                );

            this.speed =
                6 +
                Math.random() * 3;

            this.color =
                [
                    "#ff4f9a",
                    "#ff9dcc",
                    "#ffffff",
                    "#ffd6eb",
                    "#b76cff",
                    "#ffcf70"
                ][
                    Math.floor(
                        Math.random() * 6
                    )
                ];
        }


        update() {

            this.y -= this.speed;

            if (
                this.y <= this.targetY
            ) {

                explode(
                    this.x,
                    this.y,
                    this.color
                );

                return false;
            }

            return true;
        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                this.color;

            ctx.fill();
        }
    }


    class Particle {

        constructor(
            x,
            y,
            vx,
            vy,
            color
        ) {

            this.x = x;
            this.y = y;

            this.vx = vx;
            this.vy = vy;

            this.color = color;

            this.alpha = 1;

            this.gravity = .045;

            this.friction = .985;
        }


        update() {

            this.vx *=
                this.friction;

            this.vy *=
                this.friction;

            this.vy +=
                this.gravity;

            this.x +=
                this.vx;

            this.y +=
                this.vy;

            this.alpha -=
                .009;

            return this.alpha > 0;
        }


        draw() {

            ctx.save();

            ctx.globalAlpha =
                this.alpha;

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                1.8,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                this.color;

            ctx.fill();

            ctx.restore();
        }
    }


    function explode(
        x,
        y,
        color
    ) {

        for (
            let i = 0;
            i < 100;
            i++
        ) {

            const angle =
                Math.random()
                * Math.PI
                * 2;

            const speed =
                2 +
                Math.random() * 7;


            particles.push(
                new Particle(
                    x,
                    y,
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed,
                    color
                )
            );
        }
    }


    function launch() {

        fireworks.push(
            new Firework()
        );
    }


    function animate() {

        ctx.fillStyle =
            "rgba(3,0,6,.20)";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        fireworks =
            fireworks.filter(
                firework => {

                    const alive =
                        firework.update();

                    if (alive) {
                        firework.draw();
                    }

                    return alive;
                }
            );


        particles =
            particles.filter(
                particle => {

                    const alive =
                        particle.update();

                    if (alive) {
                        particle.draw();
                    }

                    return alive;
                }
            );


        requestAnimationFrame(
            animate
        );
    }


    setInterval(
        launch,
        750
    );


    animate();


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        setTimeout(
            launch,
            i * 250
        );
    }
}