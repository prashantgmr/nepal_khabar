const News = require('../models/newsModel');
const mongoose = require('mongoose');


// @route   GET /api/v1/news
exports.getNews = async (req, res, next) => {
  try {
    const news = await News.find();
    
    return res.status(200).json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @route   POST /api/v1/news

exports.addNews =  async (req, res, next) => {
  console.log(req.file)
  try {
    // const { district, newsTitle, newsContent} = req.body;
    const news = await new News({
      _id: new mongoose.Types.ObjectId(),
      district: req.body.district,
      newsTitle: req.body.newsTitle,
      newsContent : req.body.newsContent,
      imageFile: req.file.path
    });
    await news.save();
    // const news = await News.create(req.body);
    // const imageFile = req.file.path;
    // news.imageFile = imageFile;
    // await news.save();

    return res.status(201).json({
      success: true,
      data: news
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @route   DELETE /api/v1/news/:id
exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if(!news) {
      return res.status(404).json({
        success: false,
        error: 'No News found'
      });
    }

    await news.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}