const express = require('express');
const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const Track = require('../models/Track');
const Album = require('../models/Album');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});
const router = express.Router();

router.get('/', async (req, res) => {
  let response;
  const album = req.query.album;
  const artist = req.query.artist;

  if (album) {
    response = await Track.find({album: album});

  } else if (artist) {
    const albums = await Album.find({artist: artist});
    response = await Track.find().where('album').in(albums).exec();

  } else {
    response = await Track.find();
  }
  res.send(response);
});

router.post('/', upload.single('image'), async (req, res) => {
  const trackData = req.body;

  if(req.file) {
    trackData.image = req.file.filename;
  }

  const track = new Track(trackData);

  try {
    await track.save();
    res.send(track)
  } catch (e) {
    res.status(400).send(e)
  }
});

module.exports = router;
