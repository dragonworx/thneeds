const express = require('express');
const router = express.Router();
const log = require('../log.js');
const db = require('../database');

function logData(method, data) {
  log.info(method + ': ' + JSON.stringify(data, null, 4));
  return data;
}

router.get('/init', (req, res) => {
  db.tables.settings.findAll().then(settings => {
    db.tables.thneed.findAll({
      where: {
        purchased: null
      },
      order: 'id'
    }).then(thneeds => {
      res.json({
        settings: settings[0],
        thneeds: thneeds
      });
    });
  });
});

router.post('/login', (req, res) => {
  const data = logData('login', {
    name: req.body.username,
    password: req.body.password
  });
  db.tables.user.findOne({
    where: {
      name: data.username,
      password: data.password
    }
  }).then(user => {
    res.json(user);
  });
});

router.post('/saveSettings', (req, res) => {
  const data = logData('saveSettings', {
    accountDescription: req.body.accountDescription,
    accountAmount: req.body.accountAmount,
    budgetAmount: req.body.budgetAmount,
    budgetFrequency: req.body.budgetFrequency,
  });
  db.tables.settings.findAll().then(settings => {
    return settings[0].update(data).then(() => {
      res.json({success:true});
    });
  });
});

router.post('/addThneed', (req, res) => {
  const data = logData('addThneed', {
    userId: req.body.userId,
    title: req.body.title,
    notes: req.body.notes,
    label: req.body.label,
    amount: req.body.amount
  });
  db.tables.thneed.create(data).then(thneed => {
    res.json({
      err: null,
      thneed: thneed
    });
  }).catch(err => {
    res.json({
      err: err,
      thneed: null
    })
  });
});

router.post('/saveThneeds', (req, res) => {
  const data = logData('saveThneeds', req.body.thneeds);
  Promise.all(data.map(function (thneed) {
    return db.tables.thneed.update(thneed, {where:{id:thneed.id}});
  })).then(() => {
    res.json({success:true});
  });
});

router.post('/saveSortOrder', (req, res) => {
  const data = logData('saveSortOrder', req.body.sortOrder);
  db.tables.settings.update(data, {where:{id:1}}).then(() => res.json({success:true}));
});

module.exports = router;
