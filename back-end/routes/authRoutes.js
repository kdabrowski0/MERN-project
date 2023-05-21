const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router.route('/login')
    .post( usersController.login)

router.route('/refresh')
    .get(usersController.refresh)

router.route('/logout')
    .post(usersController.logout)


module.exports = router