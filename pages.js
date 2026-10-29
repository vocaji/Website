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
