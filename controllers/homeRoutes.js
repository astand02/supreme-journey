const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    // try {
      const postData = await Post.findAll({
        include: [{ model: User }]
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  console.log(posts)
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
  });
  
  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('post', {
        ...post,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/userPage', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('userPage', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/userPage');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;
  