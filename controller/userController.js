const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

// @route   GET /api/v1/user
const maxTime = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id}, 'nepal news secret' , {
        expiresIn : maxTime
    });
}

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    
    return res.status(200).json({
      success: true,
      count: user.length,
      data: user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}
exports.getCurrentUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      return res.status(404).json({
        success: false,
        error: 'No User found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @route   POST /api/v1/user
exports.addUser=  async (req, res, next) => {
  try {
    const { username, password, email, name } = req.body;
    const user = await User.create(req.body);
    // const token = createToken(user._id);
    // res.cookie('jwt', token ,{httpOnly: true, maxTime :maxTime * 1000})
    return res.status(201).json({
      success: true,
      data:user._id
    }); 
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).reduce((obj,val) => ( {...obj, [val.path]:val.message}),{});
      console.log(messages)
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


// @route   DELETE /api/v1/user/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if(!user) {
      return res.status(404).json({
        success: false,
        error: 'No User found'
      });
    }

    await user.remove();

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

exports.getLogin = async (req, res, next) => {
  try {
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}
exports.postLogin = async (req, res, next) => {
    const {username, password} = req.body
  try {
    const user = await User.login(username,password);
        const token = createToken(user._id);
    res.cookie('jwt', token ,{httpOnly: true, maxTime :maxTime * 1000})
     res.status(200).json({
      success: true,
      data: {id:user._id,token:token}
    });
  } catch (err) {
    if(err.message) {
      console.log(err.message)
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    else {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
  }
}
exports.getLogout = (req, res) => {
    res.cookie('jwt', '', {maxTime:1});
    res.redirect('/');
  
}