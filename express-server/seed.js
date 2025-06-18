const mongoose = require('mongoose');
const Dealer = require('./models/Dealer');
const Review = require('./models/Review');
require('dotenv').config();

// Import DB connection
const connectDB = require('./db');

// Sample dealer data
const dealerData = [
  {
    name: "Sunshine Auto Group",
    city: "Miami",
    state: "FL",
    address: "123 Sunshine Blvd",
    zip: "33101",
    phone: "(305) 555-1234",
    website: "www.sunshineauto.com",
  },
  {
    name: "Mountain View Motors",
    city: "Denver",
    state: "CO",
    address: "456 Mountain Road",
    zip: "80201",
    phone: "(303) 555-5678",
    website: "www.mountainviewmotors.com",
  },
  {
    name: "Golden State Cars",
    city: "San Francisco",
    state: "CA",
    address: "789 Golden Gate Ave",
    zip: "94102",
    phone: "(415) 555-9012",
    website: "www.goldenstatecars.com",
  },
  {
    name: "Empire Auto",
    city: "New York",
    state: "NY",
    address: "101 Empire State Dr",
    zip: "10001",
    phone: "(212) 555-3456",
    website: "www.empireauto.com",
  },
  {
    name: "Lone Star Vehicles",
    city: "Austin",
    state: "TX",
    address: "202 Lone Star Blvd",
    zip: "78701",
    phone: "(512) 555-7890",
    website: "www.lonestarv.com",
  },
  {
    name: "Sunflower Auto Group",
    city: "Wichita",
    state: "KS",
    address: "1500 East Douglas Ave",
    zip: "67214",
    phone: "(316) 555-1234",
    website: "www.sunflowerauto.com",
  },
];

// Sample review texts with sentiments
const reviewData = [
  {
    comment: 'Great service and friendly staff. They made buying a car so easy!',
    rating: 5,
    sentiment: 'positive'
  },
  {
    comment: 'The salesperson was very knowledgeable and helped me find the perfect car for my needs.',
    rating: 5,
    sentiment: 'positive'
  },
  {
    comment: 'Decent selection of cars but prices were a bit high compared to other dealerships.',
    rating: 3,
    sentiment: 'neutral'
  },
  {
    comment: 'Terrible experience. The car had issues right after I bought it and they refused to help.',
    rating: 1,
    sentiment: 'negative'
  },
  {
    comment: 'Average dealership. Nothing special but got the job done.',
    rating: 3,
    sentiment: 'neutral'
  },
  {
    comment: 'I love my new car! The financing options were great and the process was smooth.',
    rating: 5,
    sentiment: 'positive'
  },
  {
    comment: 'Waited for hours to see a salesperson. Very disappointed with the customer service.',
    rating: 2,
    sentiment: 'negative'
  },
  {
    comment: 'The car was in excellent condition as advertised. Happy with my purchase.',
    rating: 4,
    sentiment: 'positive'
  }
];

// Reviewer names
const reviewers = [
  'John Smith',
  'Emily Johnson',
  'Michael Brown',
  'Sarah Davis',
  'David Wilson',
  'Jessica Martinez',
  'Robert Taylor',
  'Jennifer Anderson'
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Clear existing data
    await Dealer.deleteMany({});
    await Review.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Insert dealers
    const dealers = await Dealer.insertMany(dealerData);
    console.log(`${dealers.length} dealers inserted`);
    
    // Create reviews for each dealer
    const reviews = [];
    
    dealers.forEach(dealer => {
      // Add 3-5 reviews per dealer
      const numReviews = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numReviews; i++) {
        const randomReviewIndex = Math.floor(Math.random() * reviewData.length);
        const randomReviewerIndex = Math.floor(Math.random() * reviewers.length);
        
        const review = new Review({
          dealerId: dealer._id,
          reviewer: reviewers[randomReviewerIndex],
          rating: reviewData[randomReviewIndex].rating,
          comment: reviewData[randomReviewIndex].comment,
          sentiment: reviewData[randomReviewIndex].sentiment,
          date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within last 30 days
        });
        
        reviews.push(review);
      }
    });
    
    await Review.insertMany(reviews);
    console.log(`${reviews.length} reviews inserted`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();