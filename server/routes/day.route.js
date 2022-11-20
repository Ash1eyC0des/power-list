const express = require('express')
const router = express.Router()
const dayController = require('../controllers/days.controller')
const { ensureAuth } = require('../middleware/auth')

router.get('/get', ensureAuth, dayController.getDay)
router.post('/create', ensureAuth, dayController.createDay)
router.put('/edit', ensureAuth, dayController.editDay)
router.delete('/delete', ensureAuth, dayController.deleteDay)

module.exports = router
