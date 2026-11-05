// ----- Guard: only logged-in users can see these pages -----
if (!localStorage.getItem("loggedInUser")) {
    window.location.replace("index.html");
}

// ----- Logout: forget the user, then the link goes to the login page -----
document.getElementById("logoutLink").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
});

// ----- Light / dark button -----
// (each page also has a tiny line in <head> that applies the saved choice early)
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.documentElement.classList.toggle("light");

    if (document.documentElement.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

// ----- Random message button (only on pages that have it) -----
const messageBtn = document.getElementById("messageBtn");
const messageBox = document.getElementById("messageBox");

if (messageBtn) {
    // EDIT these messages. Add as many as you want, each in quotes with a comma.
    const messages = [
        "Be a light today: send one kind message to someone.",
        "Before you post, ask: is it true, kind, and helpful?",
        "Your small act of kindness online can change someone's day.",
        "Put God first, even in what you share on the internet.",
        "Use your skills to lift people up, not to put them down."
    ];

    let last = -1;
    messageBtn.addEventListener("click", function () {
        let number = Math.floor(Math.random() * messages.length);
        if (number === last) { number = (number + 1) % messages.length; }  // never show the same message twice in a row
        last = number;
        messageBox.textContent = messages[number];
    });
}

// ----- Page transition: fade out, then go to the new page -----
const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) { return; }  // let "open in new tab" work
        e.preventDefault();                       // stop the instant jump
        const url = link.getAttribute("href");    // remember where it should go

        document.body.classList.add("leaving");   // start the fade out

        setTimeout(function () {
            window.location.href = url;           // go after 0.4 seconds
        }, 400);
    });
});

// when you press the Back button, make sure the page is visible again
window.addEventListener("pageshow", function () {
    document.body.classList.remove("leaving");
});

/* =========================================================
   ADDED PARTS: each one checks that its element exists first,
   so this file still works on every page.
   ========================================================= */

// ----- The moving light: the glow in the top section follows the pointer -----
document.querySelectorAll(".hero").forEach(function (hero) {
    hero.addEventListener("pointermove", function (event) {
        const box = hero.getBoundingClientRect();
        hero.style.setProperty("--x", (event.clientX - box.left) + "px");
        hero.style.setProperty("--y", (event.clientY - box.top) + "px");
    });
});

// ----- Greeting on the Reflection page (uses the part of the email before the @) -----
const greeting = document.getElementById("greeting");
const loggedInEmail = localStorage.getItem("loggedInUser");
if (greeting && loggedInEmail) {
    const first = loggedInEmail.split("@")[0];
    greeting.textContent = "Maayong adlaw, " + first.charAt(0).toUpperCase() + first.slice(1) + ".";
}

// ----- Community sign-up form (demo: nothing is sent anywhere) -----
const joinForm = document.getElementById("joinForm");
if (joinForm) {
    joinForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("joinName").value.trim();
        const how = document.getElementById("joinHow").value;
        const msg = document.getElementById("joinMsg");
        if (name === "") {
            msg.textContent = "Please tell us your name first.";
            msg.className = "msg error";
            return;
        }
        msg.textContent = "Salamat, " + name + "! We wrote down: " + how + ".";
        msg.className = "msg";
        joinForm.reset();
    });
}

// ----- Mini quiz on the Learn page -----
const quizButton = document.getElementById("checkQuiz");
if (quizButton) {
    quizButton.addEventListener("click", function () {
        const questions = document.querySelectorAll("fieldset.question");
        let score = 0;
        questions.forEach(function (q) {
            const picked = q.querySelector("input:checked");
            q.classList.remove("right", "wrong");
            q.querySelector(".explain").hidden = false;
            if (picked && picked.value === q.dataset.answer) {
                score = score + 1;
                q.classList.add("right");
            } else {
                q.classList.add("wrong");
            }
        });
        document.getElementById("quizResult").textContent =
            "You got " + score + " out of " + questions.length + ". Read each note to learn why.";
    });
}

// ----- Verses for the Faith & Tech page (King James Version) -----
const verses = [
    { text: "Let no corrupt communication proceed out of your mouth, but that which is good to the use of edifying, that it may minister grace unto the hearers.", ref: "Ephesians 4:29" },
    { text: "Lying lips are abomination to the LORD: but they that deal truly are his delight.", ref: "Proverbs 12:22" },
    { text: "The integrity of the upright shall guide them.", ref: "Proverbs 11:3" },
    { text: "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God the Father by him.", ref: "Colossians 3:17" },
    { text: "Wherefore comfort yourselves together, and edify one another, even as also ye do.", ref: "1 Thessalonians 5:11" },
    { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
    { text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", ref: "Matthew 6:33" }
];

// ----- Verse of the day: starts with today's verse, the button shows the next one -----
const verseText = document.getElementById("verseText");
if (verseText) {
    let verseIndex = Math.floor(Date.now() / 86400000) % verses.length;
    const verseRef = document.getElementById("verseRef");

    function showVerse() {
        verseText.textContent = verses[verseIndex].text;
        verseRef.textContent = verses[verseIndex].ref + " (KJV)";
    }
    showVerse();

    document.getElementById("nextVerse").addEventListener("click", function () {
        verseIndex = (verseIndex + 1) % verses.length;
        showVerse();
    });
}

// ----- Blessing card maker -----
const cardMsg = document.getElementById("cardMsg");
if (cardMsg) {
    const cardTo = document.getElementById("cardTo");
    const cardVerse = document.getElementById("cardVerse");
    const previewTo = document.getElementById("previewTo");
    const previewMsg = document.getElementById("previewMsg");
    const previewRef = document.getElementById("previewRef");
    const count = document.getElementById("count");

    // fill the drop-down from the verses list above
    verses.forEach(function (v, i) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = v.ref;
        cardVerse.appendChild(option);
    });

    function updateCard() {
        const v = verses[cardVerse.value];
        previewTo.textContent = cardTo.value.trim() ? "For " + cardTo.value.trim() + "," : "For you,";
        previewMsg.textContent = cardMsg.value.trim() ? cardMsg.value.trim() : "Your kind message will appear here.";
        previewRef.textContent = v.text + " (" + v.ref + ", KJV)";
        count.textContent = cardMsg.value.length + " / 140";
    }
    [cardTo, cardMsg, cardVerse].forEach(function (el) { el.addEventListener("input", updateCard); });
    updateCard();

    document.getElementById("copyCard").addEventListener("click", function () {
        const copyMsg = document.getElementById("copyMsg");
        const text = previewTo.textContent + "\n" + previewMsg.textContent + "\n\n" + previewRef.textContent;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                copyMsg.textContent = "Copied. Paste it into a message to someone who needs it.";
            }, function () {
                copyMsg.textContent = "Could not copy. Please select the card text and copy it yourself.";
            });
        } else {
            copyMsg.textContent = "Copy is not available in this browser. Please select the card text.";
        }
    });
}


// ----- Smooth scroll reveal: things fade up as they come into view -----
(function () {
    if (!("IntersectionObserver" in window)) { return; }   // old browser: everything just stays visible

    const targets = document.querySelectorAll(
        ".block h2, .card, .panel, .verse, .col, .question, .steps li, " +
        ".photo-card, .hover-item, .facts > div, .table-scroll, .blessing"
    );

    const watcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                watcher.unobserve(entry.target);            // animate only once
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) {
        // small delay for neighbours in the same row, so they come in one after another
        const index = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.setProperty("--d", Math.min(index, 5) * 0.09 + "s");
        el.classList.add("reveal");
        watcher.observe(el);
    });
})();
