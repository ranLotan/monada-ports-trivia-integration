const express = require('express')
const router = express.Router()

router.get('/game-data', (req, res) => {
    const gameData = 'hello world'
    
    res.send(gameData);
})

module.exports = router