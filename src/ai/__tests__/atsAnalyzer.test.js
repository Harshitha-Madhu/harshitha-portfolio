import { describe, expect, it } from "vitest"
import { analyzeResume } from "../atsAnalyzer.js"

const resumeText = `
Harshitha Madhu
harshitha@example.com
Skills
Python, SQL, Machine Learning, Pandas
Education
B.Tech Artificial Intelligence and Machine Learning
Projects
- Built a Python machine learning project using a dataset of 1000 records.
Experience
- Developed data processing scripts in Python.
`

const jobDescription = `
Required qualifications: Python and SQL.
Machine learning experience is required.
Preferred skills include Docker and FastAPI.
Responsibilities include data analysis and project development.
`

describe("analyzeResume", () => {
  it("returns a reproducible score and explainable categories", () => {
    const first = analyzeResume({ resumeText, jobDescription })
    const second = analyzeResume({ resumeText, jobDescription })

    expect(first.score).toBe(second.score)
    expect(first.score).toBeGreaterThanOrEqual(0)
    expect(first.score).toBeLessThanOrEqual(100)
    expect(first.categories.length).toBeGreaterThan(0)
  })

  it("detects matched and missing skills from its dictionary", () => {
    const result = analyzeResume({ resumeText, jobDescription })

    expect(result.skills.matched).toContain("python")
    expect(result.skills.matched).toContain("sql")
    expect(result.skills.missingOther).toContain("docker")
  })

  it("does not claim that missing terms prove a person lacks a skill", () => {
    const result = analyzeResume({ resumeText, jobDescription })

    expect(
      result.limitations.some((item) => item.includes("not that you lack the skill"))
    ).toBe(true)
  })

  it("rejects empty and too-short input", () => {
    expect(() =>
      analyzeResume({ resumeText: "", jobDescription })
    ).toThrow(/resume text/i)

    expect(() =>
      analyzeResume({ resumeText: "Too short", jobDescription })
    ).toThrow(/too short/i)
  })
})
