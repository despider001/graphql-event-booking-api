const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const createUser = async function (args) {

    const {email, password} = args.userInput;
    let newUser = new User({
      email: email,
      password: bcrypt.hashSync(password, 12)
    });


    try {
      const existingUser = await User.findOne({email: email});
      if(existingUser) {
        throw new Error(`user already exits with the email: '${email}'`);
      }
      const savedUser = await newUser.save();
      return {...savedUser._doc, password: null, _id: savedUser.id};
    } catch (err) {
      throw err;
    }

  }
module.exports = createUser;