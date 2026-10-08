function ProjectCard({ project }) {
  return (
    <article className="rounded-md border border-[#30363d] bg-[#0d1117] p-5 transition hover:border-[#58a6ff]">
      <div className="flex items-start justify-between gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="text-base font-semibold text-[#58a6ff] hover:underline"
        >
          {project.name}
        </a>

        <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-xs text-[#8b949e]">
          Public
        </span>
      </div>

      <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#8b949e]">
        {project.description}
      </p>

      {project.tags && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#161b22] px-2.5 py-1 text-xs text-[#8b949e]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs text-[#8b949e]">
          <span className="h-3 w-3 rounded-full bg-[#f1e05a]" />
          {project.language}
        </span>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-[#58a6ff] hover:underline"
        >
          View repository →
        </a>
      </div>
    </article>
  )
}

export default ProjectCard
