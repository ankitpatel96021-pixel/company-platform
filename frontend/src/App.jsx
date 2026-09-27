// ==================================================
// APP.JSX
// Main single-page website
// All major sections are kept on one beautiful page
// ==================================================
import { useState } from "react";
import Navbar from "./components/Navbar";
function App() {
  // ==========================================
// CONTACT FORM STATE
// Stores form field values
// ==========================================

const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
});

const [formStatus, setFormStatus] = useState("");
const [showDeveloperForm, setShowDeveloperForm] = useState(false);
// ==========================================
// HANDLE INPUT CHANGES
// ==========================================

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));
};

// ==========================================
// HANDLE FORM SUBMIT
// ==========================================

// ==========================================
// HANDLE FORM SUBMIT
// Sends form data to FastAPI backend
// ==========================================

const handleSubmit = async (event) => {
  event.preventDefault();

  // Basic frontend validation
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.service ||
    !formData.message
  ) {
    setFormStatus("Please fill all required fields.");
    return;
  }

  // Show sending state
  setFormStatus("Sending your request...");

  try {
    // Send form data to FastAPI backend
    const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/contact`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    // Convert backend response to JSON
    const result = await response.json();

    // Check backend response
    if (!response.ok) {
      throw new Error(
        result.detail || "Something went wrong."
      );
    }

    // Success message
    setFormStatus(
      "Request received! We will contact you soon."
    );

    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });

  } catch (error) {

    // Show error in browser console
    console.error("Contact form error:", error);

    setFormStatus(
      "Unable to send request. Please try again."
    );
  }
};
// ==========================================
// HANDLE DEVELOPER APPLICATION
// Sends developer form data to FastAPI backend
// ==========================================

const handleDeveloperSubmit = async (event) => {
  event.preventDefault();

  // Collect form values
  const form = event.currentTarget;
  const formData = new FormData(form);

  const developerData = {
    name: formData.get("developerName"),
    email: formData.get("developerEmail"),
    phone: formData.get("developerPhone"),
    primary_skill: formData.get("primarySkill"),
    technologies: formData.get("technologies"),
    experience: formData.get("experience"),
    portfolio_url: formData.get("portfolio"),
    bio: formData.get("developerBio"),
  };

  try {
    // Send developer data to FastAPI backend
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/developer-applications`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(developerData),
      }
    );

    const result = await response.json();

    // Check backend response
    if (!response.ok) {
      throw new Error(
        result.detail || "Unable to submit application."
      );
    }

    // Show success message
    alert("Application submitted successfully!");

    // Clear form
    form.reset();

  } catch (error) {
    console.error(
      "Developer application error:",
      error
    );

    alert(
      "Unable to submit application. Please try again."
    );
  }
};
  return (
    <>
      {/* ==================================================
          NAVBAR
          ================================================== */}
      <Navbar />


      {/* ==================================================
          HERO SECTION
          Main introduction of the company
          ================================================== */}
      <section id="home" className="hero">

        {/* Animated background effects */}
        <div className="hero-orb hero-orb-one"></div>
        <div className="hero-orb hero-orb-two"></div>
        <div className="hero-grid"></div>

        <div className="hero-content">

          <span className="section-label">
            Digital Solutions for Modern Businesses
          </span>

          <h1>
            We Build Websites
            <br />
            <span>That Grow Businesses.</span>
          </h1>

          <p>
            We design and develop modern, fast and
            professional digital experiences that help
            businesses build their online presence.
          </p>

          {/* Hero buttons */}
          <div className="hero-buttons">

            <a
              href="#services"
              className="primary-button"
            >
              Explore Services →
            </a>

            <a
              href="#contact"
              className="secondary-button"
            >
              Book a Developer
            </a>

          </div>

        </div>

      </section>


      {/* ==================================================
          SERVICES SECTION
          ================================================== */}
      <section id="services" className="section services-section">

        <div className="section-heading">

          <span className="section-label">
            What We Do
          </span>

          <h2>
            Everything You Need
            <br />
            To Grow Online
          </h2>

          <p className="section-description">
  From simple business websites to complete
  digital platforms, we provide solutions according to your needs.
</p>

        </div>


        <div className="services-grid">

          {/* Service 1 */}
          <div className="glass-card service-card">

            <div className="service-icon">
              ◈
            </div>

            <h3>
              Website Development
            </h3>

            <p>
              Professional, responsive and modern
              websites designed specifically for your
              business.
            </p>

            <a
  href="#contact"
  onClick={() =>
    setFormData((previous) => ({
      ...previous,
      service: "website",
    }))
  }
>
  Get Started →
</a>
          </div>


          {/* Service 2 */}
          <div className="glass-card service-card">

            <div className="service-icon">
              ◫
            </div>

            <h3>
              E-Commerce
            </h3>

            <p>
              Powerful online stores that make it easy
              for your customers to discover and buy.
            </p>

            <a href="#contact">
              Get Started →
            </a>

          </div>


          {/* Service 3 */}
          <div className="glass-card service-card">

            <div className="service-icon">
              ◎
            </div>

            <h3>
              Web Applications
            </h3>

            <p>
              Custom web applications built around
              your business workflow and requirements.
            </p>

            <a href="#contact">
              Get Started →
            </a>

          </div>


          {/* Service 4 */}
          <div className="glass-card service-card">

            <div className="service-icon">
              ✦
            </div>

            <h3>
              UI / UX Design
            </h3>

            <p>
              Clean and intuitive interfaces designed
              to give your customers a better experience.
            </p>

            <a href="#contact">
              Get Started →
            </a>

          </div>


          {/* Service 5 */}
          <div className="glass-card service-card">

            <div className="service-icon">
              ↻
            </div>

            <h3>
              Website Maintenance
            </h3>

            <p>
              Updates, improvements, bug fixes and
              ongoing support for your website.
            </p>

            <a href="#contact">
              Get Started →
            </a>

          </div>


          {/* Service 6 */}
          <div className="glass-card service-card">

            <div className="service-icon">
              +
            </div>

            <h3>
              Custom Solutions
            </h3>

            <p>
              Unique digital solutions created around
              the exact needs of your business.
            </p>

            <a href="#contact">
              Get Started →
            </a>

          </div>

        </div>

      </section>


      {/* ==================================================
          ABOUT SECTION
          ================================================== */}
      <section id="about" className="section about-section">

        <div className="about-content">

          <div>

            <span className="section-label">
              About Us
            </span>

            <h2>
              Technology That
              <br />
              Moves Your Business Forward.
            </h2>

            <p className="about-description">
  We believe a website should be more than just a digital brochure.
  It should help your business attract customers, build trust and grow.
  Our team combines modern technology, thoughtful design and practical
  business solutions to create digital products that actually deliver value.
</p>

            <a
              href="#contact"
              className="primary-button"
            >
              Work With Us →
            </a>

          </div>


          {/* About stats */}
          <div className="about-stats">

            <div className="glass-card stat-card">
              <strong>50+</strong>
              <span>Projects</span>
            </div>

            <div className="glass-card stat-card">
              <strong>30+</strong>
              <span>Businesses</span>
            </div>

            <div className="glass-card stat-card">
              <strong>10+</strong>
              <span>Technologies</span>
            </div>

            <div className="glass-card stat-card">
              <strong>24/7</strong>
              <span>Support</span>
            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          PROJECTS SECTION
          ================================================== */}
      <section id="projects" className="section">

        <div className="section-heading">

          <span className="section-label">
            Our Work
          </span>

          <h2>
            Projects Built
            <br />
            With Purpose.
          </h2>

          <p>
            A look at the kind of digital experiences
            we can create for businesses.
          </p>

        </div>


        <div className="projects-grid">

          {/* Project 1 */}
          <div className="glass-card project-card">

            <div className="project-preview">
              <span>Business Website</span>
            </div>

            <div className="project-info">

              <h3>
                Business Platform
              </h3>

              <p>
                A clean and professional digital
                presence for a growing business.
              </p>

              <a href="#contact">
                View Project →
              </a>

            </div>

          </div>


          {/* Project 2 */}
          <div className="glass-card project-card">

            <div className="project-preview">
              <span>E-Commerce</span>
            </div>

            <div className="project-info">

              <h3>
                Online Store
              </h3>

              <p>
                A modern shopping experience built
                for online customers.
              </p>

              <a href="#contact">
                View Project →
              </a>

            </div>

          </div>


          {/* Project 3 */}
          <div className="glass-card project-card">

            <div className="project-preview">
              <span>Service Platform</span>
            </div>

            <div className="project-info">

              <h3>
                Service Marketplace
              </h3>

              <p>
                A platform designed to connect customers
                with professional service providers.
              </p>

              <a href="#contact">
                View Project →
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          DEVELOPERS SECTION
          ================================================== */}
      <section id="developers" className="section">

        <div className="section-heading">

          <span className="section-label">
            Our Team
          </span>

          <h2>
            Work With
            <br />
            Skilled Developers.
          </h2>

          <p>
            Choose the right developer for your project
            and get the technical support you need.
          </p>

        </div>
