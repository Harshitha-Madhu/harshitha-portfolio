import React from "react";

/* =========================================================
   DATA
========================================================= */

const projects = [
  {
    title: "AI-Based Fake Identity & Document Screening",
    description:
      "AI-powered identity and travel document screening using OCR, computer vision, tamper detection, face verification, rule validation, and explainable risk scoring.",
    tech: ["Python", "Computer Vision", "OCR", "Deep Learning", "AI"],
    status: "In Progress",
    type: "Major Project",
  },
  {
    title: "GAN Fraud Detection",
    description:
      "Machine learning system exploring GAN-based approaches for detecting suspicious financial transactions and fraudulent patterns.",
    tech: ["Python", "GAN", "Machine Learning", "FastAPI"],
    status: "Completed",
    type: "AI/ML Project",
  },
  {
    title: "OptiCrop",
    description:
      "AI-based crop recommendation system designed to help users select suitable crops based on agricultural input parameters.",
    tech: ["Python", "Machine Learning", "Flask"],
    status: "Completed",
    type: "AI/ML Project",
  },
  {
    title: "FinPulse India",
    description:
      "Financial analytics application combining Indian market information, financial data, and intelligent insights.",
    tech: ["Python", "Streamlit", "Finance", "Data Analysis"],
    status: "Completed",
    type: "AI/ML Project",
  },
];

const skills = [
  "Python",
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "LangChain",
  "LangGraph",
  "FastAPI",
  "React",
  "Git",
];

