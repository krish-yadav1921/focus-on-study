/* =====================================
   GENZ STUDY ZONE
   ===================================== */


/* ---------- DATA ---------- */

let data = JSON.parse(
    localStorage.getItem("genzStudy")
) || {

    examName: "NIMCET 2027",

    examDate: "",

    background: "night",

    streak: 0,

    countdownMusic: "",

    stopwatchMusic: "",

    countdownTask: "",

    stopwatchTask: ""

};


function saveData() {

    localStorage.setItem(
        "genzStudy",
        JSON.stringify(data)
    );

}


/* ---------- PAGE SYSTEM ---------- */

const pages = {

    home: document.getElementById("homePage"),

    countdown:
        document.getElementById("countdownPage"),

    stopwatch:
        document.getElementById("stopwatchPage"),

    settings:
        document.getElementById("settingsPage")

};


function showPage(page) {

    Object.values(pages).forEach(
        p => p.classList.remove("active")
    );

    pages[page].classList.add("active");

    window.scrollTo(0, 0);

}


/* ---------- HOME BUTTONS ---------- */

document
    .getElementById("openCountdown")
    .addEventListener(
        "click",
        () => showPage("countdown")
    );


document
    .getElementById("openStopwatch")
    .addEventListener(
        "click",
        () => showPage("stopwatch")
    );


document
    .getElementById("openSettings")
    .addEventListener(
        "click",
        () => showPage("settings")
    );


document
    .getElementById("countdownBack")
    .addEventListener(
        "click",
        () => showPage("home")
    );


document
    .getElementById("stopwatchBack")
    .addEventListener(
        "click",
        () => showPage("home")
    );


document
    .getElementById("settingsBack")
    .addEventListener(
        "click",
        () => showPage("home")
    );


/* ---------- SETTINGS ---------- */

function loadSettings() {

    document.getElementById("examName").value =
        data.examName;

    document.getElementById("examDate").value =
        data.examDate;

    document
        .querySelectorAll(".bg-option")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.bg === data.background
            );

        });

}


document
    .querySelectorAll(".bg-option")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                data.background =
                    button.dataset.bg;

                document
                    .querySelectorAll(".bg-option")
                    .forEach(btn =>
                        btn.classList.remove("selected")
                    );

                button.classList.add("selected");

                setBackground(
                    data.background
                );

            }
        );

    });


document
    .getElementById("saveSettings")
    .addEventListener(
        "click",
        () => {

            const name =
                document
                    .getElementById("examName")
                    .value
                    .trim();

            const date =
                document
                    .getElementById("examDate")
                    .value;


            if (name) {

                data.examName = name;

            }

            data.examDate = date;

            saveData();

            updateExamUI();

            showPage("home");

        }
    );


/* ---------- BACKGROUND ---------- */

function setBackground(bg) {

    document.body.className = "";

    document.body.classList.add(bg);

}


setBackground(
    data.background || "night"
);


/* ---------- EXAM UI ---------- */

function updateExamUI() {

    const exam =
        data.examName || "Your Exam";


    document.getElementById(
        "countdownExam"
    ).textContent = exam;

    document.getElementById(
        "countdownMission"
    ).textContent = exam;


    document.getElementById(
        "stopwatchExam"
    ).textContent = exam;

    document.getElementById(
        "stopwatchMission"
    ).textContent = exam;


    updateExamDays();

}


function updateExamDays() {

    if (!data.examDate) {

        document.getElementById(
            "countdownExamDays"
        ).textContent =
            "Set your exam date";

        document.getElementById(
            "stopwatchExamDays"
        ).textContent =
            "Set your exam date";

        return;

    }


    const exam =
        new Date(
            data.examDate + "T00:00:00"
        );

    const now =
        new Date();

    const diff =
        exam.getTime() - now.getTime();

    const days =
        Math.ceil(
            diff /
            (1000 * 60 * 60 * 24)
        );


    let text;

    if (days > 0) {

        text =
            `${days} days left • ${exam.toLocaleDateString(
                "en-IN"
            )}`;

    }

    else if (days === 0) {

        text =
            "EXAM DAY 🔥";

    }

    else {

        text =
            "Exam date passed";

    }


    document.getElementById(
        "countdownExamDays"
    ).textContent = text;

    document.getElementById(
        "stopwatchExamDays"
    ).textContent = text;

}


