const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index.ejs', {
        data: {},
        errors: {},
        title: 'BTC FLO Exchange API'
    })
})

module.exports = router