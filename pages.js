// ----- Guard: only logged-in users can see these pages -----
if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "index.html";
}

// ----- Logout: forget the user, then the link goes to the login page -----
document.getElementById("logoutLink").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
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

    messageBtn.addEventListener("click", function () {
        const number = Math.floor(Math.random() * messages.length);
        messageBox.textContent = messages[number];
    });
}
// ----- Page transition: fade out, then go to the new page -----
const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
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