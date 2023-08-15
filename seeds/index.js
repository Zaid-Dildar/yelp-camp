const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection Error:'))
db.once('open', () => {
    console.log('Database Connected.')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new Campground({
            author: '63358320d698b569dab4acd7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat aspernatur deleniti magni iste incidunt illum tempore obcaecati! Eligendi sunt neque accusamus recusandae adipisci porro, quae corrupti exercitationem, saepe tempore cum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmx66oic1/image/upload/v1664720116/YelpCamp/syi0deuxgcvektdumb79.webp',
                    filename: 'YelpCamp/syi0deuxgcvektdumb79'
                },
                {
                    url: 'https://res.cloudinary.com/dmx66oic1/image/upload/v1664796293/YelpCamp/l72xtxnjxkngar6audjd.jpg',
                    filename: 'YelpCamp/qz04uiw6itqbatv5exlm'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    db.close()
})