function RepositoryCard({ repository }) {
  return (
    <article className="rounded-md border border-[#30363d] bg-[#161b22] p-5 transition hover:border-[#58a6ff]">
      <div className="flex items-start justify-between gap-3">
        <a
          href={repository.github}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[#58a6ff] hover:underline"
        >
          {repository.name}
        </a>

        <span className="text-xs text-[#8b949e]">Public</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#8b949e]">
        {repository.description}
      </p>

      <div className="mt-5 flex items-center justify-between text-xs text-[#8b949e]">
        <span>{repository.language}</span>

        <a
          href={repository.github}
          target="_blank"
          rel="noreferrer"
          className="text-[#58a6ff] hover:underline"
        >
          GitHub →
        </a>
      </div>
    </article>
  )
}

export default RepositoryCard
