// ==========================================
// DEVELOPERS PAGE
// ==========================================

function Developers() {
  return (
    <main>

      {/* ==========================================
          DEVELOPERS PAGE HERO
          ========================================== */}
      <section className="section">

        <div className="section-heading">

          <span className="section-label">
            Our Developers
          </span>

          <h1>
            Meet Our Development Team
          </h1>

          <p>
            Skilled developers ready to help you
            build, improve and grow your website.
          </p>

        </div>


        {/* ==========================================
            DEVELOPERS GRID
            ========================================== */}

        <div className="developers-grid">

          {/* Developer 1 */}
          <div className="developer-card">

            <div className="developer-avatar">
              A
            </div>

            <h3>
              Alex Sharma
            </h3>

            <p>
              Full Stack Developer
            </p>

            <span>
              React • JavaScript • Python
            </span>

          </div>


          {/* Developer 2 */}
          <div className="developer-card">

            <div className="developer-avatar">
              R
            </div>

            <h3>
              Riya Patel
            </h3>

            <p>
              Frontend Developer
            </p>

            <span>
              React • UI/UX • CSS
            </span>

          </div>


          {/* Developer 3 */}
          <div className="developer-card">

            <div className="developer-avatar">
              M
            </div>

            <h3>
              Mohit Verma
            </h3>

            <p>
              Backend Developer
            </p>

            <span>
              Python • APIs • Databases
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}


// ==========================================
// DEFAULT EXPORT
// ==========================================

export default Developers;