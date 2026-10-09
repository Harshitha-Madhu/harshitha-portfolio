const SKILL_GROUPS = {
  python: ["python"],
  java: ["java"],
  javascript: ["javascript", "js"],
  sql: ["sql", "structured query language"],
  machineLearning: ["machine learning", "ml"],
  deepLearning: ["deep learning"],
  nlp: ["natural language processing", "nlp"],
  computerVision: ["computer vision"],
  generativeAI: ["generative ai", "genai"],
  llm: ["large language model", "large language models", "llm", "llms"],
  rag: ["retrieval augmented generation", "rag"],
  pytorch: ["pytorch"],
  tensorflow: ["tensorflow"],
  scikitLearn: ["scikit-learn", "scikit learn"],
  pandas: ["pandas"],
  numpy: ["numpy"],
  fastapi: ["fastapi"],
  flask: ["flask"],
  docker: ["docker"],
  kubernetes: ["kubernetes"],
  aws: ["amazon web services", "aws"],
  git: ["git", "github"],
  restApi: ["rest api", "rest apis", "restful api", "restful apis"],
  transformers: ["transformers"],
  langchain: ["langchain"],
  langgraph: ["langgraph"],
  dataAnalysis: ["data analysis", "data analytics"],
  statistics: ["statistics", "statistical analysis"],
  excel: ["excel", "microsoft excel"],
  powerBi: ["power bi"],
  tableau: ["tableau"],
  html: ["html"],
  css: ["css"],
  react: ["react", "react.js", "reactjs"],
  node: ["node.js", "nodejs"],
  cPlusPlus: ["c++"],
  cSharp: ["c#"],
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "your",
  "you", "are", "our", "will", "have", "has", "was", "were",
  "into", "their", "they", "them", "who", "what", "when", "where",
  "how", "can", "all", "any", "not", "but", "per", "job", "role",
  "work", "team", "years", "year", "using", "use", "able", "ability",
  "strong", "good", "excellent", "including", "such", "other",
  "required", "preferred", "responsibilities", "requirements",
  "experience", "skills", "knowledge", "candidate", "candidates",
])

