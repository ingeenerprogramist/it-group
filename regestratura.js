// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

// Получить всех пациентов
app.use(express.static(__dirname));

// Для главной страницы индекса
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  
});

//Для получения списка
app.get("/patients", (req, res) => {
  res.json(loadPatients());
});

const dbPath = path.join(__dirname, "patients.json");

// Загрузить пациентов
function loadPatients() {
  if (!fs.existsSync(dbPath)) return [];
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } catch (err) {
    console.error("Ошибка чтения файла:", err);
    return [];

  }
}

// Сохранить пациентов
function savePatients(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

}




// Добавить пациента
app.post("/patients", (req, res) => {
  const newPatient = req.body;
  if (!newPatient.id || !newPatient.name) {
    return res.status(400).send("Ошибка: отсутствует ID или имя пациента");
  }
  const patients = loadPatients();
  patients.push(newPatient);
  savePatients(patients);
  res.status(201).send("Пациент добавлен");
});

// Удалить пациента по ID
app.delete("/patients/:id", (req, res) => {
  const id = req.params.id;
  let patients = loadPatients();
  const filtered = patients.filter(p => p.id !== id);
  if (filtered.length === patients.length) {
    return res.status(404).send("Пациент не найден");
  }

  savePatients(filtered);
  res.send("Пациент удален");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
