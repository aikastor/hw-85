const express = require('express');
const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const Album = require('../models/Album');
const Track = require('../models/Track');

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
  const artist = req.query.artist;

  if (!artist) {
    response = await Album.find();
    res.send(response);
  } else {

    response = await Album.find({artist: artist}).sort('year').lean();

    for (let i of response) {
      i.tracksQnt = await Track.countDocuments({album: i._id}).lean()
    }

    res.send(response);
  }

});
router.get('/:id', async (req, res) => {
  try {
    const item = await Album.findById(req.params.id).populate('artist');

    if (!item) {
      return res.status(404).send({message: 'Not found'});
    }
    res.send(item);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});
router.post('/', upload.single('image'), async (req, res) => {
  const albumData = req.body;

  if(req.file) {
    albumData.image = req.file.filename;
  }

  const album = new Album(albumData);

  try {
    await album.save();
    res.send(album)
  } catch (e) {
    res.status(400).send(e)
  }
});

module.exports = router;
