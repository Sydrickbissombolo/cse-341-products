const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');

const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/products', isAuthenticated, require('./products'));
router.use('/countries', isAuthenticated, require('./countries'));


router.get('/', (req, res) => {
  res.send('Hello! Welcome to my API');
});

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) {return next(err);}
    res.redirect('/');
  });
  });

module.exports = router;