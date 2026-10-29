// ----- Find the elements -----
const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const eyeIcon = document.getElementById("eyeIcon");
const confirmEye = document.getElementById("confirmEye");
const msg = document.getElementById("msg");

// ----- Sign up -----
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    // 1. passwords must match
    if (password !== confirm) {
        msg.style.color = "#ff6666";
        msg.textContent = "Passwords do not match.";
        return;
    }

    // 2. get saved users (empty list if none yet)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 3. email must not be used already
    const exists = users.some(function (user) {
        return user.email === email;
    });

    if (exists) {
        msg.style.color = "#ff6666";
        msg.textContent = "This email is already registered.";
        return;
    }

    // 4. save the new user
    users.push({ email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "#B7FF72";
    msg.textContent = "Account created! Going to login...";

    // 5. go to the login page after 1.5 seconds
    setTimeout(function () {
        window.location.href = "index.html";
    }, 1500);
});

// ----- Show / hide password -----
// one function that works for any input + eye button pair
function setupEye(input, button) {
    button.addEventListener("click", function () {
        if (input.type === "password") {
            input.type = "text";
            button.classList.add("show");
        } else {
            input.type = "password";
            button.classList.remove("show");
        }
    });
}

setupEye(passwordInput, eyeIcon);   // eye for the password
setupEye(confirmInput, confirmEye); // eye for the confirm password
