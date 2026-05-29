import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./App.css";

import Doctors from "./components/Doctors";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Patients from "./components/Patients";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchTasks();

    const user = localStorage.getItem("hospitalUser");

    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    if (task.trim() === "") {
      setError("Please enter a task");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/tasks", {
        text: task,
      });

      setTasks([...tasks, response.data.task]);

      setTask("");
      setError("");
    } catch (error) {
      console.log(error);
      alert("Error Adding Task");
    }
  };

  const deleteTask = async (id) => {
    if (!isLoggedIn) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);

      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const handleSearch = () => {
    const value = search.toLowerCase();

    if (value.includes("doctor")) {
      navigate("/doctors");
    } else if (value.includes("service")) {
      navigate("/services");
    } else if (value.includes("patient")) {
      navigate("/patients");
    } else if (value.includes("contact")) {
      navigate("/contact");
    } else {
      alert("No Matching Result Found");
    }
  };

  const logout = () => {
    localStorage.removeItem("hospitalUser");

    setIsLoggedIn(false);

    alert("Logout Successful");

    navigate("/");
  };

  return (
    <div className="app-container">
      <header className="top-header">
        <div className="logo">
          <h1>CityCare Hospital</h1>
        </div>

        <div className="header-right">
          <input
            type="text"
            placeholder="Search Doctors, Services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>
      </header>

      <nav className="navbar">
        <Link to="/">Home</Link>

        <Link to="/doctors">Doctors</Link>

        <Link to="/services">Services</Link>

        <Link to="/patients">Patients</Link>

        <Link to="/contact">Contact</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero">
                <div className="hero-content">
                  <h2>Advanced Hospital Management System</h2>

                  <p>
                    Manage hospital operations, appointments, and healthcare
                    tasks efficiently with a modern digital platform.
                  </p>

                  <button>Book Appointment</button>
                </div>
              </section>

              <section className="features">
                <div className="feature-card">
                  <h3>24/7 Emergency</h3>

                  <p>Fast emergency support with expert doctors.</p>
                </div>

                <div className="feature-card">
                  <h3>Expert Doctors</h3>

                  <p>Highly qualified specialists for every department.</p>
                </div>

                <div className="feature-card">
                  <h3>Modern Equipment</h3>

                  <p>Advanced healthcare technology and laboratories.</p>
                </div>
              </section>

              <section className="task-section">
                <div className="task-header">
                  <h2>Task Management</h2>
                </div>

                <form className="task-form" onSubmit={addTask}>
                  <input
                    type="text"
                    placeholder="Enter Hospital Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />

                  <button type="submit">Add Task</button>
                </form>

                {error && <p className="error">{error}</p>}

                <div className="task-list">
                  {tasks.length === 0 ? (
                    <p className="empty">No Tasks Available</p>
                  ) : (
                    tasks.map((t) => (
                      <div className="task-card" key={t.id}>
                        <div>
                          <h4>{t.text}</h4>
                        </div>

                        <button onClick={() => deleteTask(t.id)}>Delete</button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </>
          }
        />

        <Route path="/doctors" element={<Doctors />} />

        <Route path="/services" element={<Services />} />

        <Route path="/patients" element={<Patients />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/register" element={<Register />} />
      </Routes>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-box">
            <h3>CityCare Hospital</h3>

            <p>
              Trusted healthcare services with world-class facilities and
              specialists.
            </p>
          </div>

          <div className="footer-box">
            <h3>Quick Links</h3>

            <p>Home</p>
            <p>Doctors</p>
            <p>Services</p>
            <p>Patients</p>
            <p>Contact</p>
          </div>

          <div className="footer-box">
            <h3>Contact Info</h3>

            <p>📍 Chennai, India</p>

            <p>📞 +91 9876543210</p>

            <p>✉ citycare@gmail.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CityCare Hospital | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