<div className="developers-grid">

  {/* ==================================================
      CO-FOUNDER 1
      ================================================== */}
  <div className="glass-card developer-card">

    <div className="developer-avatar">
      A
    </div>

    <h3>
      Ankit Dangi
    </h3>

    <p>
      Co-Founder
    </p>

    <span>
      Strategy • Product • Technology
    </span>

    <a href="#contact">
      Work With Us →
    </a>

  </div>


  {/* ==================================================
      CO-FOUNDER 2
      ================================================== */}
  <div className="glass-card developer-card">

    <div className="developer-avatar">
      C
    </div>

    <h3>
      Deshraj khurdra
    </h3>

    <p>
      Co-Founder
    </p>

    <span>
      Business • Product • Technology
    </span>

    <a href="#contact">
      Work With Us →
    </a>

  </div>

</div>

        {/* ==================================================
    JOIN OUR DEVELOPER NETWORK
    Frontend UI - backend will be connected later
    ================================================== */}
{/* ==================================================
    DEVELOPER APPLICATION TOGGLE
    ================================================== */}

<button
  type="button"
  className="primary-button"
  onClick={() => setShowDeveloperForm(!showDeveloperForm)}
>
  {showDeveloperForm
    ? "Close Developer Application"
    : "Join as a Developer →"}
