const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    let random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const campgroundSeed = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      author: '63ca950e2f2b9cbbec98a1a9',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias',
      price: price,
      images: [
        {
          url: 'https://res.cloudinary.com/di43xpxdg/image/upload/v1674553382/YelpCamp/g5b24m7awtmt3zhedvzh.jpg',
          filename: 'YelpCamp/g5b24m7awtmt3zhedvzh',
        },
        {
          url: 'https://res.cloudinary.com/di43xpxdg/image/upload/v1674553383/YelpCamp/i0re6op6t8man9t9lcjk.jpg',
          filename: 'YelpCamp/i0re6op6t8man9t9lcjk',
        },
      ],
    });

    await campgroundSeed.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
