const jwt = require('jsonwebtoken');
const Author = require('../../models/author');

const auth = async (req, res, next) => {
  try {
    const token = req.query.token || req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error('Token missing');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Author.findById(decoded._id);

    if (!user) throw new Error('User not found');

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized', error: err.message });
  }
};

module.exports = auth;
