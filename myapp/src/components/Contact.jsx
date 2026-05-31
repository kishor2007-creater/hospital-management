import { useState } from "react";
import axios from "axios";

const API_URL = "https://hospital-backend-100y.onrender.com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/contact`, formData);

      setSuccess(response.data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="contact-page">
      <div className="page-banner">
        <h1>Contact Us</h1>

        <p>Reach our healthcare team anytime for support and assistance.</p>
      </div>

      <div className="contact-wrapper">
        <div className="contact-info-box">
          <h2>Get In Touch</h2>

          <p>📍 Chennai, Tamil Nadu, India</p>

          <p>📞 +91 9876543210</p>

          <p>✉ citycarehospital@gmail.com</p>

          <p>🕒 24/7 Customer Support</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Enter Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>

          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;
