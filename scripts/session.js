document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");
    const userIcon = document.querySelector(".user-icon");
    const user = localStorage.getItem("currentUser");

    if (user) {
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        if (userIcon) userIcon.href = "account.html";
    } else {
        if (logoutBtn) logoutBtn.style.display = "none";
        if (userIcon) userIcon.href = "login.html";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });
    }
});
