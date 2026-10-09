
import { useState } from "react"
import { analyzeResume } from "../ai/atsAnalyzer.js"

function AILab() {
  const areas = [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Generative AI",
    "AI Agents",
  ]

  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  function handleAnalyze() {
    setError("")
    setResult(null)

    try {
      const analysis = analyzeResume({
        resumeText,
        jobDescription,
      })

      setResult(analysis)
    } catch (err) {
      setError(err.message || "Unable to analyze these inputs.")
    }
  }

  function handleReset() {
    setResumeText("")
    setJobDescription("")
    setResult(null)
    setError("")
  }

  const cardClass =
    "rounded-xl border border-[#30363d] bg-[#161b22] p-5"

  const textareaClass =
    "w-full resize-y rounded-lg border border-[#30363d] bg-[#0d1117] p-3 text-sm leading-6 text-[#e6edf3] outline-none focus:border-[#58a6ff]"

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-10">
      <p className="text-sm text-[#8b949e]">
        Experiments &amp; Intelligent Systems
      </p>

      <h1 className="mt-2 text-3xl font-semibold">
        AI Lab
      </h1>

      <p className="mt-4 max-w-3xl leading-7 text-[#8b949e]">
        A dedicated space for experiments, prototypes and practical
        implementations across artificial intelligence and machine learning.
      </p>

      <section className={`${cardClass} mt-10 sm:p-7`}>
        <p className="text-sm font-medium text-[#58a6ff]">
          FREE · NO API KEY REQUIRED
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          ATS Resume Analyzer
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#8b949e]">
          Compare resume text with a job description. Review detected skills,
          keyword coverage, resume sections and improvement suggestions.
          Analysis runs locally in your browser.
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor="resumeText"
              className="mb-2 block text-sm font-medium"
            >
              Resume text
            </label>

            <textarea
              id="resumeText"
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste your resume text here..."
              rows={13}
              className={textareaClass}
            />

            <p className="mt-1 text-xs text-[#8b949e]">
              {resumeText.length} characters
            </p>
          </div>

          <div>
            <label
              htmlFor="jobDescription"
              className="mb-2 block text-sm font-medium"
            >
              Job description
            </label>

            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(event) =>
                setJobDescription(event.target.value)
              }
              placeholder="Paste the complete job description here..."
              rows={13}
              className={textareaClass}
            />

            <p className="mt-1 text-xs text-[#8b949e]">
              {jobDescription.length} characters
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAnalyze}
            className="rounded-lg bg-[#238636] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2ea043]"
          >
            Analyze resume
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-[#30363d] px-5 py-3 text-sm font-medium text-[#e6edf3] transition hover:bg-[#21262d]"
          >
            Clear inputs
          </button>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#8b949e]">
          This component analyzes pasted text in your browser without sending
          it to an AI service. Avoid entering information you do not want
          displayed on this page.
        </p>
      </section>

      {result && (
        <section
          aria-live="polite"
          className="mt-8 space-y-6"
        >
          <div className={cardClass}>
            <p className="text-sm text-[#8b949e]">
              Resume-to-job compatibility estimate
            </p>

            <div className="mt-3 flex flex-wrap items-end gap-3">
              <span className="text-5xl font-bold">
                {result.score === null ? "N/A" : `${result.score}%`}
              </span>

              <span className="pb-1 text-sm text-[#8b949e]">
                Rule-based estimate, not a hiring probability
              </span>
            </div>

            <div
              className="mt-5 h-2 overflow-hidden rounded-full bg-[#30363d]"
              role="progressbar"
              aria-label="Resume compatibility estimate"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={result.score ?? 0}
            >
              <div
                className="h-full rounded-full bg-[#2ea043] transition-all"
                style={{ width: `${result.score ?? 0}%` }}
              />
            </div>

            <p className="mt-4 text-sm leading-6 text-[#8b949e]">
              This heuristic combines detected skill matches, keyword overlap
              and resume section indicators. It has not been validated against
              actual recruitment outcomes.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Score breakdown
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {result.categories.map((category) => (
                <div
                  key={category.id}
                  className={cardClass}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-medium">
                      {category.label}
                    </h4>

                    <span className="text-sm font-semibold">
                      {category.score === null
                        ? "N/A"
                        : `${category.score}%`}
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#30363d]">
                    <div
                      className="h-full rounded-full bg-[#58a6ff]"
                      style={{
                        width: `${category.score ?? 0}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#8b949e]">
                    {category.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className={cardClass}>
              <h3 className="font-semibold text-green-400">
                Matched skills ({result.skills.matched.length})
              </h3>

              {result.skills.matched.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.skills.matched.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-green-900 bg-green-950/40 px-3 py-1 text-sm text-green-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#8b949e]">
                  No dictionary-recognized skill matches were detected.
                </p>
              )}
            </div>

            <div className={cardClass}>
              <h3 className="font-semibold text-yellow-300">
                Detected required skill gaps (
                {result.skills.missingRequired.length})
              </h3>

              {result.skills.missingRequired.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.skills.missingRequired.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-yellow-900 bg-yellow-950/30 px-3 py-1 text-sm text-yellow-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#8b949e]">
                  No gaps were detected in the recognized required-skill set.
                </p>
              )}

              <p className="mt-3 text-xs leading-5 text-[#8b949e]">
                An absent mention does not prove that you lack a skill.
                Verify each item manually.
              </p>
            </div>

            <div className={cardClass}>
              <h3 className="font-semibold">
                Other detected skill gaps (
                {result.skills.missingOther.length})
              </h3>

              {result.skills.missingOther.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {result.skills.missingOther.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#30363d] px-3 py-1 text-sm text-[#c9d1d9]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#8b949e]">
                  No other recognized skill gaps were detected.
                </p>
              )}
            </div>

            <div className={cardClass}>
              <h3 className="font-semibold">
                Keyword coverage
              </h3>

              <p className="mt-2 text-3xl font-semibold">
                {result.keywordCoverage.score === null
                  ? "N/A"
                  : `${result.keywordCoverage.score}%`}
              </p>

              <p className="mt-2 text-sm text-[#8b949e]">
                {result.keywordCoverage.matched} of{" "}
                {result.keywordCoverage.total} distinct detected terms
                appear in the resume text.
              </p>

              {result.missingKeywords.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium">
                    Terms to review
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.missingKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-md bg-[#21262d] px-2 py-1 text-xs text-[#c9d1d9]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold">
              Resume section checks
            </h3>

            <p className="mt-2 text-sm text-[#8b949e]">
              {result.structure.found} of {result.structure.total} basic
              indicators detected in the supplied text.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(result.structure.sections).map(
                ([key, section]) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-lg bg-[#0d1117] p-3"
                  >
                    <span
                      className={
                        section.found
                          ? "text-green-400"
                          : "text-yellow-300"
                      }
                      aria-hidden="true"
                    >
                      {section.found ? "✓" : "!"}
                    </span>

                    <div>
                      <p className="text-sm font-medium">
                        {section.label}
                      </p>

                      <p className="mt-1 text-xs text-[#8b949e]">
                        {section.explanation}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            <p className="mt-3 text-xs leading-5 text-[#8b949e]">
              {result.structure.note}
            </p>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg font-semibold">
              Improvement suggestions
            </h3>

            <div className="mt-4 space-y-3">
              {result.recommendations.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-lg bg-[#0d1117] p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">
                      {item.title}
                    </span>

                    <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-xs text-[#8b949e]">
                      {item.priority}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#8b949e]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <details className={cardClass}>
            <summary className="cursor-pointer font-semibold">
              Limitations and scoring transparency
            </summary>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-[#8b949e]">
              {result.limitations.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
            </ul>

            <p className="mt-4 text-sm leading-6 text-[#8b949e]">
              A genuinely predictive shortlist model requires representative,
              lawfully obtained labelled recruitment data, validation against
              real outcomes, and ongoing checks for bias and performance.
            </p>
          </details>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold">
          Research areas
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-5"
            >
              <h3 className="font-semibold">{area}</h3>

              <p className="mt-2 text-sm text-[#8b949e]">
                Experiments and practical implementations.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AILab