const tabs = [
  {
    name: "Overview",
    icon: "●",
  },
  {
    name: "Repositories",
    icon: "◉",
  },
  {
    name: "Projects",
    icon: "◆",
  },
  {
    name: "AI Lab",
    icon: "◇",
  },
  {
    name: "Research",
    icon: "▣",
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Tab({ name, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm transition ${
        active
          ? "border-[#f78166] font-semibold text-[#f0f6fc]"
          : "border-transparent text-[#8b949e] hover:border-[#8b949e] hover:text-[#f0f6fc]"
      }`}
    >
      <span className="text-sm">{icon}</span>
      {name}
    </button>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="rounded-md border border-[#30363d] bg-[#0d1117] p-5 transition hover:border-[#58a6ff]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[#58a6ff]">◉</span>

            <h3 className="text-base font-semibold text-[#58a6ff] hover:underline">
              {project.title}
            </h3>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-[#8b949e]">
            {project.description}
          </p>
        </div>

        <span className="whitespace-nowrap rounded-full border border-[#30363d] px-2 py-1 text-xs text-[#8b949e]">
          {project.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-[#161b22] px-2.5 py-1 text-xs text-[#8b949e]"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-[#8b949e]">
        <span>◇ {project.type}</span>
        <span>•</span>
        <span>Open Source Portfolio</span>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [activeTab, setActiveTab] = React.useState("Overview");
  const [search, setSearch] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);

  const filteredProjects = projects.filter((project) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech.some((tech) => tech.toLowerCase().includes(query))
    );
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc]">
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#30363d] bg-[#010409]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
          {/* Logo */}

          <button
            onClick={() => scrollToSection("top")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f6fc] text-sm font-bold text-[#0d1117]"
            aria-label="Home"
          >
            H
          </button>

          {/* Desktop navigation */}

          <nav className="hidden items-center gap-5 text-sm md:flex">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-[#f0f6fc] hover:text-[#58a6ff]"
            >
              Projects
            </button>

            <button
              onClick={() => scrollToSection("research")}
              className="text-[#f0f6fc] hover:text-[#58a6ff]"
            >
              Research
            </button>

            <button
              onClick={() => scrollToSection("resume")}
              className="text-[#f0f6fc] hover:text-[#58a6ff]"
            >
              Resume
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-[#f0f6fc] hover:text-[#58a6ff]"
            >
              Contact
            </button>
          </nav>

          {/* Search */}

          <div className="ml-auto hidden w-full max-w-xs md:block">
            <div className="flex items-center rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-1.5">
              <span className="mr-2 text-[#8b949e]">⌕</span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-transparent text-sm text-[#f0f6fc] outline-none placeholder:text-[#6e7681]"
              />
            </div>
          </div>

          {/* Mobile menu button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md border border-[#30363d] px-3 py-1.5 text-sm md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile navigation */}

        {menuOpen && (
          <div className="border-t border-[#30363d] bg-[#0d1117] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm">
              <button
                onClick={() => scrollToSection("projects")}
                className="text-left text-[#f0f6fc]"
              >
                Projects
              </button>

              <button
                onClick={() => scrollToSection("research")}
                className="text-left text-[#f0f6fc]"
              >
                Research
              </button>

              <button
                onClick={() => scrollToSection("resume")}
                className="text-left text-[#f0f6fc]"
              >
                Resume
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-[#f0f6fc]"
              >
                Contact
              </button>

              <div className="mt-2 flex items-center rounded-md border border-[#30363d] bg-[#010409] px-3 py-2">
                <span className="mr-2 text-[#8b949e]">⌕</span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#6e7681]"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main id="top" className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* ===================================================
            PROFILE HEADER
        =================================================== */}

        <section className="border-b border-[#30363d] py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Avatar */}

            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-4xl font-semibold text-[#58a6ff]">
              HM
            </div>

            {/* Profile information */}

            <div className="flex-1">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Harshitha Madhu
              </h1>

              <p className="mt-1 text-lg text-[#8b949e]">
                AI/ML Engineer • B.Tech Artificial Intelligence & Machine
                Learning
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#8b949e]">
                AI/ML student building practical AI systems, intelligent
                applications, research-driven projects, and deployable
                machine learning solutions.
              </p>

              {/* Profile links */}

              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href="https://github.com/Harshitha-Madhu"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[#58a6ff] hover:underline"
                >
                  <span>◉</span>
                  GitHub
                </a>

                <button
                  onClick={() => scrollToSection("projects")}
                  className="flex items-center gap-2 text-[#58a6ff] hover:underline"
                >
                  <span>◈</span>
                  Projects
                </button>

                <button
                  onClick={() => scrollToSection("research")}
                  className="flex items-center gap-2 text-[#58a6ff] hover:underline"
                >
                  <span>◇</span>
                  Research
                </button>

                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-2 text-[#58a6ff] hover:underline"
                >
                  <span>✉</span>
                  Contact
                </button>
              </div>
            </div>

            {/* Resume */}

            <div>
              <button
                onClick={() => scrollToSection("resume")}
                className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm font-medium hover:border-[#8b949e] hover:bg-[#30363d]"
              >
                View Resume
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            TABS
        =================================================== */}

        <div className="overflow-x-auto border-b border-[#30363d]">
          <div className="flex min-w-max">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                name={tab.name}
                icon={tab.icon}
                active={activeTab === tab.name}
                onClick={() => setActiveTab(tab.name)}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            CONTENT GRID
        =================================================== */}

        <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div>
            {/* ===============================================
                OVERVIEW
            =============================================== */}

            {activeTab === "Overview" && (
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Popular projects
                  </h2>

                  <p className="mt-1 text-sm text-[#8b949e]">
                    Selected AI/ML projects and research-oriented systems.
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                    />
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="rounded-md border border-[#30363d] p-8 text-center text-sm text-[#8b949e]">
                    No projects found.
                  </div>
                )}

                {/* Contribution style section */}

                <section className="mt-8 rounded-md border border-[#30363d] bg-[#0d1117] p-5">
                  <div className="mb-4">
                    <h2 className="text-base font-semibold">
                      Contribution activity
                    </h2>

                    <p className="mt-1 text-xs text-[#8b949e]">
                      Building consistently through projects, research,
                      experiments, and development.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="flex min-w-[650px] gap-1">
                      {Array.from({ length: 140 }).map((_, index) => {
                        const level =
                          (index * 7 + index * index) % 5;

                        const opacity = [
                          "bg-[#161b22]",
                          "bg-[#0e4429]",
                          "bg-[#006d32]",
                          "bg-[#26a641]",
                          "bg-[#39d353]",
                        ][level];

                        return (
                          <span
                            key={index}
                            className={`h-3 w-3 rounded-sm ${opacity}`}
                            title="Development activity"
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-2 text-xs text-[#8b949e]">
                    Less
                    <span className="h-3 w-3 rounded-sm bg-[#161b22]" />
                    <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                    <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                    <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                    <span className="h-3 w-3 rounded-sm bg-[#39d353]" />
                    More
                  </div>
                </section>

                {/* Repository */}

                <section className="mt-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      Featured repository
                    </h2>

                    <a
                      href="https://github.com/Harshitha-Madhu/harshitha-portfolio"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[#58a6ff] hover:underline"
                    >
                      View on GitHub
                    </a>
                  </div>

                  <div className="rounded-md border border-[#30363d] p-5 hover:border-[#58a6ff]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#58a6ff]">◉</span>

                          <a
                            href="https://github.com/Harshitha-Madhu/harshitha-portfolio"
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-[#58a6ff] hover:underline"
                          >
                            harshitha-portfolio
                          </a>

                          <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-xs text-[#8b949e]">
                            Public
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-[#8b949e]">
                          Professional AI/ML portfolio built with React,
                          Vite, and Tailwind CSS with a GitHub-inspired
                          developer experience.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-5 text-xs text-[#8b949e]">
                      <span>● React</span>
                      <span>● Vite</span>
                      <span>● Tailwind CSS</span>
                      <span>● JavaScript</span>
                    </div>
                  </div>
                </section>
              </section>
            )}

            {/* ===============================================
                REPOSITORIES
            =============================================== */}

            {activeTab === "Repositories" && (
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Repositories
                  </h2>

                  <p className="mt-1 text-sm text-[#8b949e]">
                    Selected repositories and development work.
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                    />
                  ))}

                  <div className="rounded-md border border-[#30363d] p-5">
                    <div className="flex items-center gap-2">
                      <span className="text-[#58a6ff]">◉</span>

                      <h3 className="font-semibold text-[#58a6ff]">
                        harshitha-portfolio
                      </h3>
                    </div>

                    <p className="mt-2 text-sm text-[#8b949e]">
                      Personal AI/ML portfolio and developer profile.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ===============================================
                PROJECTS
            =============================================== */}

            {activeTab === "Projects" && (
              <section id="projects">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Projects
                  </h2>

                  <p className="mt-1 text-sm text-[#8b949e]">
                    Practical AI/ML systems developed during academic,
                    research, and personal work.
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ===============================================
                AI LAB
            =============================================== */}

            {activeTab === "AI Lab" && (
              <section>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    AI Lab
                  </h2>

                  <p className="mt-1 text-sm text-[#8b949e]">
                    Interactive AI demonstrations and experiments.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border border-[#30363d] p-6">
                    <div className="text-2xl">◈</div>

                    <h3 className="mt-4 font-semibold">
                      Document Screening Demo
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#8b949e]">
                      Planned interactive demonstration for OCR,
                      document analysis, tamper detection, and
                      explainable risk scoring.
                    </p>

                    <span className="mt-4 inline-block rounded-full border border-[#30363d] px-2 py-1 text-xs text-[#8b949e]">
                      Coming Soon
                    </span>
                  </div>

                  <div className="rounded-md border border-[#30363d] p-6">
                    <div className="text-2xl">◇</div>

                    <h3 className="mt-4 font-semibold">
                      ML Experiment Lab
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#8b949e]">
                      A collection of small AI/ML experiments covering
                      machine learning, deep learning, computer vision,
                      and NLP.
                    </p>

                    <span className="mt-4 inline-block rounded-full border border-[#30363d] px-2 py-1 text-xs text-[#8b949e]">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* ===============================================
                RESEARCH
            =============================================== */}

            {activeTab === "Research" && (
              <section id="research">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Research
                  </h2>

                  <p className="mt-1 text-sm text-[#8b949e]">
                    Research-oriented AI/ML work and literature-driven
                    projects.
                  </p>
                </div>

                <article className="rounded-md border border-[#30363d] p-6">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 text-2xl text-[#58a6ff]">
                      ◇
                    </span>

                    <div>
                      <h3 className="text-lg font-semibold">
                        AI-Based Fake Identity & Document Screening
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#8b949e]">
                        Research-focused system investigating how OCR,
                        computer vision, image forensics, face
                        verification, rule-based validation, and
                        explainable risk scoring can be combined for
                        identity and travel document screening.
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {[
                          "OCR",
                          "Computer Vision",
                          "Image Forensics",
                          "Face Verification",
                          "Explainable AI",
                        ].map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-[#161b22] px-3 py-1 text-xs text-[#8b949e]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            )}
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-6">
            {/* About */}

            <section>
              <h2 className="border-b border-[#30363d] pb-3 text-base font-semibold">
                About
              </h2>

              <div className="mt-4 space-y-4 text-sm text-[#8b949e]">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#8b949e]">
                    ◉
                  </span>

                  <span>
                    B.Tech Artificial Intelligence & Machine Learning
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#8b949e]">
                    ◇
                  </span>

                  <span>
                    Interested in AI/ML, deep learning, computer vision,
                    NLP, and intelligent applications.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#8b949e]">
                    ◈
                  </span>

                  <span>
                    Focused on building practical, research-oriented
                    and deployable systems.
                  </span>
                </div>
              </div>
            </section>

            {/* Skills */}

            <section>
              <h2 className="border-b border-[#30363d] pb-3 text-base font-semibold">
                Skills
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#30363d] bg-[#161b22] px-2.5 py-1 text-xs text-[#8b949e]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Contact */}

            <section id="contact">
              <h2 className="border-b border-[#30363d] pb-3 text-base font-semibold">
                Contact
              </h2>

              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="mailto:your-email@example.com"
                  className="flex items-center gap-3 text-[#58a6ff] hover:underline"
                >
                  <span>✉</span>
                  Email
                </a>

                <a
                  href="https://github.com/Harshitha-Madhu"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#58a6ff] hover:underline"
                >
                  <span>◉</span>
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#58a6ff] hover:underline"
                >
                  <span>in</span>
                  LinkedIn
                </a>
              </div>
            </section>
          </aside>
        </div>

        {/* ===================================================
            RESUME
        =================================================== */}

        <section
          id="resume"
          className="border-t border-[#30363d] py-10"
        >
          <div className="rounded-md border border-[#30363d] p-6">
            <h2 className="text-xl font-semibold">Resume</h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8b949e]">
              Resume section will contain education, technical skills,
              projects, internships, certifications, research work,
              achievements, and contact information.
            </p>

            <button
              className="mt-5 rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm font-medium hover:bg-[#30363d]"
              onClick={() =>
                alert("Resume PDF will be connected here.")
              }
            >
              Download Resume
            </button>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#30363d]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-8 text-xs text-[#8b949e] sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Harshitha Madhu. Built with
            React, Vite & Tailwind CSS.
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com/Harshitha-Madhu"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#58a6ff]"
            >
              GitHub
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#58a6ff]"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}