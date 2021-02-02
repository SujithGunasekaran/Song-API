let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let songListAPI = new Schema({
    songName: {
        type: String,
        required: true
    },
    singerName: {
        type: String,
        required: true
    },
    filmName: {
        type: String,
        required: true
    }
})

let songList = mongoose.model('songListAPI', songListAPI);
module.exports = songList;