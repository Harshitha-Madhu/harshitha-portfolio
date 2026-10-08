export const portfolioKnowledge = {
  profile: {
    name: "SIRRA MADHU HARSHITHA",
    title: "AI/ML Engineer",
    education:
      "B.Tech Artificial Intelligence & Machine Learning at Sasi Institute of Technology and Engineering",
    graduation: "2027",
  },

  summary:
    "AI/ML undergraduate with hands-on experience in Generative AI, NLP, LLM fine-tuning, RAG systems, deep learning, computer vision and scalable ML systems.",

  skills: [
    "Python",
    "Java",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "LLM Fine-tuning",
    "Transformers",
    "RAG",
    "Computer Vision",
    "NLP",
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Hugging Face",
    "LangChain",
    "LangGraph",
    "Pinecone",
    "FastAPI",
    "Flask",
    "Docker",
    "Kubernetes",
    "AWS SageMaker",
    "REST APIs",
    "Gradio",
    "Git",
    "CI/CD",
    "MLOps",
    "Linux",
  ],

  experience: [
    {
      company: "PurpleLane",
      role: "GenAI & Multi-Agent Orchestration Intern",
      period: "May 2026 – Jul 2026",
      description:
        "Worked on Generative AI systems, multi-agent orchestration, deep learning improvements and LLM-based agents for task automation.",
    },
  ],

  projects: [
    {
      name: "PennyWise-AI",
      area: "Generative AI & RAG",
      technologies: [
        "Gemini",
        "Pinecone",
        "Semantic Search",
        "RAG",
      ],
      description:
        "AI-powered personal finance application using Gemini, zero-shot classification, Pinecone semantic search and natural-language interaction with financial data.",
    },

    {
      name: "HealthHarbourAI",
      area: "Multimodal AI",
      technologies: [
        "Gemini 1.5 Pro",
        "Medical Imaging",
        "Gradio",
      ],
      description:
        "AI healthcare application using medical imaging and evidence-based diagnostic suggestions with a Gradio frontend.",
    },

    {
      name: "Production-Grade ML Simulation",
      area: "MLOps",
      technologies: [
        "Docker",
        "CI/CD",
        "Observability",
        "Scalability",
      ],
      description:
        "Production-oriented ML lifecycle simulation focused on containerization, CI/CD, observability and scalability.",
    },

    {
      name: "Revenue-Fraud Detection Engine",
      area: "Machine Learning",
      technologies: [
        "XGBoost",
        "Random Forest",
        "Feature Engineering",
      ],
      description:
        "Machine learning fraud detection engine using XGBoost, Random Forest and feature engineering for low-latency scoring.",
    },

    {
      name: "AI-Document-Anonymizer",
      area: "NLP & OCR",
      technologies: [
        "OCR",
        "Hugging Face Transformers",
        "Text Classification",
        "Summarization",
      ],
      description:
        "AI document processing project using OCR, text classification and abstractive summarization.",
    },

    {
      name: "FingerDiab",
      area: "Computer Vision & Machine Learning",
      technologies: [
        "OpenCV",
        "Flask",
        "Random Forest",
      ],
      description:
        "Machine learning application using fingerprint and health parameter data.",
    },

    {
      name: "Synthetic Financial Data Generation Engine",
      area: "Generative Modeling",
      technologies: [
        "1D GAN",
        "Synthetic Data",
        "Financial Data",
      ],
      description:
        "ML-based synthetic financial data generation project focused on privacy-preserving synthetic data generation.",
    },
  ],

  research: [
    {
      name: "AI-Based Fake Identity & Document Screening System",
      status: "In Progress",
      technologies: [
        "OCR",
        "Computer Vision",
        "Image Forensics",
        "Face Verification",
        "Explainable AI",
      ],
      description:
        "Final-year research project for AI-based identity and travel-document screening using OCR, computer vision, image-forensics checks, face verification, rule validation and explainable risk scoring.",
    },
  ],

  certifications: [
    "AWS Generative AI: Specialization in Diffusion Models",
    "Oracle AI-Vector Certification",
    "IBM SkillsBuild: Build an AI Agent",
    "Cisco: Introduction to Modern AI",
  ],
}

export function createKnowledgeChunks() {
  const chunks = []

  chunks.push({
    id: "profile",
    type: "profile",
    text: `
Name: ${portfolioKnowledge.profile.name}
Title: ${portfolioKnowledge.profile.title}
Education: ${portfolioKnowledge.profile.education}
Graduation: ${portfolioKnowledge.profile.graduation}
Summary: ${portfolioKnowledge.summary}
`,
  })

  chunks.push({
    id: "skills",
    type: "skills",
    text: `
Madhu's technical skills include:
${portfolioKnowledge.skills.join(", ")}
`,
  })

  portfolioKnowledge.experience.forEach((item, index) => {
    chunks.push({
      id: `experience-${index}`,
      type: "experience",
      text: `
Professional Experience:
Company: ${item.company}
Role: ${item.role}
Period: ${item.period}
Description: ${item.description}
`,
    })
  })

  portfolioKnowledge.projects.forEach((project, index) => {
    chunks.push({
      id: `project-${index}`,
      type: "project",
      text: `
Project: ${project.name}
Area: ${project.area}
Technologies: ${project.technologies.join(", ")}
Description: ${project.description}
`,
    })
  })

  portfolioKnowledge.research.forEach((item, index) => {
    chunks.push({
      id: `research-${index}`,
      type: "research",
      text: `
Research Project: ${item.name}
Status: ${item.status}
Technologies: ${item.technologies.join(", ")}
Description: ${item.description}
`,
    })
  })

  chunks.push({
    id: "certifications",
    type: "certifications",
    text: `
Certifications:
${portfolioKnowledge.certifications.join("\n")}
`,
  })

  return chunks
}
