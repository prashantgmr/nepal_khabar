const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name']
  },
  email: {
    type: String,
    unique:true,
    lowercase :true,
    required: [true, 'Please enter email']
  },
    username: {
    type: String,
    unique:true,
    lowercase :true,
    required: [true, 'Please enter username']
  },
    password: {
    type: String,
    minlength: [6, 'Min Password Length is 6 characters'],
    required: [true, 'Please enter the password']
  },
  isAdmin: {
    type:Boolean,
    default: false
  }
});
UserSchema.post('save', function(doc,next){
    next();
});
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

UserSchema.statics.login = async function(username, password){
    const user = await this.findOne({username});
    if(user){
       const auth = await  bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect username')
}

module.exports = mongoose.model('User', UserSchema);