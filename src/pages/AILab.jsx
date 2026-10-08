function AILab() {
  const areas = [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Generative AI",
    "AI Agents",
  ]

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-10">

      <p className="text-sm text-[#8b949e]">
        Experiments & Intelligent Systems
      </p>

      <h1 className="mt-2 text-3xl font-semibold">
        AI Lab
      </h1>

      <p className="mt-4 max-w-3xl leading-7 text-[#8b949e]">
        A dedicated space for experiments, prototypes and practical
        implementations across artificial intelligence and machine learning.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {areas.map((area) => (
          <div
            key={area}
            className="rounded-md border border-[#30363d] bg-[#161b22] p-5"
          >
            <h2 className="font-semibold">
              {area}
            </h2>

            <p className="mt-2 text-sm text-[#8b949e]">
              Experiments and practical implementations.
            </p>
          </div>
        ))}

      </div>

    </main>
  )
}

export default AILab
