const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  disease: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  next();
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No Token Provided",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};

let tasks = [];
let contactMessages = [];

app.get("/", (req, res) => {
  res.send("Hospital Backend Running Successfully");
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/tasks", verifyToken, (req, res) => {
  res.json(tasks);
});

app.post("/tasks", verifyToken, (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Task field required",
      });
    }

    const newTask = {
      id: Date.now(),
      text,
    };

    tasks.push(newTask);

    res.status(201).json({
      message: "Task Added Successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/tasks/:id", verifyToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);

    tasks = tasks.filter((task) => task.id !== id);

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
    };

    contactMessages.push(newMessage);

    res.status(201).json({
      message: "Message Sent Successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/patients", verifyToken, async (req, res) => {
  try {
    const patients = await Patient.find();

    res.json(patients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/patients", verifyToken, async (req, res) => {
  try {
    const { name, age, disease } = req.body;

    if (!name || !age || !disease) {
      return res.status(400).json({
        message: "All patient fields are required",
      });
    }

    const newPatient = new Patient({
      name,
      age,
      disease,
    });

    await newPatient.save();

    res.status(201).json({
      message: "Patient Added Successfully",
      patient: newPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/patients/:id", verifyToken, async (req, res) => {
  try {
    const { name, age, disease } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        disease,
      },
      { new: true },
    );

    if (!updatedPatient) {
      return res.status(404).json({
        message: "Patient Not Found",
      });
    }

    res.json({
      message: "Patient Updated Successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/patients/:id", verifyToken, async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

    if (!deletedPatient) {
      return res.status(404).json({
        message: "Patient Not Found",
      });
    }

    res.json({
      message: "Patient Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
