const mongoose = require('mongoose');

const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
  await mongoose.connect('mongodb://localhost/last-fm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const  artist = await Artist.create({
    'name': 'Queen',
    'image': 'queen.jpeg'
  });

  const album = await Album.create({
    'title': 'Queen',
    'year' : 1973,
    'artist': artist._id,
    'image' : 'quuen-al.jpg'
  });

  const [track1, track2, track3, track4,track5, track6] = await Track.create(
    {
      'title' : 'Liar',
      'album' : album._id,
      'length' : '06:25',
      'number' : 5
    },
    {
      'title' : 'The Night Comes Down',
      'album' : album._id,
      'length' : '04:23',
      'number' : 6
    },
    {
      'title' : 'My fairy King',
      'album' : album._id,
      'length' : '04:12',
      'number' : 4
    },
    {
      'title' : 'Doing all right',
      'album' : album._id,
      'length' : '04:28',
      'number' : 2
    },
    {
      'title' : 'Great king rat',
      'album' : album._id,
      'length' : '03:23',
      'number' : 3
    },
    {
      'title' : 'Keep yourself alive',
      'album' : album._id,
      'length' : '04:23',
      'number' : 1
    },
    {
      'title' : 'Modern times Rock',
      'album' : album._id,
      'length' : '08:11',
      'number' : 7
    },
  )
};

run().catch(e => {
  throw e
});