const express = require('express');
const router = express.Router();
//const log = require('../log.js');
const db = require('../database');

router.get('/init', (req, res) => {
  db.tables.settings.findAll().then(settings => {
    res.end(JSON.stringify(settings));
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.tables.user.findOne({
    where: {
      name: username,
      password: password
    }
  }).then(user => {
    res.end(JSON.stringify(user));
  });
});

module.exports = router;
