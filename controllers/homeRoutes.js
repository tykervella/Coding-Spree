const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// withAuth middleware is called to check if logged_in returns true for the current session before performing the get request 
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dash', async (req, res) => {
  try {
    const userData = await User.findByPk(logged_in.id);

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // if user is already logged in for this session, redirect them to the homepage 
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // otherwise the login handlebar is rendered 
  res.render('login');
});

module.exports = router;
