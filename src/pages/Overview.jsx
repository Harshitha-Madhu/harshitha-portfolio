import { profile } from "../data/profile"
import { allProjects, researchProjects } from "../data/projects"

function Overview() {
  const featured = allProjects.slice(0, 6)

  const navigate = (path) => {
    window.history.pushState({}, "", path)
    window.dispatchEvent(new PopStateEvent("popstate"))
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">

      {/* PROFILE */}
      <section className="rounded-md border border-[#30363d] bg-[#161b22]">

        <div className="border-b border-[#30363d] p-6 sm:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm text-[#8b949e]">
                AI/ML Engineer • Developer • Researcher
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {profile.name}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-[#8b949e]">
                {profile.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm hover:border-[#58a6ff]"
                >
                  GitHub Profile
                </a>

                <button
                  onClick={() => navigate("/projects")}
                  className="rounded-md bg-[#238636] px-4 py-2 text-sm font-medium text-white hover:bg-[#2ea043]"
                >
                  Explore Projects
                </button>

                <button
                  onClick={() => navigate("/resume")}
                  className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm hover:border-[#58a6ff]"
                >
                  View Resume
                </button>

              </div>

            </div>

            <div className="min-w-[190px] rounded-md border border-[#30363d] bg-[#0d1117] p-5">

              <p className="text-xs uppercase tracking-wide text-[#8b949e]">
                Focus
              </p>

              <div className="mt-3 space-y-2 text-sm">

                <p>Generative AI</p>
                <p>Machine Learning</p>
                <p>NLP & RAG</p>
                <p>Computer Vision</p>
                <p>AI Security</p>

              </div>

            </div>

          </div>

        </div>


        {/* PROFILE STATS */}
        <div className="grid grid-cols-2 divide-x divide-[#30363d] sm:grid-cols-4">

          <Stat number="14" label="Repositories" />
          <Stat number="7" label="Featured Projects" />
          <Stat number="1" label="Research Project" />
          <Stat number="2027" label="Graduation" />

        </div>

      </section>


      {/* ABOUT */}
      <section className="mt-8">

        <SectionTitle title="About" />

        <div className="rounded-md border border-[#30363d] bg-[#161b22] p-6">

          <p className="text-sm leading-7 text-[#8b949e]">
            I am a B.Tech Artificial Intelligence & Machine Learning
            undergraduate building practical AI systems across Generative AI,
            NLP, RAG, deep learning, computer vision and machine learning.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#8b949e]">
            My work focuses on turning machine learning ideas into usable
            applications, while exploring scalable ML infrastructure,
            intelligent agents and AI security.
          </p>

        </div>

      </section>


      {/* FEATURED PROJECTS */}
      <section className="mt-8">

        <div className="mb-4 flex items-center justify-between">

          <SectionTitle title="Featured repositories" />

          <button
            onClick={() => navigate("/projects")}
            className="text-sm text-[#58a6ff] hover:underline"
          >
            View all →
          </button>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          {featured.map((project) => (
            <article
              key={project.name}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-5 transition hover:border-[#58a6ff]"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#58a6ff] hover:underline"
                  >
                    {project.name}
                  </a>

                  <p className="mt-2 text-sm leading-6 text-[#8b949e]">
                    {project.description}
                  </p>

                </div>

                <span className="rounded-full border border-[#30363d] px-2 py-1 text-xs text-[#8b949e]">
                  Public
                </span>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#0d1117] px-2 py-1 text-xs text-[#8b949e]"
                  >
                    {tag}
                  </span>
                ))}

              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-[#8b949e]">

                <span>
                  {project.language}
                </span>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#58a6ff] hover:underline"
                >
                  Open repository →
                </a>

              </div>

            </article>
          ))}

        </div>

      </section>


      {/* RESEARCH */}
      <section className="mt-8">

        <SectionTitle title="Current research" />

        {researchProjects.map((project) => (
          <article
            key={project.name}
            className="rounded-md border border-[#30363d] bg-[#161b22] p-6"
          >

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

              <div>

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-lg font-semibold">
                    {project.name}
                  </h3>

                  <span className="rounded-full border border-[#238636] px-2 py-1 text-xs text-[#3fb950]">
                    {project.status}
                  </span>

                </div>

                <p className="mt-2 text-sm text-[#8b949e]">
                  {project.type}
                </p>

                <p className="mt-4 max-w-4xl text-sm leading-7 text-[#8b949e]">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#0d1117] px-2 py-1 text-xs text-[#8b949e]"
                    >
                      {tag}
                    </span>
                  ))}

                </div>

              </div>

              <button
                onClick={() => navigate("/research")}
                className="shrink-0 rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm hover:border-[#58a6ff]"
              >
                Research →
              </button>

            </div>

          </article>
        ))}

      </section>


      {/* SKILLS */}
      <section className="mt-8">

        <SectionTitle title="Core technologies" />

        <div className="rounded-md border border-[#30363d] bg-[#161b22] p-6">

          <div className="flex flex-wrap gap-2">

            {[
              "Python",
              "PyTorch",
              "TensorFlow",
              "Scikit-learn",
              "Generative AI",
              "LLMs",
              "RAG",
              "Transformers",
              "LangChain",
              "LangGraph",
              "Computer Vision",
              "NLP",
              "Pinecone",
              "FastAPI",
              "Flask",
              "Docker",
              "Kubernetes",
              "AWS SageMaker",
              "Git",
              "MLOps",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-xs text-[#8b949e]"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

      </section>


      {/* NAVIGATION */}
      <section className="mt-8 mb-10">

        <div className="grid gap-4 sm:grid-cols-3">

          <NavigationCard
            title="Projects"
            description="Explore AI/ML applications and repositories."
            onClick={() => navigate("/projects")}
          />

          <NavigationCard
            title="AI Lab"
            description="Experiments, prototypes and technical work."
            onClick={() => navigate("/ai-lab")}
          />

          <NavigationCard
            title="Research"
            description="Literature, research direction and current work."
            onClick={() => navigate("/research")}
          />

        </div>

      </section>

    </main>
  )
}


function SectionTitle({ title }) {
  return (
    <h2 className="text-xl font-semibold">
      {title}
    </h2>
  )
}


function Stat({ number, label }) {
  return (
    <div className="p-5 text-center">

      <p className="text-xl font-semibold">
        {number}
      </p>

      <p className="mt-1 text-xs text-[#8b949e]">
        {label}
      </p>

    </div>
  )
}


function NavigationCard({ title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-[#30363d] bg-[#161b22] p-5 text-left transition hover:border-[#58a6ff]"
    >

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#8b949e]">
        {description}
      </p>

      <p className="mt-4 text-sm text-[#58a6ff]">
        Explore →
      </p>

    </button>
  )
}


export default Overview
