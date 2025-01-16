const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signUp = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ firstName, lastName, email, password: hashedPassword });
  return user.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { token, user: userWithoutPassword };
};
