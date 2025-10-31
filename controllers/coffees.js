const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    res.render("coffees/index.ejs", { coffees: currentUser.coffees })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
});


router.get('/new', async (req, res) => {
  try {
    console.log('add new coffee')
    const currentUser = await User.findById(req.session.user._id);
    console.log('here', currentUser)
    res.render("coffees/new.ejs", {
      user: currentUser
    });

  } catch (error) {
    console.log(error)
  }
})

router.get('/:coffeeId', async (req, res) => {
  try {
    console.log('show coffee route')
    const currentUser = await User.findById(req.session.user._id)
    const foundCoffee = currentUser.coffees.id(req.params.coffeeId)
    res.render("coffees/show.ejs", { coffees: foundCoffee, user: currentUser })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const newCoffee = currentUser.coffees.create(req.body)
    currentUser.coffees.push(newCoffee)

    await currentUser.save();
    // Redirect back to the applications index view
    res.redirect(`/users/${currentUser._id}/coffees`)

  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

router.get('/edit/:coffeeId', async (req, res) => {
  try {
    console.log('get edit route')
    const currentUser = await User.findById(req.session.user._id)
    const foundCoffee = currentUser.coffees.id(req.params.coffeeId)
    console.log('found coffee', foundCoffee)
    res.render('coffees/edit.ejs', { coffee: foundCoffee, user: currentUser })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }

})

router.put('/:coffeeId', async (req, res) => {
  try {
    console.log('put route')
    const currentUser = await User.findById(req.session.user._id)
    const coffeeId = currentUser.coffees.id(req.params.coffeeId)
    console.log('user: ', currentUser)
    console.log('coffee: ', coffeeId)

    coffeeId.name = req.body.name
    coffeeId.sort = req.body.sort
    coffeeId.variety = req.body.variety
    coffeeId.grainProcessing = req.body.grainProcessing
    coffeeId.roastingLevels = req.body.roastingLevels
    coffeeId.grindingMethods = req.body.grindingMethods
    coffeeId.preparationMethods = req.body.preparationMethods
    coffeeId.coffeeAppliances = req.body.coffeeAppliances
    coffeeId.origin = req.body.origin
    coffeeId.coffeeBeverages = req.body.coffeeBeverages

    const updatedUser = await currentUser.save()

    console.log('updated user', updatedUser)

    res.redirect(`/users/${currentUser._id}/coffees`)
  }
  catch {
    console.log(error)
    res.redirect("/")
  }
})

router.delete('/:coffeeId', async (req, res) => {
  try {
    console.log('coffee delete route', req.params)
    const currentUser = await User.findById(req.session.user)
    const coffeeId = currentUser.coffees.id(req.params.coffeeId)
    console.log('user: ', currentUser)
    console.log('coffee: ', coffeeId)

    currentUser.coffees.pull({ _id: req.params.coffeeId })
    await currentUser.save()

    res.redirect(`/users/${currentUser._id}/coffees`)
  } catch {
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