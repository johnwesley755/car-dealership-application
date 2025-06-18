const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Dealer = require('../models/Dealer');

// GET all reviews for a dealer
router.get('/dealer/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ dealerId: req.params.id }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new review for a dealer
router.post('/dealer/:id/reviews', async (req, res) => {
  try {
    // Check if dealer exists
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }

    const review = new Review({
      dealerId: req.params.id,
      reviewer: req.body.reviewer,
      rating: req.body.rating,
      comment: req.body.comment,
      sentiment: req.body.sentiment || 'neutral'
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;