</button>
{showDeveloperForm && (
<div className="developer-join-card glass-card">

  <div className="section-heading">

    <span className="section-label">
      Join Our Network
    </span>

    <h2>
      Are You a
      <br />
      Developer?
    </h2>

    <p>
      Join the GrabTechie developer network and
      showcase your skills, experience and projects.
    </p>

  </div>


  {/* Developer Registration Form */}
  <form
  className="contact-form developer-join-form"
  onSubmit={handleDeveloperSubmit}
>

    {/* Full Name */}
    <input
      type="text"
      placeholder="Full Name"
      name="developerName"
    />


    {/* Email */}
    <input
      type="email"
      placeholder="Email Address"
      name="developerEmail"
    />


    {/* Phone */}
    <input
      type="text"
      placeholder="Phone Number"
      name="developerPhone"
    />


    {/* Primary Skill */}
    <select name="primarySkill" defaultValue="">
      <option value="" disabled>
        Select Primary Skill
      </option>

      <option value="frontend">
        Frontend Developer
      </option>

      <option value="backend">
        Backend Developer
      </option>

      <option value="fullstack">
        Full Stack Developer
      </option>

      <option value="uiux">
        UI / UX Designer
      </option>

      <option value="ai-ml">
        AI / ML Developer
      </option>

      <option value="mobile">
        Mobile App Developer
      </option>
    </select>


    {/* Technologies */}
    <input
      type="text"
      placeholder="Technologies (React, Python, Node.js...)"
      name="technologies"
    />


    {/* Experience */}
    <select name="experience" defaultValue="">
      <option value="" disabled>
        Experience Level
      </option>

      <option value="student">
        Student / Beginner
      </option>

      <option value="0-1">
        0–1 Year
      </option>

      <option value="1-3">
        1–3 Years
      </option>

      <option value="3+">
        3+ Years
      </option>
    </select>


    {/* Portfolio */}
    <input
      type="url"
      placeholder="Portfolio / GitHub URL"
      name="portfolio"
    />


    {/* About Developer */}
    <textarea
      name="developerBio"
      rows="5"
      placeholder="Tell us about yourself, your skills and the projects you have worked on..."
    ></textarea>


    {/* Submit */}
    <button
      type="submit"
      className="primary-button"
    >
      Apply as Developer →
    </button>

  </form>

</div>
)}
          


          

        

      </section>


      {/* ==================================================
    ADVERTISEMENT SECTION
    Premium advertising banner
    ================================================== */}

