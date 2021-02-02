let router = require('express').Router();
let songList = require('../songListMode');

router.route('/post/songs').post((req, res) => {
    let newSongList = new songList(req.body);
    newSongList.save()
        .then(() => {
            res.status(200).json({ message: 'SongList added' })
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error SongList not Added' });
        })
})

router.route('/get/songs').post((req, res) => {
    let maxResult = req.body.maxResult;
    if (req.body.filmName) {
        songList.find({ filmName: req.body.filmName }, (err, responseData) => {
            if (err) res.status(404).json({ message: 'Error' })
            if (responseData.length > 0) res.status(200).json(responseData.slice(0, maxResult))
            else res.status(400).json({ message: 'Film Not Found' })
        })
    }
    else {
        songList.find({}, (err, responseData) => {
            if (responseData) res.status(200).json(responseData.slice(0, maxResult))
            if (err) res.status(404).json({ error: 'Error' })
        })
    }
})

module.exports = router;