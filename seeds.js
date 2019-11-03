const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Well, she's not doing a very good job. Yeah. Stand tall, boy, have some respect for yourself. Don't you know that if you let people walk all over you know, they'll be walking all over you for the rest of your life? Listen to me, do you think I'm gonna spend the rest of my life in this slop house? Nothing's coming to my mind. No, it was The Enchantment Under The Sea Dance. Our first date. It was the night of that terrible thunderstorm, remember George? Your father kissed me for the very first time on that dance floor. It was then I realized I was going to spend the rest of my life with him."
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Well, she's not doing a very good job. Yeah. Stand tall, boy, have some respect for yourself. Don't you know that if you let people walk all over you know, they'll be walking all over you for the rest of your life? Listen to me, do you think I'm gonna spend the rest of my life in this slop house? Nothing's coming to my mind. No, it was The Enchantment Under The Sea Dance. Our first date. It was the night of that terrible thunderstorm, remember George? Your father kissed me for the very first time on that dance floor. It was then I realized I was going to spend the rest of my life with him."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Well, she's not doing a very good job. Yeah. Stand tall, boy, have some respect for yourself. Don't you know that if you let people walk all over you know, they'll be walking all over you for the rest of your life? Listen to me, do you think I'm gonna spend the rest of my life in this slop house? Nothing's coming to my mind. No, it was The Enchantment Under The Sea Dance. Our first date. It was the night of that terrible thunderstorm, remember George? Your father kissed me for the very first time on that dance floor. It was then I realized I was going to spend the rest of my life with him."
    }
]

const seedDB = () => {
    // Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('removed campgrounds');
            // Add starter campgrounds
            data.forEach(seed => {
                Campground.create(seed, (err, campground) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('added a campground');
                        // create a comment
                        Comment.create(
                            {
                                text: 'This place is great, but I wish there was internet.',
                                author: 'Homer'
                            }, (err, comment) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('Created new comment');
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;