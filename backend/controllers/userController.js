const userService = require('../services/userService');

exports.signUp = async (req, res) => {
    try {
      await userService.signUp(req.body);
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errorMessages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: 'Validation error', errors: errorMessages });
      }
    res.status(400).json({ message: 'Error while creating the user', error: err.message });
    }
  };
  

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await userService.login(email, password);
    res.status(200).json({ token, user });
  } catch (err) {
    const status = err.message === 'User not found' || err.message === 'Incorrect password' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};