<section
  id="advertisements"
  className="section ads-section"
>

  {/* ==========================================
      ADVERTISEMENT CARD
      ========================================== */}

  <div className="ad-card">

    {/* ==========================================
        ADVERTISEMENT CONTENT
        ========================================== */}

    <div className="ad-content">

      <span className="ad-badge">
        ADVERTISE WITH US
      </span>

      <h2>
        Put Your Business
        <br />
        In Front Of More People.
      </h2>

      <p>
        Promote your company, website, application
        or product through our platform and reach
        a wider audience.
      </p>

      <a
        href="#contact"
        className="primary-button"
      >
        Advertise With Us →
      </a>

    </div>


    {/* ==========================================
        ADVERTISEMENT VISUAL
        ========================================== */}

    <div className="ad-visual">

      {/* Large animated glow */}
      <div className="ad-glow"></div>

      {/* Floating advertisement card */}
      <div className="ad-mini-card">

        <span>
          YOUR BRAND
        </span>

        <strong>
          Get Seen. Get Customers.
        </strong>

      </div>

    </div>

  </div>

</section>


      {/* ==================================================
          CONTACT / BOOKING SECTION
          ================================================== */}
      <section id="contact" className="section contact-section">

        <div className="section-heading">

          <span className="section-label">
            Let's Work Together
          </span>

          <h2>
            Start Your Project
            <br />
            Today.
          </h2>

          <p>
            Tell us about your project and we'll help
            you choose the right solution.
          </p>

        </div>


        {/* ==========================================
    CONTACT / BOOKING FORM
    ========================================== */}

<form
  className="glass-card contact-form"
  onSubmit={handleSubmit}
>

  {/* Name */}
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
  />

  {/* Email */}
  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={formData.email}
    onChange={handleChange}
  />

  {/* Phone */}
  <input
    type="text"
    name="phone"
    placeholder="Phone Number"
    value={formData.phone}
    onChange={handleChange}
  />

  {/* Company */}
  <input
    type="text"
    name="company"
    placeholder="Business / Company Name"
    value={formData.company}
    onChange={handleChange}
  />

  {/* Service */}
  <select
    name="service"
    value={formData.service}
    onChange={handleChange}
  >
    <option value="" disabled>
      Select Service
    </option>

    <option value="website">
      Website Development
    </option>

    <option value="ecommerce">
      E-Commerce
    </option>

    <option value="web-app">
      Web Application
    </option>

    <option value="ui-ux">
      UI / UX Design
    </option>

    <option value="maintenance">
      Website Maintenance
    </option>

    <option value="custom">
      Custom Solution
    </option>
  </select>

  {/* Project Details */}
  <textarea
    name="message"
    rows="6"
    placeholder="Tell us about your project..."
    value={formData.message}
    onChange={handleChange}
  ></textarea>

  {/* Submit */}
  <button
    type="submit"
    className="primary-button"
  >
    Send Project Request →
  </button>

  {/* Status Message */}
  {formStatus && (
    <p className="form-status">
      {formStatus}
    </p>
  )}

</form>
</section>


      {/* ==================================================
          FOOTER
          ================================================== */}
      <footer className="footer">

        <div className="footer-content">

          <div>

            <div className="brand">

              <span className="brand-mark">
                A
              </span>

              <span className="brand-text">
                grabtechie
              </span>

            </div>

            <p>
              Building modern digital experiences
              for ambitious businesses.
            </p>
            {/* ==================================================
    COMPANY CONTACT & FOUNDERS
    ================================================== */}

<p>
  <strong>Co-Founders</strong>
  <br />
  Ankit Dangi
  <br />
  Deshraj khurdra
</p>

<p>
  <a href="mailto:grabtechieofficial@gmail.com">
    grabtechieofficial@gmail.com
  </a>
</p>

          </div>


          {/* Footer navigation */}
          <div className="footer-links">

            <a href="#home">
              Home
            </a>

            <a href="#about">
              About
            </a>

            <a href="#services">
              Services
            </a>

            <a href="#projects">
              Projects
            </a>

            <a href="#developers">
              Developers
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>

        </div>


        <div className="footer-bottom">
          © 2026 grabtechie. All rights reserved.
        </div>

      </footer>

    </>
  );
}

export default App;