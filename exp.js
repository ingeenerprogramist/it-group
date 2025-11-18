<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Графический интерфейс</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 50px;
    }
    input, button {
      padding: 10px;
      margin: 10px;
      font-size: 16px;
    }
    #output {
      margin-top: 20px;
      font-weight: bold;
      color: #333;
    }
  </style>
</head>
<body>
  <h2>Введите сообщение</h2>
  <input type="text" id="userInput" placeholder="Напишите что-нибудь..." />
  <button onclick="showMessage()">Показать</button>
  <div id="output"></div>

  <script>
    function showMessage() {
      const input = document.getElementById('userInput').value;
      const output = document.getElementById('output');
      output.textContent = `Вы ввели: ${input}`;
    
