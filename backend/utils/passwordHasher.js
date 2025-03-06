const bcrypt = require("bcryptjs");

const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, storedHashedPassword) => {
  const bool = await bcrypt.compare(password, storedHashedPassword);
  console.log("inside",bool);
  return bool;
};



module.exports = { hashedPassword, comparePassword };



