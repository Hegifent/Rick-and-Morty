const express = require('express');
const router = express.Router();
const axios = require('axios')

const mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect("mongodb+srv://qwerty123:qwerty123@cluster0.gdlpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");




const character = new mongoose.Schema({
  id: Number,
  name: String,
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {
    name: {
      type: String
    },
    url: {
      type: String
    },
  },
  location: {
    name: {
      type: String
    },
    url: {
      type: String
    },
  },
  image: String,
  episode: Array,
  url: String,
  created: String,
  createDate: {
    type: Date,
    default: () => Date.now()
  }
});

const location = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  dimension: String,
  residents: Array,
  url: String,
  created: String,
  createDate: {
    type: Date,
    default: () => Date.now()
  }
});


const episode = new mongoose.Schema({
  id: Number,
  name: String,
  air_date: String,
  episode: String,
  characters: Array,
  url: String,
  created: String,
  createDate: {
    type: Date,
    default: () => Date.now()
  }
});


const Character = mongoose.model('Character', character);
const Episode = mongoose.model('Episode', episode);
const Location = mongoose.model('Location', location);


(async () => {
  const allText = await Character.find();
  console.log(allText);
})()



router.get('/', async function (req, res) {
  await Character.remove()
  await Episode.remove()
  await Location.remove()
  res.send("Database cleared!")
});


router.get('/character', async function (req, res) {
  const allCharacters = await Character.find();

  (Date.now() - allCharacters[0].createDate) / 1000 / 60 > 43200 ? allCharacters = [] : allCharacters

  if (allCharacters.length == 0) {
    await axios.get('https://rickandmortyapi.com/api/character').then(
      async response => {
        await Character.create(response.data.results);
        res.send(response.data.results)
      })
  } else {
    res.send(allCharacters)
  }
});

router.get('/character/:id', async function (req, res) {
  const chosedCharacter = await Character.find({ id: req.params.id }).exec();
  console.log(chosedCharacter);
  res.send(chosedCharacter);
});

router.get('/location', async function (req, res) {

  const allLocations = await Location.find();

  (Date.now() - allLocations[0].createDate) / 1000 / 60 > 43200 ? allLocations = [] : allLocations

  if (allLocations.length == 0) {
    await axios.get('https://rickandmortyapi.com/api/location').then(
      async response => {
        await Location.create(response.data.results);
        res.send(response.data.results)
      })
  } else {
    res.send(allLocations)
  }
});

router.get('/location/:id', async function (req, res) {
  const chosedLocation = await Location.find({ id: req.params.id }).exec();
  console.log(chosedLocation);
  res.send(chosedLocation);
});

router.get('/episode', async function (req, res) {
  const allEpisodes = await Episode.find();

  (Date.now() - allEpisodes[0].createDate) / 1000 / 60 > 43200 ? allEpisodes = [] : allEpisodes

  if (allEpisodes.length == 0) {
    await axios.get('https://rickandmortyapi.com/api/episode').then(
      async response => {
        await Episode.create(response.data.results);
        res.send(response.data.results)
      })
  } else {
    res.send(allEpisodes)
  }
});

router.get('/episode/:id', async function (req, res) {
  const chosedEpisode = await Episode.find({ id: req.params.id }).exec();
  console.log(chosedEpisode);
  res.send(chosedEpisode);
});


module.exports = router;