function normalize(text = "") {
  return String(text)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function containsTerm(text, term) {
  const source = ` ${normalize(text)} `
  const target = ` ${normalize(term)} `
  return source.includes(target)
}

function countOccurrences(text, term) {
  const source = ` ${normalize(text)} `
  const target = ` ${normalize(term)} `
  if (!target.trim()) return 0
  return source.split(target).length - 1
}

function getSkillMatches(resumeText, jobText) {
  const matches = []

  for (const [skillId, aliases] of Object.entries(SKILL_GROUPS)) {
    const jobAliases = aliases.filter((alias) => containsTerm(jobText, alias))

    if (jobAliases.length === 0) continue

    const resumeAliases = aliases.filter((alias) =>
      containsTerm(resumeText, alias)
    )

    matches.push({
      skill: jobAliases[0],
      skillId,
      matched: resumeAliases.length > 0,
      jobEvidence: jobAliases,
      resumeEvidence: resumeAliases,
    })
  }

  return matches
}

function extractKeywords(jobText, resumeText) {
  const words = normalize(jobText).match(/[\p{L}][\p{L}\p{N}+#.-]*/gu) || []
  const uniqueWords = [...new Set(words)]
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word))
    .filter((word) => !/^\d+$/.test(word))

  return uniqueWords.map((keyword) => ({
    keyword,
    matched: containsTerm(resumeText, keyword),
    jobOccurrences: countOccurrences(jobText, keyword),
    resumeOccurrences: countOccurrences(resumeText, keyword),
  }))
}

function scoreCoverage(items) {
  if (items.length === 0) {
    return {
      score: null,
      available: false,
      matched: 0,
      total: 0,
    }
  }

  const matched = items.filter((item) => item.matched).length

  return {
    score: Math.round((matched / items.length) * 100),
    available: true,
    matched,
    total: items.length,
  }
}

function findSection(text, patterns) {
  return patterns.some((pattern) => pattern.test(text))
}

function analyzeStructure(resumeText) {
  const sections = {
    contact: {
      label: "Contact information",
      found: /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(resumeText),
      explanation: "Email address detected",
    },
    phone: {
      label: "Phone number",
      found: /(?:\+?\d[\d ()-]{7,}\d)/.test(resumeText),
      explanation: "A possible phone number was detected",
    },
    education: {
      label: "Education",
      found: findSection(resumeText, [
        /\beducation\b/i,
        /\bdegree\b/i,
        /\bbachelor(?:'s)?\b/i,
        /\bB\.?\s?Tech\b/i,
        /\buniversity\b/i,
      ]),
      explanation: "Education-related text detected",
    },
    experience: {
      label: "Experience",
      found: findSection(resumeText, [
        /\bexperience\b/i,
        /\binternship\b/i,
        /\bintern\b/i,
        /\bemployment\b/i,
        /\bprofessional background\b/i,
      ]),
      explanation: "Experience-related text detected",
    },
    projects: {
      label: "Projects",
      found: /\bprojects?\b/i.test(resumeText),
      explanation: "A projects heading or mention was detected",
    },
    skills: {
      label: "Skills",
      found: /\bskills?\b/i.test(resumeText),
      explanation: "A skills heading or mention was detected",
    },
  }

  const values = Object.values(sections)
  const found = values.filter((section) => section.found).length

  return {
    score: Math.round((found / values.length) * 100),
    found,
    total: values.length,
    sections,
    note: "This checks extracted text for common sections. It does not verify visual layout or guarantee ATS parsing.",
  }
}


function getRequiredContext(jobText, skill) {
  const lines = String(jobText)
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  const aliases = SKILL_GROUPS[skill] || [skill]

  const containsSkill = (text) =>
    aliases.some((alias) => containsTerm(text, alias))

  const requiredPattern =
    /\b(required|required qualifications|minimum qualifications|minimum requirements|mandatory|must[- ]have|essential skills|essential qualifications|requirements)\b/i

  const preferredPattern =
    /\b(preferred|nice[- ]to[- ]have|good to have|optional|bonus skills|desirable)\b/i

  const sectionHeadingPattern =
    /^(technical skills|skills|qualifications|requirements|what you need|what we're looking for|what we are looking for|minimum qualifications|required qualifications|preferred qualifications|preferred skills|nice to have)\s*:?\s*$/i

  let sectionMode = "unknown"

  for (const line of lines) {
    const heading = line.replace(/^[-*•\d.)\s]+/, "").trim()

    // Update the active section when a heading is encountered.
    if (sectionHeadingPattern.test(heading)) {
      if (preferredPattern.test(heading)) {
        sectionMode = "preferred"
      } else if (requiredPattern.test(heading)) {
        sectionMode = "required"
      } else {
        sectionMode = "unknown"
      }

      continue
    }

    // A new heading or section can change the context.
    if (
      /\b(preferred qualifications|preferred skills|nice to have|what you'll do|responsibilities|job duties|benefits)\b/i.test(line)
    ) {
      sectionMode = "preferred"
    } else if (
      /\b(required qualifications|minimum requirements|requirements|must-have skills)\b/i.test(line)
    ) {
      sectionMode = "required"
    }

    if (!containsSkill(line)) continue

    // Explicit required language takes priority.
    if (requiredPattern.test(line)) return true

    // Don't treat preferred-only skills as required.
    if (preferredPattern.test(line)) continue

    // Skills listed under a required heading inherit that context.
    if (sectionMode === "required") return true
  }

  // Handle descriptions written as paragraphs rather than bullet lists.
  const sentences = String(jobText)
    .replace(/\r/g, "\n")
    .split(/[\n.!?;]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  return sentences.some(
    (sentence) =>
      containsSkill(sentence) &&
      requiredPattern.test(sentence) &&
      !preferredPattern.test(sentence)
  )
}



function scoreExperienceEvidence(resumeText) {
  const quantifiedBullets = (resumeText.match(
    /(?:^|\n)\s*(?:[-*•]|\d+[.)])\s*[^\n]*(?:\d+%|\d+\+?\s*(?:users|records|samples|datasets|models|ms|seconds|minutes|hours|days|weeks|months|years|projects|features|accuracy|precision|recall))/gi
  ) || []).length

  const bulletLines = (resumeText.match(/(?:^|\n)\s*(?:[-*•]|\d+[.)])\s+\S/g) || []).length

  return {
    quantifiedBullets,
    bulletLines,
    note: "Counts visible bullet-like lines and a limited set of quantified statements. It does not judge the truth or business impact of achievements.",
  }
}

function scoreRequirements(skillMatches, jobText) {
  const required = skillMatches.filter((skill) =>
    skill.jobEvidence.some((term) => getRequiredContext(jobText, term))
  )

  const preferred = skillMatches.filter((skill) => !required.includes(skill))

  return {
    required: {
      ...scoreCoverage(required),
      items: required,
    },
    preferred: {
      ...scoreCoverage(preferred),
      items: preferred,
    },
  }
}

function makeWeightedScore(categories) {
  const available = categories.filter(
    (category) => category.score !== null && category.weight > 0
  )

  if (available.length === 0) return null

  const availableWeight = available.reduce(
    (sum, category) => sum + category.weight,
    0
  )

  const weighted = available.reduce(
    (sum, category) => sum + category.score * category.weight,
    0
  )

  return Math.round(weighted / availableWeight)
}

export function analyzeResume({ resumeText, jobDescription }) {
  if (typeof resumeText !== "string" || !resumeText.trim()) {
    throw new Error("Provide readable resume text before analyzing.")
  }

  if (typeof jobDescription !== "string" || !jobDescription.trim()) {
    throw new Error("Provide a job description before analyzing.")
  }

  if (resumeText.trim().length < 80) {
    throw new Error(
      "The resume text is too short to analyze reliably. Check the extracted text."
    )
  }

  if (jobDescription.trim().length < 80) {
    throw new Error(
      "The job description is too short to analyze reliably. Paste the complete description."
    )
  }

  const skills = getSkillMatches(resumeText, jobDescription)
  const requirements = scoreRequirements(skills, jobDescription)
  const keywords = extractKeywords(jobDescription, resumeText)
  const keywordCoverage = scoreCoverage(keywords)
  const structure = analyzeStructure(resumeText)
  const experienceEvidence = scoreExperienceEvidence(resumeText)

  const categories = [
    {
      id: "requiredSkills",
      label: "Required skill coverage",
      weight: 35,
      score: requirements.required.score,
      explanation: "Share of detected job skills explicitly marked as required that also appear in the resume.",
    },
    {
      id: "preferredSkills",
      label: "Other detected skill coverage",
      weight: 15,
      score: requirements.preferred.score,
      explanation: "Share of other recognized job-description skills found in the resume. This is not a definitive classification of employer preferences.",
    },
    {
      id: "keywordCoverage",
      label: "Keyword coverage",
      weight: 25,
      score: keywordCoverage.score,
      explanation: "Share of distinct, non-stopword job-description terms found in the resume text. This is a rough lexical signal, not semantic understanding.",
    },
    {
      id: "documentStructure",
      label: "Text-detected resume sections",
      weight: 15,
      score: structure.score,
      explanation: "Presence of common contact, education, experience, project and skill indicators in extracted text.",
    },
  ]

  const score = makeWeightedScore(categories)

  const missingRequiredSkills = requirements.required.items
    .filter((skill) => !skill.matched)
    .map((skill) => skill.skill)

  const missingOtherSkills = requirements.preferred.items
    .filter((skill) => !skill.matched)
    .map((skill) => skill.skill)

  const matchedSkills = skills
    .filter((skill) => skill.matched)
    .map((skill) => skill.skill)

  const missingKeywords = keywords
    .filter((keyword) => !keyword.matched)
    .sort((a, b) => b.jobOccurrences - a.jobOccurrences)
    .slice(0, 20)
    .map((keyword) => keyword.keyword)

  const recommendations = []

  if (missingRequiredSkills.length > 0) {
    recommendations.push({
      priority: "high",
      title: "Review required skills",
      detail: `The resume does not explicitly mention these detected required skills: ${missingRequiredSkills.join(", ")}. Add a skill only if you genuinely have it.`,
      evidence: missingRequiredSkills,
    })
  }

  if (structure.sections.contact.found === false) {
    recommendations.push({
      priority: "high",
      title: "Check contact information",
      detail: "No email address was detected in the extracted resume text. Confirm that your contact details are present and readable.",
      evidence: [],
    })
  }

  if (structure.sections.education.found === false) {
    recommendations.push({
      priority: "medium",
      title: "Check education details",
      detail: "No common education indicator was detected. Check whether your education section is present in the extracted text.",
      evidence: [],
    })
  }

  if (missingKeywords.length > 0) {
    recommendations.push({
      priority: "medium",
      title: "Review job-description terminology",
      detail: "Some job-description terms are absent from the resume. Review them individually; many may be generic or irrelevant, so do not add them mechanically.",
      evidence: missingKeywords,
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      priority: "info",
      title: "Review the evidence manually",
      detail: "The basic checks found no major omissions. This does not establish that an employer's ATS will accept or shortlist the resume.",
      evidence: [],
    })
  }

  return {
    version: "1.0.0",
    score,
    scoreLabel: "Rule-based resume-to-job compatibility estimate",
    categories,
    skills: {
      matched: matchedSkills,
      missingRequired: missingRequiredSkills,
      missingOther: missingOtherSkills,
      all: skills,
    },
    keywordCoverage,
    missingKeywords,
    structure,
    experienceEvidence,
    recommendations,
    limitations: [
      "This is not a probability of being shortlisted or hired.",
      "Weights are heuristic and have not been validated against employer ATS outcomes.",
      "Skill detection uses a limited, explicit dictionary and may miss synonyms or context.",
      "Keyword overlap can reward irrelevant matches and miss semantic equivalence.",
      "A missing term means it was not detected in the supplied text, not that you lack the skill.",
      "Document structure checks use text only; PDF layout, tables, columns and visual formatting are not validated.",
    ],
  }
}
