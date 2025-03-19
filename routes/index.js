const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/products', require('./products'));
router.use('/countries', require('./countries'));


router.get('/', (req, res) => {
  res.send('Hello! Welcome to my API');
});


module.exports = router;