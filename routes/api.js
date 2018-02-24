const express = require('express');
const log = require('../log.js');
const db = require('../database');

const router = express.Router();

function logData(method, data) {
  log.info(method + ': ' + JSON.stringify(data, null, 4));
  return data;
}

function saveSortOrder(array) {
  return db.tables.settings.update({
    sortOrder: array
  }, {
    where: {
      id: 1
    }
  });
}

router.get('/init', (req, res) => {
  db.tables.settings.findOne({
    where: {
      id: 1
    }
  }).then(settings => {
    settings.accountAmount = parseFloat(settings.accountAmount);
    settings.budgetAmount = parseFloat(settings.budgetAmount);
    db.tables.thneed.findAll({
      where: {
        purchased: null
      },
      order: 'id'
    }).then(thneeds => {
      res.json({
        settings: settings,
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
  const settings = logData('saveSettings', req.body);
  db.tables.settings.update(settings, {
    where: {
      id: 1
    }
  }).then(() => {
    res.json({success: true});
  });
});

router.post('/addThneed', (req, res) => {
  const thneedData = logData('addThneed', req.body);
  db.tables.thneed.create(thneedData).then(thneed => {
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

router.post('/saveSortOrder', (req, res) => {
  const array = logData('saveSortOrder', req.body);
  saveSortOrder(array).then(() => {
    res.json({success: true});
  });
});

router.post('/deleteThneed', (req, res) => {
  const data = logData('deleteThneed', req.body);
  const id = data.id;
  const sortOrder = data.sortOrder;
  db.tables.thneed.destroy({
    where: {
      id: id
    }
  }).then(() => {
    saveSortOrder(sortOrder).then(() => {
      res.json({success: true});
    });
  })
});

router.post('/saveThneed', (req, res) => {
  const data = logData('saveThneed', req.body);
  const id = data.id;
  const thneed = data.thneed;
  db.tables.thneed.update(thneed, {
    where: {
      id: id
    }
  }).then(() => {
    res.json({success: true});
  });
});

router.post('/purchaseThneed', (req, res) => {
  const data = logData('saveThneed', req.body);
  const id = data.id;
  const sortOrder = data.sortOrder;
  db.tables.thneed.update({purchased: new Date()}, {
    where: {
      id: id
    }
  }).then(() => {
    saveSortOrder(sortOrder).then(() => {
      res.json({success: true});
    });
  });
});

module.exports = router;
