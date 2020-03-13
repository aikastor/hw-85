const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectID,
    ref: 'Album',
    required: true,
  },
  length: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  }
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;
