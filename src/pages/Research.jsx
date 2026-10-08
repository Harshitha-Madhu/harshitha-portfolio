import { research } from "../data/research"

function Research() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 py-10">

      <p className="text-sm text-[#8b949e]">
        Research & Development
      </p>

      <h1 className="mt-2 text-3xl font-semibold">
        Research
      </h1>

      <div className="mt-8 space-y-6">

        {research.map((item) => (
          <article
            key={item.title}
            className="rounded-md border border-[#30363d] bg-[#161b22] p-6"
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>
                <h2 className="text-xl font-semibold text-[#58a6ff]">
                  {item.title}
                </h2>

                <p className="mt-4 leading-7 text-[#8b949e]">
                  {item.description}
                </p>
              </div>

              <span className="w-fit rounded-full border border-[#30363d] px-3 py-1 text-xs text-[#8b949e]">
                {item.status}
              </span>

            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-[#0d1117] px-3 py-1 text-xs text-[#8b949e]"
                >
                  {technology}
                </span>
              ))}
            </div>

          </article>
        ))}

      </div>

    </main>
  )
}

export default Research
