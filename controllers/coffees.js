const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs');
  });
  
router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});
  
router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
router.get('/', async (req, res) => {
  res.render('coffees/index.ejs');
});
router.get('/new', async (req, res) => {
  res.render('coffees/new.ejs');
});
    
module.exports = router;
router.post('/', async (req, res) => {
  try {
    // Look up the user from req.session
    const currentUser = await User.findById(req.session.user._id);
    // Push req.body (the new form data object) to the
    // pantry array of the current user
    currentUser.coffees.push(req.body);
    // Save changes to the user
    await currentUser.save();
     // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/coffees`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

router.get('/', async (req, res) => {
  try {
    // Look up the current user’s coffee
    const currentUser = await User.findById(req.session.user._id);
    // Send all coffee items to the view via res.locals
    res.locals('coffees/index.ejs', {
      coffees: currentUser.coffees,
    });
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});