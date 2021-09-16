var express = require('express');
var userCtrl = require('./user.ctrl');
var authCtrl = require('../auth/auth.ctrl');

const router = express.Router()

router.param('userId', userCtrl.userByID)

router.route('/loopback')
  .get((req, res) => { res.json({ status: 'ok' }) })

router.route('/secured-loopback')
  .get(authCtrl.requireSignin, (req, res) => { res.json({ status: 'ok' }) })

router.route('')
  .post(userCtrl.create)
  .get(authCtrl.requireSignin, userCtrl.list)

router.route('/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.authorizedToUpdateProfile, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.authorizedToUpdateProfile, userCtrl.remove)

module.exports = router;
