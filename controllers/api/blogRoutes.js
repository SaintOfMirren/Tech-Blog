const express = require('express');
const router = express.Router();
const { User, Article } = require('../models');

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({ include: User });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET an article by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByPk(id, { include: User });
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new article
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      const article = await Article.create({ title, content, userId });
      res.json(article);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update an article by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const article = await Article.findByPk(id, { include: User });
    if (article) {
      article.title = title;
      article.content = content;
      await article.save();
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE an article by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByPk(id);
    if (article) {
      await article.destroy();
      res.json({ message: 'Article deleted successfully' });
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;