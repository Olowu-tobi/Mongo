const { getDB } = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor() {}

  async registerUser(user) {
    // Get Db Connection
    this.db = await getDB();

    // Initiate Users Table
    this.usersTable = this.db.collection("users");

    // Encrypt the user Password
    user.password = await bcrypt.hash(user.password, 10);

    // Insert the user Data
    const result = await this.usersTable.insertOne(user);

    // Return the result
    return result;
  }

  async loginUser(email, password) {
    // Get Db Connection
    this.db = await getDB();
    this.usersTable = this.db.collection("users");

    // check if email address is found
    const user = await this.usersTable.findOne({ email: email });
    if (!user) {
      throw new Error("Account not found");
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, "mySecret", {
      expiresIn: 3600,
    });
    // Return the token
    return token;
  }
}

module.exports = AuthService;
