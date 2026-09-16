// ==========================================
// HOME PAGE
// Main landing page of the website
// ==========================================

function Home() {
  return (
    <main>

      {/* ==========================================
          HERO SECTION
          ========================================== */}

      <section className="hero">

        <div className="hero-content">

          <span className="section-label">
            Digital Solutions
          </span>

          <h1>
            We Build Websites
            <br />
            <span>That Grow Businesses.</span>
          </h1>

          <p>
            We design and develop modern, fast and
            professional websites that help businesses
            build their online presence and grow.
          </p>

          {/* ==========================================
              HERO BUTTONS
              ========================================== */}

          <div className="hero-buttons">

            <a
              href="/services"
              className="primary-button"
            >
              Explore Services →
            </a>

            <a
              href="/contact"
              className="secondary-button"
            >
              Book a Developer
            </a>

          </div>

        </div>

      </section>


      {/* ==========================================
          HOME SERVICES PREVIEW
          ========================================== */}

      <section className="section">

        <div className="section-heading">

          <span className="section-label">
            What We Do
          </span>

          <h2>
            Everything You Need Online
          </h2>

          <p>
            From website development to complete
            digital solutions, we help businesses
            establish and grow online.
          </p>

        </div>


        <div className="services-grid">

          {/* Service 1 */}
          <div className="service-card">

            <h3>
              Website Development
            </h3>

            <p>
              Modern and responsive websites
              built for your business.
            </p>

          </div>


          {/* Service 2 */}
          <div className="service-card">

            <h3>
              E-Commerce
            </h3>

            <p>
              Online stores designed to help
              businesses sell their products.
            </p>

          </div>


          {/* Service 3 */}
          <div className="service-card">

            <h3>
              Business Solutions
            </h3>

            <p>
              Digital tools and solutions that
              make your business easier to manage.
            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          CALL TO ACTION
          ========================================== */}

      <section className="section">

        <div className="glass-card">

          <div className="section-heading">

            <span className="section-label">
              Start Your Project
            </span>

            <h2>
              Have an Idea?
              <br />
              Let's Build It.
            </h2>

            <p>
              Tell us what you need and our developers
              can help turn your idea into a real website.
            </p>

            <a
              href="/contact"
              className="primary-button"
            >
              Start a Project →
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}


// ==========================================
// DEFAULT EXPORT
// This allows App.jsx to import Home
// ==========================================

export default Home;