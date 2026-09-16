// ==========================================
// CONTACT / BOOKING PAGE
// ==========================================

function Contact() {
  return (
    <main>

      {/* ==========================================
          CONTACT PAGE HERO
          ========================================== */}
      <section className="section">

        <div className="section-heading">

          <span className="section-label">
            Contact Us
          </span>

          <h1>
            Let's Build Something Great
          </h1>

          <p>
            Tell us about your project and our team
            will get back to you.
          </p>

        </div>


        {/* ==========================================
            CONTACT / BOOKING FORM
            ========================================== */}

        <div className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Your Email"
          />

          <input
            type="text"
            placeholder="Project / Website"
          />

          <textarea
            placeholder="Tell us about your project..."
            rows="6"
          ></textarea>

          <button type="button" className="primary-button">
            Send Request →
          </button>

        </div>

      </section>

    </main>
  );
}


// ==========================================
// DEFAULT EXPORT
// ==========================================

export default Contact;