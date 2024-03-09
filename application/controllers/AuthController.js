const AuthService = require("../services/AuthService");
const authService = new AuthService();

class AuthController {
  constructor() {}

  // logic for login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const loginResp = await authService.loginUser(email, password);
      res.status(200).json({
        message: "User logged in successfully",
        status: true,
        token: loginResp,
      });
    } catch (error) {
      res.status(401).json({
        message: error.message,
        status: false,
      });
    }
  }

  // logic for registration
  async register(req, res) {
    try {
      const { body } = req;

      const registerResp = await authService.registerUser(body);
      res.status(201).json({
        message: "User registered successfully",
        status: true,
        userId: registerResp.insertedId,
      });
    } catch (error) {
      res.status(error.status).json({
        message: "Error registering user",
        status: false,
      });
    }
  }
}

module.exports = AuthController;
