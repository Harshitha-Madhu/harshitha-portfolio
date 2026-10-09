
import { portfolioKnowledge } from "./knowledgeBase";
import { allProjects, researchProjects } from "../data/projects";

const normalize = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const repositoryLink = (name) => {
  const project = allProjects.find(
    (item) => normalize(item.name) === normalize(name)
  );

  return project?.github ? `\nGitHub: ${project.github}` : "";
};

const formatProjects = () =>
  portfolioKnowledge.projects
    .map(
      (project) =>
        `• ${project.name} — ${project.description}${repositoryLink(project.name)}`
    )
    .join("\n\n");

const formatRepositories = () =>
  allProjects
    .map(
      (project) =>
        `• ${project.name} — ${project.description}${project.github ? `\nGitHub: ${project.github}` : ""}`
    )
    .join("\n\n");

const formatSkills = () => {
  const skills = portfolioKnowledge.skills;

  return [
    "Madhu's listed technical skills include:",
    "",
    `Programming: ${skills.filter((skill) => ["Python", "Java", "SQL"].includes(skill)).join(", ")}`,
    "",
    `AI/ML: ${skills.filter((skill) => ["Machine Learning", "Deep Learning", "Generative AI", "LLM Fine-tuning", "Transformers", "RAG", "Computer Vision", "NLP"].includes(skill)).join(", ")}`,
    "",
    `Frameworks and tools: ${skills.filter((skill) => ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Hugging Face", "LangChain", "LangGraph", "Pinecone"].includes(skill)).join(", ")}`,
    "",
    `Deployment and engineering: ${skills.filter((skill) => ["FastAPI", "Flask", "Docker", "Kubernetes", "AWS SageMaker", "REST APIs", "Gradio", "Git", "CI/CD", "MLOps", "Linux"].includes(skill)).join(", ")}`,
  ].join("\n");
};

const formatExperience = () =>
  portfolioKnowledge.experience
    .map(
      (item) =>
        `${item.role} at ${item.company}\nPeriod: ${item.period}\n${item.description}`
    )
    .join("\n\n");

const formatResearch = () =>
  researchProjects
    .map(
      (item) =>
        `${item.name}\nStatus: ${item.status}\n${item.description}\nResearch areas: ${item.tags.join(", ")}`
    )
    .join("\n\n");

const formatCertifications = () =>
  portfolioKnowledge.certifications.map((item) => `• ${item}`).join("\n");

export async function askAssistant(question) {
  const q = normalize(question);

  if (!q) {
    return "Please enter a question about Madhu's portfolio.";
  }

  if (/\b(hi|hello|hey|good morning|good afternoon)\b/.test(q)) {
    return "Hi! I'm Madhu's portfolio assistant. I can help you explore her projects, technical skills, education, internship, certifications, and research.";
  }

  if (/\b(help|what can you do|what can i ask)\b/.test(q)) {
    return "You can ask me about:\n• Projects and GitHub repositories\n• AI/ML and programming skills\n• Internship and experience\n• Education\n• Research project\n• Certifications\n• Contact and portfolio links";
  }

  if (/\b(contact|email|linkedin|github profile|reach|portfolio link)\b/.test(q)) {
    return [
      "Madhu's portfolio links:",
      `GitHub: ${portfolioKnowledge.profile.name === "SIRRA MADHU HARSHITHA" ? "https://github.com/Harshitha-Madhu" : "https://github.com/Harshitha-Madhu"}`,
      "LinkedIn: https://www.linkedin.com/in/madhu-harshitha-6a57403b1/",
      "Email: sharshithamadhu@gmail.com",
    ].join("\n");
  }

  if (/\b(certifications?|certificates?|credentials?)\b/.test(q)) {
    return `Listed certifications:\n${formatCertifications()}`;
  }

  if (/\b(research|final year|final-year|identity document|fake identity|screening system)\b/.test(q)) {
    return `Research information:\n\n${formatResearch()}`;
  }

  if (/\b(internship|intern|experience|worked at|company|job experience)\b/.test(q)) {
    return `Professional experience:\n\n${formatExperience()}`;
  }

  if (/\b(education|college|university|degree|graduation|cgpa|study|studying)\b/.test(q)) {
    return [
      `Name: SIRRA MADHU HARSHITHA`,
      `Degree: ${portfolioKnowledge.profile.education}`,
      `Expected graduation: ${portfolioKnowledge.profile.graduation}`,
    ].join("\n");
  }

  if (/\b(skills?|technology|technologies|tech stack|programming languages|frameworks|tools)\b/.test(q)) {
    return formatSkills();
  }

  if (/\b(all projects|list projects|projects|repositories|repo|built|developed|applications)\b/.test(q)) {
    return `Projects documented in the portfolio:\n\n${formatProjects()}\n\nOther repositories:\n\n${formatRepositories()}`;
  }

  const matchedProject = portfolioKnowledge.projects.find((project) =>
    q.includes(normalize(project.name))
  );

  if (matchedProject) {
    return `${matchedProject.name}\nArea: ${matchedProject.area}\n${matchedProject.description}\nTechnologies: ${matchedProject.technologies.join(", ")}${repositoryLink(matchedProject.name)}`;
  }

  const matchedRepository = allProjects.find((project) =>
    q.includes(normalize(project.name))
  );

  if (matchedRepository) {
    return `${matchedRepository.name}\n${matchedRepository.description}${matchedRepository.github ? `\nGitHub: ${matchedRepository.github}` : ""}`;
  }

  if (/\b(about|who is|introduce|introduction|summary|profile)\b/.test(q)) {
    return [
      "SIRRA MADHU HARSHITHA is an AI/ML undergraduate at Sasi Institute of Technology and Engineering, expected to graduate in 2027.",
      "",
      portfolioKnowledge.summary,
      "",
      `Technical skills: ${portfolioKnowledge.skills.join(", ")}`,
    ].join("\n");
  }

  return "I can answer questions using the information documented in Madhu's portfolio, but I couldn't find a reliable match for that question. Try asking about her projects, skills, education, internship, certifications, or research.";
}