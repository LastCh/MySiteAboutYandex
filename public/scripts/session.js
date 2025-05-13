document.addEventListener("DOMContentLoaded", () => {
    console.log("session.js загружен");

    const logoutBtn = document.getElementById("logout-btn");
    const userIcon = document.querySelector(".user-icon");

    if (!logoutBtn || !userIcon) {
        console.warn("Элементы не найдены: logoutBtn =", logoutBtn, ", userIcon =", userIcon);
        return;
    }

    const user = localStorage.getItem("currentUser");
    console.log("currentUser:", user);

    if (user) {
        logoutBtn.style.display = "inline-block";
        userIcon.href = "account.html";
    } else {
        logoutBtn.style.display = "none";
        userIcon.href = "login.html";
    }

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });
});