/* ---------- STREAK ---------- */

function updateStreak() {

    document.getElementById(
        "countdownStreak"
    ).textContent =
        data.streak;

    document.getElementById(
        "stopwatchStreak"
    ).textContent =
        data.streak;

}


/* =====================================
   COUNTDOWN
   ===================================== */

let countdownSeconds = 25 * 60;

let countdownInterval = null;

let countdownRunning = false;


function formatCountdown(seconds) {

    seconds =
        Math.max(
            0,
            Math.floor(seconds)
        );

    const min =
        Math.floor(seconds / 60);

    const sec =
        seconds % 60;


    return (
        String(min).padStart(2, "0")
        +
        ":" +
        String(sec).padStart(2, "0")
    );

}


function updateCountdownDisplay() {

    document.getElementById(
        "countdownDisplay"
    ).textContent =
        formatCountdown(
            countdownSeconds
        );

}


function startCountdown() {

    if (countdownRunning) return;

    countdownRunning = true;


    countdownInterval =
        setInterval(
            () => {

                if (
                    countdownSeconds > 0
                ) {

                    countdownSeconds--;

                    updateCountdownDisplay();

                }

                else {

                    stopCountdown();

                    alert(
                        "Session complete! 🔥"
                    );

                }

            },
            1000
        );

}


function stopCountdown() {

    countdownRunning = false;

    clearInterval(
        countdownInterval
    );

    countdownInterval = null;

}


function resetCountdown() {

    stopCountdown();

    const min =
        Number(
            document
                .getElementById(
                    "countdownMinutes"
                )
                .value
        ) || 0;

    const sec =
        Number(
            document
                .getElementById(
                    "countdownSeconds"
                )
                .value
        ) || 0;


    countdownSeconds =
        min * 60 + sec;

    updateCountdownDisplay();

}


document
    .getElementById("countdownStart")
    .addEventListener(
        "click",
        startCountdown
    );


document
    .getElementById("countdownPause")
    .addEventListener(
        "click",
        stopCountdown
    );


document
    .getElementById("countdownReset")
    .addEventListener(
        "click",
        resetCountdown
    );


document
    .querySelectorAll(".quick-times button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const minutes =
                    Number(
                        button.dataset.time
                    );

                countdownSeconds =
                    minutes * 60;

                document
                    .getElementById(
                        "countdownMinutes"
                    )
                    .value = minutes;

                document
                    .getElementById(
                        "countdownSeconds"
                    )
                    .value = 0;

                updateCountdownDisplay();

            }
        );

    });


/* =====================================
   STOPWATCH
   ===================================== */

let stopwatchSeconds = 0;

let stopwatchInterval = null;

let stopwatchRunning = false;


function formatStopwatch(seconds) {

    const hours =
        Math.floor(
            seconds / 3600
        );

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    const sec =
        seconds % 60;


    return (
        String(hours).padStart(2, "0")
        +
        ":" +
        String(minutes).padStart(2, "0")
        +
        ":" +
        String(sec).padStart(2, "0")
    );

}


function updateStopwatchDisplay() {

    document.getElementById(
        "stopwatchDisplay"
    ).textContent =
        formatStopwatch(
            stopwatchSeconds
        );

}


function startStopwatch() {

    if (stopwatchRunning) return;

    stopwatchRunning = true;


    stopwatchInterval =
        setInterval(
            () => {

                stopwatchSeconds++;

                updateStopwatchDisplay();

            },
            1000
        );

}


function pauseStopwatch() {

    stopwatchRunning = false;

    clearInterval(
        stopwatchInterval
    );

}


function resetStopwatch() {

    pauseStopwatch();

    stopwatchSeconds = 0;

    updateStopwatchDisplay();

}


document
    .getElementById("stopwatchStart")
    .addEventListener(
        "click",
        startStopwatch
    );


