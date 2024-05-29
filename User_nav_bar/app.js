// app.js

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

// 根路由处理
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to get content based on section
app.get('/content/:section', (req, res) => {
  const section = req.params.section;
  // 读取对应的 HTML 文件并发送
  fs.readFile(path.join(__dirname, 'public', `${section}.html`), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

// 处理其他路由和错误
// 新增路由处理 Remove_user_password.html
app.get('/content/Remove_user_password', (req, res) => {
  // Send content of Remove_user_password.html 
  res.sendFile(path.join(__dirname, 'public', 'Remove_user_password.html'));
});

module.exports = app;
