const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // finds all posts within our database and maps an array with their info 
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['name'] }]
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    // renders said posts on homepage and
    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// withAuth middleware is called to check if logged_in returns true for the current session before performing the get request 
router.get('/dash', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
  
    });
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

router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    // gets all comments for a post with specifed id 
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name'] }]
    });
    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: { post_id: req.params.id},
      include: [{ model: User, attributes: ['name'] }]
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    

    res.render('post', {
      post, comments,
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
