/**** External libraries ****/
const express = require('express'); // The express.js library for implementing the API
const bodyParser = require('body-parser'); // Parsing the json request to javascript
const morgan = require('morgan'); // For logging everything that happens in the console, good for errors
const cors = require('cors'); //Prevends app from getting C.O.R.S (cross origin recourse sharing) errors

/**** Configuration ****/
const appName = "Lego Api"; //
const port = process.env.PORT || 8081; // Pick port 8080 if the PORT env variable is empty, Vue uses 8080.
const app = express(); // Get the express app object. An express instance

app.use(bodyParser.json()); // Add middleware that parses JSON from the request body.
app.use(morgan('combined')); // Add middleware that logs all http requests to the console.
app.use(cors()); // Avoid CORS errors. https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

/**** Some test data ****/ //Temporary Database
const legosets = [
  {
    "id": 0,
    "title": "LEGO Ideas Treehouse",
    "description": "Wonderful Spring/Autumn treehouse",
    "year": "2019",
    "setnumber": "21318",
    "pieces": "3036",
    "img": "https://cdn.shopify.com/s/files/1/1553/8473/products/21318_Front_02_Copy.jpg?v=1564045434",
    "popular": true
  },
  {
    "id": 1,
    "title": "LEGO Creator Expert Shopping street",
    "description": "Fancy Boutique",
    "year": "2019",
    "setnumber": "10255",
    "pieces": "4002",
    "img": "https://www.klodskassen.dk/images/10255-4-p.jpg",
    "popular": true
  },
  {
    "id": 2,
    "title": "LEGO Creator Expert Bookstore",
    "description": "Old school bookstore",
    "year": "2019",
    "setnumber": "10270",
    "pieces": "2504",
    "img": "https://i0.wp.com/brickshow.com/wp-content/uploads/2019/12/10270_alt2.jpg?ssl=1",
    "popular": true
  },
  {
    "id": 3,
    "title": "LEGO Creator Expert Aston Martin",
    "description": "007's speedy car",
    "year": "2019",
    "setnumber": "10262",
    "pieces": "1295",
    "img": "https://scale.coolshop-cdn.com/product-media.coolshop-cdn.com/AD7P98/3a536d0d7c124cfc8cc4585a1e7d7070.jpg/f/lego-creator-james-bond-aston-martin-db5-10262.jpg",
    "popular": true
  }
];

const legocomingsoon = [
  {
    "id": 0,
    "title": "Pirates of Barracuda Bay",
    "description": "Some nice description",
    "setnumber": "21322",
    "pieces": "2545",
    "releasedate": "01-04-2020",
    "comingsoon": true,
    "images": [
      {
        "img": "https://www.bricktastic.nl/wp-content/uploads/2020/03/lego-21322-pirates-of-barracuda-bay-5-scaled-1.jpg"
      },
      {
        "img": "https://imboldn.com/wp-content/uploads/2020/03/LEGO-Pirates-of-Barracuda-Bay-main.jpg"
      }
    ]
  },
  {
    "id": 1,
    "title": "Fiat 500",
    "description": "Some nice description",
    "setnumber": "10271",
    "pieces": "960",
    "releasedate": "01-03-2020",
    "comingsoon": true,
    "images": [
      {
        "img": "https://i.pinimg.com/originals/d7/0c/95/d70c952bb2254bda252895b9dab4e793.jpg"
      },
      {
        "img": "https://i.ytimg.com/vi/eZCVu5u1PSg/maxresdefault.jpg"
      }
    ]
  },
  {
    "id": 2,
    "title": "International Space Station",
    "description": "Some nice description",
    "setnumber": "21321",
    "pieces": "864",
    "releasedate": "01-02-2020",
    "comingsoon": true,
    "images": [
      {
        "img": "https://images.brickset.com/news/21321_Prod%20use%20this%20for%20the%20main%20set%20image.jpg"
      },
      {
        "img": "https://ideascdn.lego.com/media/generate/lego_ci/fda526a5-9cce-45d1-a768-9bbfc73d6703/resize:800:450"
      }
    ]
  }
];

const legobrick = [
  {
    "id": 0,
    "type": "Brick 2x2",
    "shape": "Square",
    "color": "Orange",
    "img": "https://www.steinelager.de/img/bricks/3/0/3003_106_lg.png"
  },
  {
    "id": 1,
    "type": "Brick 2x2",
    "shape": "Square",
    "color": "Light Grey",
    "img": "https://www.steinelager.de/img/bricks/3/0/3003_2_lg.png"
  },
  {
    "id": 2,
    "type": "Brick 2x2",
    "shape": "Square",
    "color": "Dark Red",
    "img": "https://vignette.wikia.nocookie.net/scrubbing-bubbles/images/0/0c/154_lg.png/revision/latest?cb=20180730210426"
  },
  {
    "id": 3,
    "type": "Brick 2x2",
    "shape": "Square",
    "color": "Dark Grey",
    "img": "https://www.steinelager.de/img/colors/27_lg.png"
  },
  {
    "id": 4,
    "type": "Brick 2x2",
    "shape": "Square",
    "color": "White",
    "img": "https://www.steinelager.de/img/bricks/3/0/3003_1_lg.png"
  },
  {
    "id": 5,
    "type": "Brick 1x1",
    "shape": "Round",
    "color": "Light Blue",
    "img": "https://www.steinelager.de/img/bricks/3/0/3062b_321_lg.png"
  },
  {
    "id": 6,
    "type": "Brick 1x1",
    "shape": "Round",
    "color": "Brown",
    "img": "https://www.steinelager.de/img/bricks/3/0/3062b_192_lg.png"
  },
  {
    "id": 7,
    "type": "Brick 1x1",
    "shape": "Round Flat",
    "color": "Yellow",
    "img": "https://www.steinelager.de/img/bricks/4/0/4073_24_lg.png"
  },
  {
    "id": 8,
    "type": "Brick 1x1",
    "shape": "Round Flat",
    "color": "Red Transparent",
    "img": "https://www.steinelager.de/img/bricks/4/0/4073_47_lg.png"
  },
  {
    "id": 9,
    "type": "Brick 1x1",
    "shape": "Round Flat",
    "color": "Dark Red Transparent",
    "img": "https://www.steinelager.de/img/bricks/4/0/4073_41_lg.png"
  }
];

