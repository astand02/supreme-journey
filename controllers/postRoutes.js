const router = require('express').Router();
const { Post } = require('../models');

//Post
router.post('/post', async (req, res) => {
    try {
      const { title, content, author } = req.body;

      if (!content) {
        return res.status(400).json({ message: 'Text is required to create this post!' });
      }

      const post = await Post.create({ title, content, author });

      console.log('New post created:', post.toJSON()); 

const postObject = post.toJSON();

res.status(201).json(postObject);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
// Edit post
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        post_id: req.params.post_id,
      },
    }
  )
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Delete post
router.delete('/post/delete/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    await Post.destroy({ where: { id: postId } });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
