// ==========================================
// PROJECTS PAGE
// ==========================================

function Projects() {
  return (
    <main>

      {/* ==========================================
          PROJECTS PAGE HERO
          ========================================== */}

      <section className="section">

        <div className="section-heading">

          <span className="section-label">
            Our Projects
          </span>

          <h1>
            Projects We Have Built
          </h1>

          <p>
            Explore some of the websites and digital
            solutions created by our development team.
          </p>

        </div>


        {/* ==========================================
            PROJECTS GRID
            ========================================== */}

        <div className="projects-grid">

          {/* Project 1 */}
          <div className="project-card">

            <div className="project-preview">
              Project Preview
            </div>

            <h3>
              Business Website
            </h3>

            <p>
              A modern website designed for a
              growing business.
            </p>

          </div>


          {/* Project 2 */}
          <div className="project-card">

            <div className="project-preview">
              Project Preview
            </div>

            <h3>
              E-Commerce Store
            </h3>

            <p>
              An online shopping experience built
              for selling products online.
            </p>

          </div>


          {/* Project 3 */}
          <div className="project-card">

            <div className="project-preview">
              Project Preview
            </div>

            <h3>
              Service Platform
            </h3>

            <p>
              A platform connecting customers with
              professional service providers.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}


// ==========================================
// DEFAULT EXPORT
// Allows App.jsx to import Projects
// ==========================================

export default Projects;