const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
      const currentUser = await User.findById(req.session.user._id)
      res.render("coffees/index.ejs", {coffees: currentUser.coffees})
  } catch (error){
      console.log(error)
      res.redirect("/")
  }
});

router.get('/new', async (req, res)=> {
  try {

      const currentUser = await User.findById(req.session.user._id);
      res.render("coffees/new.ejs", {
        user: currentUser
      });

  } catch (error){
      console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
      
      const currentUser = await User.findById(req.session.user._id)
      
      
      currentUser.coffees.push(req.body)
      
      await currentUser.save();
  // Redirect back to the applications index view
      res.redirect(`/users/${currentUser._id}/coffees`)

  } catch (error){
      console.log(error)
      res.redirect("/")
  }
})
// router.get('/', async (req, res) => {
//   try {
//     // Look up the current user’s coffee
//     const currentUser = await User.findById(req.session.user._id);
//     // Send all coffee items to the view via res.locals
//     res.locals('coffees/index.ejs', {
//       coffees: currentUser.coffees,
//     });
//   } catch (error) {
//     // If any errors, log them and redirect back home
//     console.log(error);
//     res.redirect('/');
//   }
// });

module.exports = router;