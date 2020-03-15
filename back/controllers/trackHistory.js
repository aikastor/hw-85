const express = require('express');

const User = require('../models/User');
const TrackHistory = require('../models/TrackHistory');

const router = express.Router();

router.post('/', async (req, res) => {

  const token = req.get('token');
  const user = await User.findOne({token});

  if(!user) return res.status(401).send({error: 'User is unauthorized!'});

  const trackHistory = new TrackHistory(req.body);

  try{
    trackHistory.user = user._id;
    await trackHistory.save();
    return res.send(trackHistory);
  } catch(error) {
    return res.status(400).send({error})
  }

});

module.exports = router;