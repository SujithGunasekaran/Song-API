let router = require('express').Router();
let axios = require('axios');

router.route('/post/songs').post((req, res) => {
    let songList = {
        songName: req.body.songName,
        singerName: req.body.singerName,
        filmName: req.body.filmName
    }
    axios.post('http://localhost:5000/common/post/songs', songList)
        .then((responseData) => {
            res.status(200).json(responseData.data)
        })
        .catch((err) => {
            res.status(400).json({ message: err })
        })
})

router.route('/get/songs').get((req, res) => {
    let maxResult = 1000;
    let queryString = ['maxResult', 'filmName'];
    let getRequest = true;
    let filmName = '';
    for (key in req.query) {
        if (key) {
            if (queryString.includes(key)) {
                if (key === 'maxResult') {
                    maxResult = req.query[key];
                }
                if (key === 'filmName') {
                    filmName = req.query[key];
                }
            }
            else {
                getRequest = false;
                res.status(400).json({ message: 'Invalid URL' })
            }
        }
    }
    let requestQuery = { maxResult: maxResult, filmName: filmName };
    if (getRequest) {
        axios.post('http://localhost:5000/common/get/songs', requestQuery)
            .then((responseData) => {
                res.status(200).json(responseData.data);
            })
            .catch((err) => {
                res.status(400).json({ message: err })
            })
    }
})

module.exports = router;