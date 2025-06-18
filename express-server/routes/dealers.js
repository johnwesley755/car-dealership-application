const express = require('express');
const router = express.Router();
const Dealer = require('../models/Dealer');

// GET all dealers
router.get('/dealers', async (req, res) => {
  try {
    const dealers = await Dealer.find();
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET dealer by ID
router.get('/dealer/:id', async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ message: 'Dealer not found' });
    }
    res.json(dealer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET dealers by state
router.get('/dealers/state/:state', async (req, res) => {
  try {
    const dealers = await Dealer.find({ state: req.params.state });
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new dealer (for admin use)
router.post('/dealers', async (req, res) => {
  const dealer = new Dealer({
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    zip: req.body.zip,
    phone: req.body.phone,
    website: req.body.website
  });

  try {
    const newDealer = await dealer.save();
    res.status(201).json(newDealer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;