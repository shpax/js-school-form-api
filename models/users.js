const db = require('../db/db');

async function createUser({ username, password }) {

  if (await getUser(username)) throw new Error('user already exists');

  const data = await db.load();

  data.users.push({ username, password });

  await db.save(data);

  return {
    username, password,
  };
}

async function getUser(username) {
  const data = await db.load();

  return data.users.find(u => u.username === username);
}

async function verifyUser({ username, password }) {
  const user = await getUser(username);

  return user && user.password === password;
}

module.exports = {
  createUser,
  verifyUser,
  getUser,
}