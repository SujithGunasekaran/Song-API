let express = require('express');
let mongoose = require('mongoose');
let dotenv = require('dotenv');
let cors = require('cors');
let path = require('path');

dotenv.config();

let server = express();
server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, 'Public')));

let PORT = process.env.POST || 5000;

server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})

let mongoURI = process.env.MongoURI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongodb Connected Successfully");
    })
    .catch((err) => {
        console.log(err);
    })

let songListRouter = require('./model/router/songListRouter');
let commonRouter = require('./model/router/commonRouter');

server.use('/songList', songListRouter);
server.use('/common', commonRouter);

