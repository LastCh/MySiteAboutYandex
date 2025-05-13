function showMessage(msg) {
    document.getElementById("authMessage").textContent = msg;
}

function showMessage(msg, success = false) {
    const el = document.getElementById("authMessage");
    el.textContent = msg;
    el.classList.remove("message-success", "message-error");
    el.classList.add(success ? "message-success" : "message-error");
}


function register() {
    const login = document.getElementById("newLogin").value;
    const password = document.getElementById("newPassword").value;
    if (!login || !password) return showMessage("Введите логин и пароль");

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[login]) return showMessage("Пользователь уже существует");

    users[login] = password;
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Регистрация прошла успешно", true);
}

function login() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[login] === password) {
        localStorage.setItem("currentUser", login);
        showMessage("Успешный вход", true);
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        showMessage("Неверный логин или пароль");
    }
}

function toggleForm(e) {
    e.preventDefault();
    const regForm = document.getElementById("register-form");
    const title = document.getElementById("form-title");
    const switchLink = document.querySelector(".switch-link a");

    const isHidden = regForm.style.display === "none";

    regForm.style.display = isHidden ? "block" : "none";
    title.textContent = isHidden ? "Регистрация" : "Вход";
    switchLink.textContent = isHidden ? "Уже есть аккаунт?" : "Ещё нет аккаунта?";
}

