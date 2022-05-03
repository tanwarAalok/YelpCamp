const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

// ********************************************************************************

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "CONNECTION ERROR:"));
db.once("open", () => {
  console.log("CONNECTED to MongoDB");
});


// ********************************************************************************

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
        author: "62523c524e15fbc4aba33683",
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(places)} ${sample(descriptors)}`,
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde quisquam, ullam recusandae impedit deserunt, voluptatum temporibus amet ducimus minima aut magni deleniti consectetur asperiores voluptas pariatur, non inventore blanditiis iste.",
        price,
        geometry: {
          type: 'Point',
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
          ]
        },
        images: [
            {
              url: 'https://res.cloudinary.com/dw2dqblhs/image/upload/v1651381204/YelpCamp/zjf1tesopnkcfmdshqod.jpg',
              filename: 'YelpCamp/zjf1tesopnkcfmdshqod',
            },
            {
              url: 'https://res.cloudinary.com/dw2dqblhs/image/upload/v1651382345/YelpCamp/go7wcvxs5yfghu0lqi9g.jpg',
              filename: 'YelpCamp/go7wcvxs5yfghu0lqi9g',
            },
            {
              url: 'https://res.cloudinary.com/dw2dqblhs/image/upload/v1651382347/YelpCamp/yvfpc2n1ptzfhzqkcnkv.jpg',
              filename: 'YelpCamp/yvfpc2n1ptzfhzqkcnkv',
            }
          ]
      });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});


