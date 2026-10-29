// ----- Users: demo accounts + accounts saved from the sign up page -----
const demoUsers = [
    { email: "jacob@gmail.com", password: "1234" },
    { email: "maria@gmail.com", password: "abcd" }
];
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
const users = demoUsers.concat(savedUsers);

// ----- Find the elements -----
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");
const errorMsg = document.getElementById("errorMsg");
const googleBtn = document.getElementById("googleBtn");

// ----- Login check -----
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    const found = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (found) {
        localStorage.setItem("loggedInUser", email);  // remember who logged in
        window.location.href = "reflection.html";     // go to the first page
    } else {
        errorMsg.textContent = "Wrong email or password.";
    }
});

// ----- Show / hide password -----
// the CSS shows the right eye picture when the button has the class "show"
eyeIcon.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.add("show");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("show");
    }
});

// ----- Google button (design only, not connected yet) -----
googleBtn.addEventListener("click", function () {
    errorMsg.textContent = "Google sign-in is not available yet.";
});
