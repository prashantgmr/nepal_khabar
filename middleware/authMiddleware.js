const jwt = require('jsonwebtoken');
const User =require('../models/userModel')

const requireAuth = (req,res,next) =>{

       const token = req.cookies.jwt;
       
       if(token ){
            jwt.verify(token, 'nepal news secret', (err, decodedToken)=>{
                if(err){
                    res.redirect('user/login')
                }
                else {
                    console.log(decodedToken);
                    next();
                }
            })
       }
       else {
           res.redirect('/user/login')
       }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
       
       if(token ){
            jwt.verify(token, 'tender project secret', async (err, decodedToken)=>{
                if(err){
                    res.locals.user = null;
                    next();
                }
                else {
                    console.log(decodedToken);
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user;
                    next();
                }
            })
       }
       else {
           res.locals.user = null;
           next();
       }
}

module.exports = {requireAuth , checkUser}