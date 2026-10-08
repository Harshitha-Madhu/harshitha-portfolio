import { useEffect, useRef, useState } from "react"
import { allProjects, researchProjects } from "../data/projects"
import AIHelp from "./AIHelp"

function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [aiHelpOpen, setAiHelpOpen] = useState(false)

  const searchInputRef = useRef(null)

  const navigate = (path) => {
    window.history.pushState({}, "", path)
    window.dispatchEvent(new PopStateEvent("popstate"))
    setSearchOpen(false)
    setSearch("")
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Command + K on Mac / Ctrl + K on Windows
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault()
        setSearchOpen(true)

        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 0)
      }

      // "/" opens search when not typing
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault()
        setSearchOpen(true)

        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 0)
      }

      // Escape
      if (event.key === "Escape") {
        setSearchOpen(false)
        setSearch("")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const pages = [
    {
      name: "Overview",
      path: "/",
      keywords: "home overview profile about",
    },
    {
      name: "Projects",
      path: "/projects",
      keywords: "projects repositories portfolio",
    },
    {
      name: "Research",
      path: "/research",
      keywords: "research paper SIH fake identity document",
    },
    {
      name: "AI Lab",
      path: "/ai-lab",
      keywords: "ai lab artificial intelligence experiments",
    },
    {
      name: "Resume",
      path: "/resume",
      keywords: "resume cv experience skills education",
    },
  ]

  const projectResults = allProjects.map((project) => ({
    ...project,
    type: "repository",
  }))

  const researchResults = researchProjects.map((project) => ({
    ...project,
    type: "research",
  }))

  const query = search.trim().toLowerCase()

  const filteredPages = query
    ? pages.filter((page) =>
        `${page.name} ${page.keywords}`
          .toLowerCase()
          .includes(query)
      )
    : []

  const filteredProjects = query
    ? projectResults.filter((project) =>
        [
          project.name,
          project.description,
          project.language,
          ...(project.tags || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : []

  const filteredResearch = query
    ? researchResults.filter((project) =>
        [
          project.name,
          project.description,
          project.type,
          project.status,
          ...(project.tags || []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : []

  const hasResults =
    filteredPages.length > 0 ||
    filteredProjects.length > 0 ||
    filteredResearch.length > 0

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#30363d] bg-[#010409]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4">

          {/* Brand */}
          <button
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-[#161b22]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#30363d] bg-[#161b22] text-sm font-bold text-[#58a6ff]">
              MH
            </span>

            <div className="hidden md:block">
              <div className="text-sm font-semibold text-[#f0f6fc]">
                SIRRA MADHU HARSHITHA
              </div>

              <div className="text-xs text-[#8b949e]">
                AI/ML Engineer
              </div>
            </div>
          </button>

          {/* Search */}
          <div className="relative ml-auto w-full max-w-[420px]">
            <div
              className={`flex h-9 items-center rounded-md border bg-[#0d1117] transition ${
                searchOpen
                  ? "border-[#58a6ff]"
                  : "border-[#30363d]"
              }`}
            >
              <span className="px-3 text-sm text-[#8b949e]">
                🔍
              </span>

              <input
                ref={searchInputRef}
                value={search}
                onFocus={() => setSearchOpen(true)}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setSearchOpen(true)
                }}
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#f0f6fc] outline-none placeholder:text-[#8b949e]"
              />

              {!search && (
                <span className="mr-2 hidden rounded border border-[#30363d] px-1.5 py-0.5 text-[10px] text-[#8b949e] sm:block">
                  ⌘K
                </span>
              )}

              {search && (
                <button
                  onClick={() => {
                    setSearch("")
                    searchInputRef.current?.focus()
                  }}
                  className="mr-2 text-sm text-[#8b949e] hover:text-white"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search dropdown */}
            {searchOpen && query && (
              <>
                <button
                  className="fixed inset-0 top-16 z-[-1] cursor-default"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                />

                <div className="absolute left-0 right-0 top-11 z-50 max-h-[520px] overflow-y-auto rounded-lg border border-[#30363d] bg-[#161b22] shadow-2xl">

                  {!hasResults && (
                    <div className="px-4 py-8 text-center">
                      <div className="text-sm text-[#f0f6fc]">
                        No results found
                      </div>

                      <div className="mt-1 text-xs text-[#8b949e]">
                        Try searching for a project, skill or page.
                      </div>
                    </div>
                  )}

                  {filteredPages.length > 0 && (
                    <div className="border-b border-[#30363d] p-2">
                      <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8b949e]">
                        Pages
                      </div>

                      {filteredPages.map((page) => (
                        <button
                          key={page.path}
                          onClick={() => navigate(page.path)}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left hover:bg-[#21262d]"
                        >
                          <span className="text-[#58a6ff]">
                            →
                          </span>

                          <div>
                            <div className="text-sm text-[#f0f6fc]">
                              {page.name}
                            </div>

                            <div className="text-xs text-[#8b949e]">
                              {page.path}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredProjects.length > 0 && (
                    <div className="border-b border-[#30363d] p-2">
                      <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8b949e]">
                        Repositories
                      </div>

                      {filteredProjects.slice(0, 6).map((project) => (
                        <button
                          key={project.name}
                          onClick={() =>
                            window.open(
                              project.github,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left hover:bg-[#21262d]"
                        >
                          <span className="mt-0.5 text-[#8b949e]">
                            ◇
                          </span>

                          <div className="min-w-0">
                            <div className="truncate text-sm text-[#58a6ff]">
                              {project.name}
                            </div>

                            <div className="mt-0.5 line-clamp-2 text-xs text-[#8b949e]">
                              {project.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredResearch.length > 0 && (
                    <div className="p-2">
                      <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#8b949e]">
                        Research
                      </div>

                      {filteredResearch.map((project) => (
                        <button
                          key={project.name}
                          onClick={() => navigate("/research")}
                          className="flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left hover:bg-[#21262d]"
                        >
                          <span className="mt-0.5 text-[#a371f7]">
                            ◈
                          </span>

                          <div className="min-w-0">
                            <div className="text-sm text-[#f0f6fc]">
                              {project.name}
                            </div>

                            <div className="mt-0.5 text-xs text-[#8b949e]">
                              {project.status || "Research"}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              </>
            )}
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex">

            <button
              onClick={() => navigate("/projects")}
              className="rounded-md px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
            >
              Projects
            </button>

            <button
              onClick={() => navigate("/research")}
              className="rounded-md px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
            >
              Research
            </button>

            {/* AI HELP */}
            <button
              onClick={() => setAiHelpOpen(true)}
              className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-sm font-medium text-[#f0f6fc] hover:border-[#58a6ff] hover:bg-[#21262d]"
            >
              <span>✦</span>
              <span>AI Help</span>
            </button>

            <button
              onClick={() => navigate("/resume")}
              className="rounded-md px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
            >
              Resume
            </button>

            <a
              href="https://github.com/Harshitha-Madhu"
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d] hover:text-white"
            >
              GitHub
            </a>

          </nav>

          {/* Mobile AI Help */}
          <button
            onClick={() => setAiHelpOpen(true)}
            className="rounded-md border border-[#30363d] bg-[#161b22] px-2.5 py-1.5 text-sm text-[#f0f6fc] hover:border-[#58a6ff] lg:hidden"
            aria-label="Open AI Help"
          >
            ✦
          </button>

        </div>
      </header>

      {/* AI Help Modal */}
      {aiHelpOpen && (
        <AIHelp
          onClose={() => setAiHelpOpen(false)}
        />
      )}
    </>
  )
}

export default TopBar