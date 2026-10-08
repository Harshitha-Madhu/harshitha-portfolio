import { useMemo, useState } from "react"
import ProjectCard from "../components/ProjectCard"
import RepositoryCard from "../components/RepositoryCard"
import {
  allProjects,
  researchProjects,
} from "../data/projects"

function Projects() {
  const [search, setSearch] = useState("")

  const projects = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) {
      return allProjects
    }

    return allProjects.filter((project) =>
      `${project.name} ${project.description} ${project.language} ${
        project.tags?.join(" ") || ""
      }`
        .toLowerCase()
        .includes(query)
    )
  }, [search])

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8">

      <div className="border-b border-[#30363d] pb-6">
        <p className="text-sm text-[#8b949e]">
          {projects.length} public repositories
        </p>

        <h1 className="mt-2 text-2xl font-semibold">
          Repositories
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8b949e]">
          AI/ML projects, applications, experiments and development
          work by Harshitha Madhu.
        </p>
      </div>

      <div className="mt-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find a repository..."
          className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-sm outline-none placeholder:text-[#8b949e] focus:border-[#58a6ff]"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
          />
        ))}

      </div>

      {projects.length === 0 && (
        <div className="mt-6 rounded-md border border-[#30363d] p-8 text-center text-[#8b949e]">
          No repository found.
        </div>
      )}

      <section className="mt-12 border-t border-[#30363d] pt-8">

        <h2 className="text-lg font-semibold">
          Research Project
        </h2>

        <div className="mt-4 space-y-4">

          {researchProjects.map((project) => (
            <article
              key={project.name}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">

                <div>
                  <h3 className="text-lg font-semibold text-[#58a6ff]">
                    {project.name}
                  </h3>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[#8b949e]">
                    {project.description}
                  </p>
                </div>

                <span className="h-fit rounded-full border border-[#30363d] px-3 py-1 text-xs text-[#8b949e]">
                  {project.status}
                </span>

              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#0d1117] px-3 py-1 text-xs text-[#8b949e]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}

        </div>

      </section>

    </main>
  )
}

export default Projects
