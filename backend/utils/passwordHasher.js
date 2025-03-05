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



// class passwordHasher{
//     async hashedPassword(password){
//         return await bcrypt.hash(password,16);
//     }

//     async comparePassword(password,hashedPassword){
//         return await bcrypt.compare(password, hashedPassword);
//     }
// }

// module.exports= new passwordHasher();
