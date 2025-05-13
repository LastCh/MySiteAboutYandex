document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!currentUser || !users[currentUser]) {
        location.href = "login.html";
    }

    document.getElementById("accountName").textContent = currentUser;

    window.updateUser = function () {
        const newName = document.getElementById("newName").value.trim();
        const newPassword = document.getElementById("newPassword").value;
    
        if (!newName && !newPassword) {
            return showMessage("Введите новое имя или пароль", false);
        }
    
        if (newName && newName !== currentUser && users[newName]) {
            return showMessage("Пользователь с таким именем уже существует", false);
        }
    
        const updatedUsers = { ...users };
        const currentData = updatedUsers[currentUser];
    
        delete updatedUsers[currentUser];
        updatedUsers[newName || currentUser] = newPassword || currentData;
    
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", newName || currentUser);
    
        showMessage("Данные обновлены", true);
        document.getElementById("accountName").textContent = newName || currentUser;
    }
    

    function showMessage(msg) {
        document.getElementById("accountMessage").textContent = msg;
    }

    function showMessage(msg, success = false) {
        const el = document.getElementById("accountMessage");
        el.textContent = msg;
        el.classList.remove("message-success", "message-error");
        el.classList.add(success ? "message-success" : "message-error");
    }
});
