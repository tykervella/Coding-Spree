const router = require('express').Router();
const { User, Post,  Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{ model: User, attributes: ['name'] }, {model: Comment, attributes: ['content'], order: [['id', 'ASC']] }],
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['name'] }, {model: Comment, attributes: ['content'], order: [['id', 'ASC']] }],
      });
      // checks that there is a user with the requested id 
      if (!postData) {
        res.status(404).json({ message: 'No Post found with that id!' });
        return;
      }
      // makes a json of user if the id exist 
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const postData = await Post.create(req.body);
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // delete route for post with a specific id and all associated comments
  router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Delete comments associated with the post
      await Comment.destroy({
        where: {
          post_id: postId,
        },
      });
  
      // Delete the post
      const deletedPostCount = await Post.destroy({
        where: {
          id: postId,
        },
      });
  
      // Check if the post was found and deleted
      if (deletedPostCount === 0) {
        res.status(404).json({ message: 'No post found with that id!' });
        return;
      }
  
      res.json({ message: 'Post and associated comments deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // route to update post information 
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // checks that there is a post with the requested id 
    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }
  // gives a response message that post has been updated via update method
    res.status(200).json({ message: 'Post updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

  
  module.exports = router;