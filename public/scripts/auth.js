function showMessage(msg) {
    document.getElementById("authMessage").textContent = msg;
}

function showMessage(msg, success = false) {
    const el = document.getElementById("authMessage");
    el.textContent = msg;
    el.classList.remove("message-success", "message-error");
    el.classList.add(success ? "message-success" : "message-error");
}


async function register() {
    const login = document.getElementById("newLogin").value;
    const password = document.getElementById("newPassword").value;

    if (!login || !password) return showMessage("Введите логин и пароль");

    try {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, password })
        });

        const data = await res.json();

        if (res.ok) {
            showMessage(data.message, true);
        } else {
            showMessage(data.error || "Ошибка регистрации");
        }
    } catch (err) {
        showMessage("Сервер недоступен");
    }
}



async function login() {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (!login || !password) return showMessage("Введите логин и пароль");

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("currentUser", data.user);
            showMessage(data.message, true);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } else {
            showMessage(data.error || "Ошибка входа");
        }
    } catch (err) {
        showMessage("Сервер недоступен");
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

