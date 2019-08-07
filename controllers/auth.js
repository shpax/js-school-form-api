const jwt = require('jsonwebtoken');
const usersModel = require('../models/users');

const SECRET = 'secret';

// returns token
async function login(req, res) {
  const { username, password } = req.body;
  const userExists = await usersModel.verifyUser({ username, password });

  if (!userExists) return res.send({ status: 'fail' });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1m' });

  res.send({ status: 'success', token });
}

async function verifyAuth(req, res, next) {
  const { authorization } = req.headers;

  try {

    const token = authorization.match(/Bearer\s(.+)$/)[1];

    if (token && jwt.verify(token, SECRET)) {
      next();
    }
  } catch (e) {
    res.status(401).send({ error: 'Unauthorized' });
  }

}

module.exports = {
  verifyAuth,
  login,
}