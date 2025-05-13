const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8080;

const usersFile = path.join(__dirname, "data", "users.json");

app.use(express.static("public"));
app.use(express.json());
console.log("Express настроен. Ожидаем запросы...");

// Чтение пользователей
function loadUsers() {
    if (!fs.existsSync(usersFile)) return {};
    return JSON.parse(fs.readFileSync(usersFile, "utf-8") || "{}");
}

// Сохранение
function saveUsers(users) {
    const dir = path.dirname(usersFile);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Регистрация
app.post("/api/register", async (req, res) => {
    const { login, password } = req.body;
    console.log("Регистрируем:", login);
    const users = loadUsers();
    if (users[login]) return res.status(400).json({ error: "Пользователь уже существует" });

    const hash = await bcrypt.hash(password, 10);
    users[login] = hash;
    saveUsers(users);
    res.json({ message: "Регистрация успешна" });
});

// Вход
app.post("/api/login", async (req, res) => {
    const { login, password } = req.body;
    console.log("Попытка входа:", login);

    const users = loadUsers();
    const hash = users[login];

    if (!hash) {
        console.warn("Пользователь не найден");
        return res.status(400).json({ error: "Неверный логин или пароль" });
    }

    try {
        const match = await bcrypt.compare(password, hash);

        if (!match) {
            console.warn("Пароль не совпал");
            return res.status(400).json({ error: "Неверный логин или пароль" });
        }

        res.json({ message: "Вход успешен", user: login });
    } catch (err) {
        console.error("Ошибка сравнения паролей:", err);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

// Обновление
app.post("/api/update", async (req, res) => {
    const { currentLogin, newLogin, newPassword } = req.body;
    const users = loadUsers();

    if (!users[currentLogin]) {
        return res.status(400).json({ error: "Текущий пользователь не найден" });
    }

    if (newLogin && newLogin !== currentLogin && users[newLogin]) {
        return res.status(400).json({ error: "Пользователь с таким именем уже существует" });
    }

    const hash = newPassword
        ? await bcrypt.hash(newPassword, 10)
        : users[currentLogin];

    delete users[currentLogin];
    users[newLogin || currentLogin] = hash;

    saveUsers(users);

    res.json({ message: "Данные обновлены" });
});



console.log("Готов запускать сервер...");

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