document
    .getElementById("stopwatchPause")
    .addEventListener(
        "click",
        pauseStopwatch
    );


document
    .getElementById("stopwatchReset")
    .addEventListener(
        "click",
        resetStopwatch
    );


/* =====================================
   YOUTUBE
   ===================================== */

function getYoutubeID(url) {

    try {

        const parsed =
            new URL(url);


        if (
            parsed.hostname.includes(
                "youtube.com"
            )
        ) {

            if (
                parsed.searchParams.get("v")
            ) {

                return parsed.searchParams.get(
                    "v"
                );

            }


            if (
                parsed.pathname.includes(
                    "/shorts/"
                )
            ) {

                return parsed.pathname
                    .split("/")[2];

            }

        }


        if (
            parsed.hostname.includes(
                "youtu.be"
            )
        ) {

            return parsed.pathname
                .substring(1);

        }

    }

    catch {

        return null;

    }


    return null;

}


function loadMusic(inputID, boxID, type) {

    const url =
        document
            .getElementById(inputID)
            .value
            .trim();

    const id =
        getYoutubeID(url);


    if (!id) {

        alert(
            "Please paste a valid YouTube link."
        );

        return;

    }


    const box =
        document.getElementById(boxID);


    box.innerHTML = `

        <iframe
            src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}"
            title="Study Music"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen>
        </iframe>

    `;


    if (type === "countdown") {

        data.countdownMusic = url;

    }

    else {

        data.stopwatchMusic = url;

    }


    saveData();

}


document
    .getElementById("countdownLoadMusic")
    .addEventListener(
        "click",
        () =>
            loadMusic(
                "countdownYoutube",
                "countdownYoutubeBox",
                "countdown"
            )
    );


document
    .getElementById("stopwatchLoadMusic")
    .addEventListener(
        "click",
        () =>
            loadMusic(
                "stopwatchYoutube",
                "stopwatchYoutubeBox",
                "stopwatch"
            )
    );


/* ---------- TASKS ---------- */

document
    .getElementById("saveCountdownTask")
    .addEventListener(
        "click",
        () => {

            data.countdownTask =
                document
                    .getElementById(
                        "countdownTask"
                    )
                    .value;

            saveData();

            alert(
                "Task saved 🔥"
            );

        }
    );


document
    .getElementById("saveStopwatchTask")
    .addEventListener(
        "click",
        () => {

            data.stopwatchTask =
                document
                    .getElementById(
                        "stopwatchTask"
                    )
                    .value;

            saveData();

            alert(
                "Task saved 🔥"
            );

        }
    );


/* ---------- MOTIVATION ---------- */

const quotes = [

    "Discipline beats motivation.",

    "No zero days.",

    "One hour of focus > five hours of distraction.",

    "Your future self is watching.",

    "Small progress is still progress.",

    "Stop scrolling. Start building.",

    "Consistency makes the difference.",

    "You don't need motivation. Start anyway."

];


function randomQuote(elementID) {

    const quote =
        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];

    document.getElementById(
        elementID
    ).textContent = quote;

}


setInterval(
    () => {

        randomQuote(
            "countdownQuote"
        );

        randomQuote(
            "stopwatchQuote"
        );

    },
    12000
);


/* ---------- LOAD SAVED MUSIC ---------- */

function loadSavedMusic() {

    if (data.countdownMusic) {

        document.getElementById(
            "countdownYoutube"
        ).value =
            data.countdownMusic;

    }


    if (data.stopwatchMusic) {

        document.getElementById(
            "stopwatchYoutube"
        ).value =
            data.stopwatchMusic;

    }

}


/* ---------- LOAD SAVED TASKS ---------- */

function loadTasks() {

    document.getElementById(
        "countdownTask"
    ).value =
        data.countdownTask || "";


    document.getElementById(
        "stopwatchTask"
    ).value =
        data.stopwatchTask || "";

}


/* ---------- INIT ---------- */

function init() {

    loadSettings();

    loadSavedMusic();

    loadTasks();

    updateExamUI();

    updateStreak();

    updateCountdownDisplay();

    updateStopwatchDisplay();

}


init();