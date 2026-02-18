const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
console.log("ENV SECRET:", process.env.JWT_SECRET_KEY); // ✅ Check if the secret is loaded

let users = []; // ✅ single memory storage

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    role: "attendee"
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
};

// LOGIN
console.log("Login Controller hitt"); 
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "1h" }
);

  res.json({
    message: "Login successful",
    token
  });
};

module.exports = { registerUser, loginUser };