const legominifig = [
  {
    "id": 0,
    "type": "hat",
    "description": "Blue wizard hat",
    "img": "https://www.pngfind.com/pngs/m/5-59729_800-x-600-8-lego-wizard-hat-png.png"   
  },
  {
    "id": 1,
    "type": "hat",
    "description": "Red workers helmet",
    "img": "https://img.bricklink.com/ItemImage/PL/3833.png",
  },
  {
    "id": 2,
    "type": "hat",
    "description": "Blue cap",
    "img": "https://static.turbosquid.com/Preview/2019/02/05__03_03_50/Lego_Hat_Blue_thumbnail_0000.jpgDD5D3E68-60CB-479A-A688-B920B00A57B3Default.jpg",
  },
  {
    "id": 3,
    "type": "hat",
    "description": "Black cap",
    "img": "https://static.turbosquid.com/Preview/2019/02/05__03_03_50/Lego_Hat_Black_thumbnail_0000.jpg24C95AEB-7B07-4BD0-8DE2-E52549A363A0Default.jpg",
  },
  {
    "id": 4,
    "type": "head",
    "description": "Simsons Homers' head",
    "img": "https://img.brickowl.com/files/image_cache/large/lego-homer-simpson-head-16807-27.jpg"
  },
  {
    "id": 5,
    "type": "body",
    "description": "Blue torso with white arms",
    "img": "https://img.brickowl.com/files/image_cache/large/lego-plain-torso-with-white-arms-and-yellow-hands-76382-88585-32.jpg"
  },
  {
    "id": 6,
    "type": "body",
    "description": "Blue workers outfit",
    "img": "https://img.brickowl.com/files/image_cache/large/lego-torso-with-blue-bib-overalls-with-pocket-tools-pencil-76382-32.jpg"
  },
  {
    "id": 7,
    "type": "body",
    "description": "Police officer outfit",
    "img": "https://img.brickowl.com/files/image_cache/large/lego-fire-fighter-s-torso-with-jacket-with-neon-yellow-horizontal-stripes-and-golden-badge-with-black-arms-and-yellow-hands-76382-88585-32.jpg"
  },
  {
    "id": 8,
    "type": "body",
    "description": "Spacemen t-shirt with green arms",
    "img": "https://img.brickowl.com/files/image_cache/large/lego-minifigure-torso-with-spaceman-and-green-undershirt-without-wrinkles-on-back-76382-32.jpg"
  },
  {
    "id": 9,
    "type": "legs",
    "description": "Black legs",
    "img": "https://img.brickowl.com/files/image_cache/large/lego-minifigure-hips-and-legs-73200-88584-32.jpg"
  }
];

const legocollection = [
  {
    "id": 0,
    "name": "Hank",
    "description": "Some nice description about Hank",
    "img": "https://www.lego.com/cdn/cs/catalog/assets/blt1ad5e7fb7cf86c00/1/8833_Portrait_Pirate.png",
    "yourcollection": true
  }
];

/**** Routes ****/

// Returns all const
app.get('/api/popularitems', (request, response) => {
  const filtered = legosets.filter(legoset => legoset.popular === true);
  response.json(filtered);
}); //GET request to url, request from browser and respond from api

app.get('/api/comingsoon', (request, response) => {
  response.json(legocomingsoon);
});

app.get('/api/pickabrick', (request, response) => {
  response.json(legobrick);
});

app.get('/api/pickafig', (request, response) => {
  response.json(legominifig);
});

app.get('/api/yourcollection', (request, response) => {
  response.json(legocollection);
});

app.get('/api/homepopularitem', (request, response) => {
  const randomset = Math.round(Math.random() * (legosets.length - 1))
  console.log(randomset);
  response.json(legosets[randomset]);
});

app.get('/api/homecomingsoon', (request, response) => {
  const randomsoon = Math.round(Math.random() * (legocomingsoon.length - 1))
  console.log(randomsoon);
  response.json(legocomingsoon[randomsoon]);
});

app.get('/api/homepickabrick', (request, response) => {
  const randombrick = Math.round(Math.random() * (legobrick.length - 1))
  console.log(randombrick);
  response.json(legobrick[randombrick]);
});

app.get('/api/homepickafig', (request, response) => {
  const randomfig = Math.round(Math.random() * (legominifig.length - 1))
  console.log(randomfig);
  response.json(legominifig[randomfig]);
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