import { useEffect, useMemo, useState } from "react"
import TopBar from "./components/TopBar"
import Projects from "./pages/Projects"
import Research from "./pages/Research"
import AILab from "./pages/AILab"
import Resume from "./pages/Resume"

function Overview({ navigate }) {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10">

      <section className="border-b border-[#30363d] pb-8">
        <div className="flex flex-col gap-8 md:flex-row">

          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-5xl font-semibold text-[#8b949e]">
            H
          </div>

          <div>
            <h1 className="text-3xl font-semibold md:text-4xl">
              Harshitha Madhu
            </h1>

            <p className="mt-2 text-xl text-[#8b949e]">
              AI/ML Engineer • B.Tech Artificial Intelligence & Machine Learning
            </p>

            <p className="mt-5 max-w-3xl leading-7 text-[#8b949e]">
              AI/ML student building practical AI systems, intelligent
              applications, research-driven projects and deployable
              machine learning solutions.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <a
                href="https://github.com/Harshitha-Madhu"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm hover:border-[#58a6ff]"
              >
                GitHub
              </a>

              <button
                onClick={() => navigate("/projects")}
                className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm hover:border-[#58a6ff]"
              >
                View repositories
              </button>

            </div>
          </div>

        </div>
      </section>

      <section className="py-10">

        <h2 className="text-xl font-semibold">
          Profile Overview
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-[#8b949e]">
          My work focuses on applying artificial intelligence and machine
          learning to practical problems through research, experimentation
          and deployable applications.
        </p>

      </section>

      <section className="grid gap-4 md:grid-cols-3">

        <Stat
          number="14"
          label="Public Repositories"
        />

        <Stat
          number="AI/ML"
          label="Primary Focus"
        />

        <Stat
          number="1"
          label="Research Project"
        />

      </section>

    </main>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-md border border-[#30363d] bg-[#161b22] p-6">
      <p className="text-2xl font-semibold">
        {number}
      </p>

      <p className="mt-2 text-sm text-[#8b949e]">
        {label}
      </p>
    </div>
  )
}

function App() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname
  )

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  function navigate(path) {
    window.history.pushState({}, "", path)
    setCurrentPath(path)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  function renderPage() {
    switch (currentPath) {
      case "/projects":
        return <Projects />

      case "/research":
        return <Research />

      case "/ai-lab":
        return <AILab />

      case "/resume":
        return <Resume />

      case "/":
      default:
        return <Overview navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc]">

      <TopBar
        currentPath={currentPath}
        navigate={navigate}
      />

      {renderPage()}

      <footer className="border-t border-[#30363d] py-8 text-center text-sm text-[#8b949e]">
        Built by Harshitha Madhu · AI/ML Portfolio
      </footer>

    </div>
  )
}

export default App
