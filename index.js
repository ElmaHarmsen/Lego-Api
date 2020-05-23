/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser'); // Parsing the json request to javascript
const morgan = require('morgan'); // For logging everything that happens in the console, good for errors
const cors = require('cors'); //Prevends app from getting C.O.R.S (cross origin recourse sharing) errors
const mongoose = require("mongoose"); //Database

/**** Configuration ****/
const appName = "Lego Api"; //
const port = process.env.PORT || 8081; // Pick port 8080 if the PORT env variable is empty, Vue uses 8080.
const app = express(); // Get the express app object. An express instance

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

(async (_) => {
  try {
    const url = process.env.CONNECTION_STRING;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Success!");
  } catch (error) {
    console.error("Connection failed!", error);
  }
})();
//() immediately invoked expression - runs instantly when JS finds it

const legoSetSchema = new mongoose.Schema ({
  title: String,
  description: String,
  year: String,
  setnumber: Number,
  pieces: Number,
  img: String,
  popular: Boolean
}, {collection: "LegoSets"});
const legoSet = mongoose.model("legoSet", legoSetSchema)

const legoSoonSchema = new mongoose.Schema ({
  title: String,
  description: String,
  setnumber: Number,
  pieces: Number,
  releasedate: String,
  comingsoon: Boolean,
  images: Array
}, {collection: "LegoSoons"});
const legoSoon = mongoose.model("legoSoon", legoSoonSchema)

const legoBrickSchema = new mongoose.Schema ({
  type: String,
  shape: String,
  color: String,
  img: String
}, {collection: "LegoBricks"});
const legoBrick = mongoose.model("legoBrick", legoBrickSchema)

const legoFigSchema = new mongoose.Schema ({
  type: String,
  img: String
}, {collection: "LegoFigs"});
const legoFig = mongoose.model("legoFig", legoFigSchema)

/**** Routes ****/

// Returns all const
app.get('/api/popularitems', async (request, response) => {
  const filtered = await legoSet.find({popular: true});
  response.json(filtered);
}); //GET request to url, request from browser and respond from api

app.get('/api/comingsoon', async (request, response) => {
  response.json(await legoSoon.find({}));
});

app.get('/api/pickabrick', async(request, response) => {
  response.json(await legoBrick.find({}));
});

app.get('/api/pickafig', async(request, response) => {
  response.json(await legoFig.find({}));
});

app.post('/api/yourcollection', async (request, response) => {
  const legoIds = request.body;
  const legoSets = await legoSet.find().where('_id').in(legoIds).exec();
  const legoSoons = await legoSoon.find().where('_id').in(legoIds).exec();
  response.json(legoSets.concat(legoSoons));
});

app.post('/api/homeyourcollection', async(request, response) => {
  const legoIds = request.body;
  const legoSets = await legoSet.find().where('_id').in(legoIds).exec();
  const legoSoons = await legoSoon.find().where('_id').in(legoIds).exec();
  const results = legoSets.concat(legoSoons);
  const randomset = Math.round(Math.random() * (results.length - 1))
  response.json(results[randomset]);
});

app.get('/api/homepopularitem', async(request, response) => {
  const randomset = Math.round(Math.random() * (await legoSet.countDocuments({}) - 1))
  const allSets = await legoSet.find({});
  response.json(allSets[randomset]);
});

app.get('/api/homecomingsoon', async(request, response) => {
  const randomsoon = Math.round(Math.random() * (await legoSoon.countDocuments({}) - 1))
  const allSoons = await legoSoon.find({});
  response.json(allSoons[randomsoon]);
});

app.get('/api/homepickabrick', async(request, response) => {
  const randombrick = Math.round(Math.random() * (await legoBrick.countDocuments({}) - 1))
  const allBricks = await legoBrick.find({});
  response.json(allBricks[randombrick]);
});

app.get('/api/homepickafig', async(request, response) => {
  const randomfig = Math.round(Math.random() * (await legoFig.countDocuments({}) - 1))
  const allFigs = await legoFig.find({});
  response.json(allFigs[randomfig]);
});


// Return the recipe in data with its id equal to ':id' in the route below.
// app.get('/api/recipes/:id', (req, res) => {
//     const id = req.params.id;
//     const recipe = data.find(e => e.id === parseInt(id));
//     res.json(recipe);
// });

// app.post('/api/recipes', (req, res) => {
//     const title = req.body.title;
//     const desc = req.body.description;
//     const newRecipe = {
//         title: title,
//         description: desc
//     };
//     data.push(newRecipe);
//     res.json({msg: "Recipe added", newRecipe: newRecipe});
// });

// app.post('/api/recipes/:id/ingredients', (req, res) => {
//     // TODO: Add new ingredient
// });

// TODO: Example of handling PUT
// TODO: Example of handling DELETE

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));