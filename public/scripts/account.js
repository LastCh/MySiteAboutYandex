document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        return (location.href = "login.html");
    }

    document.getElementById("accountName").textContent = currentUser;

    window.updateUser = async function () {
        const newName = document.getElementById("newName").value.trim();
        const newPassword = document.getElementById("newPassword").value;
        const currentUser = localStorage.getItem("currentUser");
    
        if (!newName && !newPassword) {
            return showMessage("Введите новое имя или пароль", false);
        }
    
        try {
            const res = await fetch("/api/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentLogin: currentUser,
                    newLogin: newName || currentUser,
                    newPassword: newPassword || null
                })
            });
    
            const data = await res.json();
    
            if (res.ok) {
                localStorage.setItem("currentUser", newName || currentUser);
                showMessage(data.message, true);
                document.getElementById("accountName").textContent = newName || currentUser;
            } else {
                showMessage(data.error || "Ошибка обновления", false);
            }
        } catch (err) {
            showMessage("Ошибка соединения с сервером", false);
        }
    };
    

    function showMessage(msg, success = false) {
        const el = document.getElementById("accountMessage");
        el.textContent = msg;
        el.classList.remove("message-success", "message-error");
        el.classList.add(success ? "message-success" : "message-error");
    }
});
