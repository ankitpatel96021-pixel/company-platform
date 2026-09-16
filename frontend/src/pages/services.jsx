// ==========================================
// SERVICES PAGE
// Complete list of services offered
// ==========================================

function Services() {
  return (
    <main>

      {/* ==========================================
          SERVICES PAGE HERO
          ========================================== */}

      <section className="section">

        <div className="section-heading">

          <span className="section-label">
            Our Services
          </span>

          <h1>
            Digital Services For Your Business
          </h1>

          <p>
            We provide complete digital solutions,
            from website development to custom
            business platforms.
          </p>

        </div>


        {/* ==========================================
            SERVICES GRID
            ========================================== */}

        <div className="services-grid">

          {/* Website Development */}
          <div className="service-card">

            <h3>
              Website Development
            </h3>

            <p>
              Professional, responsive and modern
              websites for businesses and individuals.
            </p>

          </div>


          {/* E-Commerce */}
          <div className="service-card">

            <h3>
              E-Commerce Development
            </h3>

            <p>
              Complete online stores for selling
              products and services online.
            </p>

          </div>


          {/* Web Applications */}
          <div className="service-card">

            <h3>
              Web Applications
            </h3>

            <p>
              Custom web applications built according
              to your business requirements.
            </p>

          </div>


          {/* UI/UX */}
          <div className="service-card">

            <h3>
              UI / UX Design
            </h3>

            <p>
              Clean, modern and user-friendly
              interfaces designed for your customers.
            </p>

          </div>


          {/* Website Maintenance */}
          <div className="service-card">

            <h3>
              Website Maintenance
            </h3>

            <p>
              Updates, improvements, bug fixes and
              ongoing website support.
            </p>

          </div>


          {/* Custom Solutions */}
          <div className="service-card">

            <h3>
              Custom Digital Solutions
            </h3>

            <p>
              Technology solutions created specifically
              for your unique business needs.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          BOOK A DEVELOPER CTA
          ========================================== */}

      <section className="section">

        <div className="glass-card">

          <div className="section-heading">

            <span className="section-label">
              Need a Developer?
            </span>

            <h2>
              Let's Build Your Project
            </h2>

            <p>
              Get in touch with our development team
              and tell us what you want to build.
            </p>

            <a
              href="/contact"
              className="primary-button"
            >
              Book a Developer →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}


// ==========================================
// DEFAULT EXPORT
// Allows App.jsx to import Services
// ==========================================

export default Services;