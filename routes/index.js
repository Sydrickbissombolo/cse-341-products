const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/products', require('./products'));
router.use('/countries', require('./countries'));


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