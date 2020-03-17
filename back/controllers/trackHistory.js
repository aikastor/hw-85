const express = require('express');

const User = require('../models/User');
const TrackHistory = require('../models/TrackHistory');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Track = require('../models/Track');

const router = express.Router();

router.post('/', async (req, res) => {

  const token = req.get('token');
  const user = await User.findOne({token});

  if(!user) return res.status(401).send({error: 'User is unauthorized!'});

  const trackHistory = new TrackHistory(req.body);

  try {
    trackHistory.user = user._id;
    await trackHistory.save();
    return res.send(trackHistory);
  } catch(error) {
    return res.status(400).send({error})
  }

});

router.get('/', async (req, res) => {
  const token = req.get('token');
  const user = await User.findOne({token});

  if (!user) return res.status(401).send({error: 'User is unauthorized!'});

  const tracks = await TrackHistory.find({user:user._id}).sort('-datetime').lean();

  for (let i of tracks) {
    let trackInfo = await Track.findById(i.track).exec();
    let albumName = await Album.findById(trackInfo.album).exec();
    let artistName = await Artist.findById(albumName.artist);
    i.trackInfo = `${artistName.name} - ${trackInfo.title}`
  }
  return res.status(200).send(tracks)

});
module.exports = router;
