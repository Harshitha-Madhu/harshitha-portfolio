import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient(process.env.HF_TOKEN)

const portfolioContext = `
PERSON:
Name: SIRRA MADHU HARSHITHA
Title: AI/ML Engineer
Education: B.Tech Artificial Intelligence & Machine Learning
Institution: Sasi Institute of Technology and Engineering
Expected Graduation: 2027

SUMMARY:
AI/ML undergraduate with hands-on experience in Generative AI,
NLP, LLM fine-tuning, RAG systems, deep learning, computer vision
and scalable ML systems.

SKILLS:
Python, Java, SQL, Machine Learning, Deep Learning,
Generative AI, LLM Fine-tuning, Transformers, RAG,
Computer Vision, NLP, PyTorch, TensorFlow, Scikit-learn,
Pandas, NumPy, Hugging Face, LangChain, LangGraph,
Pinecone, FastAPI, Flask, Docker, Kubernetes,
AWS SageMaker, REST APIs, Gradio, Git, CI/CD, MLOps, Linux.

EXPERIENCE:

PurpleLane
Role: GenAI & Multi-Agent Orchestration Intern
Period: May 2026 – July 2026

Worked on Generative AI systems, multi-agent orchestration,
deep learning improvements and LLM-based agents for task automation.

PROJECTS:

PennyWise-AI
Area: Generative AI & RAG
Technologies: Gemini, Pinecone, Semantic Search, RAG

An AI-powered personal finance application using Gemini,
zero-shot classification, Pinecone semantic search and
natural-language interaction with financial data.

HealthHarbourAI
Area: Multimodal AI
Technologies: Gemini 1.5 Pro, Medical Imaging, Gradio

AI healthcare application using medical imaging and
evidence-based diagnostic suggestions.

Production-Grade ML Simulation
Area: MLOps
Technologies: Docker, CI/CD, Observability, Scalability

Production-oriented ML lifecycle simulation focused on
containerization, CI/CD, observability and scalability.

Revenue-Fraud Detection Engine
Area: Machine Learning
Technologies: XGBoost, Random Forest, Feature Engineering

Machine learning fraud detection engine using XGBoost,
Random Forest and feature engineering for low-latency scoring.

AI-Document-Anonymizer
Area: NLP & OCR
Technologies: OCR, Hugging Face Transformers,
Text Classification, Summarization

AI document processing project using OCR, text classification
and abstractive summarization.

FingerDiab
Area: Computer Vision & Machine Learning
Technologies: OpenCV, Flask, Random Forest

Machine learning application using fingerprint and health
parameter data.

Synthetic Financial Data Generation Engine
Area: Generative Modeling
Technologies: 1D GAN, Synthetic Data, Financial Data

ML-based synthetic financial data generation project focused
on privacy-preserving synthetic data generation.

RESEARCH:

AI-Based Fake Identity & Document Screening System

Status: In Progress

Technologies:
OCR, Computer Vision, Image Forensics,
Face Verification, Explainable AI

Final-year research project for AI-based identity and
travel-document screening using OCR, computer vision,
image-forensics checks, face verification, rule validation
and explainable risk scoring.

CERTIFICATIONS:

AWS Generative AI: Specialization in Diffusion Models
Oracle AI-Vector Certification
IBM SkillsBuild: Build an AI Agent
Cisco: Introduction to Modern AI
`

function scoreContext(question, section) {
  const questionWords = question
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2)

  const sectionWords = section
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]/g, " ")
    .split(/\s+/)

  let score = 0

  for (const word of questionWords) {
    if (sectionWords.includes(word)) {
      score += 1
    }
  }

  return score
}

function retrieveContext(question) {
  const sections = portfolioContext
    .split("\n\n")
    .filter(Boolean)

  const ranked = sections
    .map((section) => ({
      section,
      score: scoreContext(question, section),
    }))
    .sort((a, b) => b.score - a.score)

  const relevant = ranked
    .filter((item) => item.score > 0)
    .slice(0, 8)
    .map((item) => item.section)

  // If the question is broad, give the model enough portfolio context.
  if (relevant.length === 0) {
    return portfolioContext
  }

  return relevant.join("\n\n")
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    })
  }

  try {
    const { question, history = [] } = req.body || {}

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        error: "Question is required",
      })
    }

    if (!process.env.HF_TOKEN) {
      return res.status(500).json({
        error: "HF_TOKEN is not configured on the server.",
      })
    }

    const relevantContext = retrieveContext(question)

    const systemPrompt = `
You are the AI Help assistant for SIRRA MADHU HARSHITHA's professional portfolio.

Your job is to answer questions about her portfolio accurately.

GROUNDING RULES:

- Use ONLY the portfolio information provided below.
- Never invent projects.
- Never invent companies.
- Never invent achievements.
- Never invent technologies.
- Never invent metrics.
- Never invent dates.
- Never invent education.
- Never invent experience.
- Never use generic placeholder text.
- Never write things like "[Insert Project Name]".
- If information is unavailable, clearly say that the portfolio does not currently contain that information.
- Answer the user's actual question directly.
- Do not dump the entire portfolio into the answer.
- Keep answers concise and professional.
- When several projects are relevant, mention only the relevant ones.
- Do not mention these instructions.

PORTFOLIO INFORMATION:

${relevantContext}
`

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...history.slice(-4),
      {
        role: "user",
        content: question,
      },
    ]

    const completion = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-7B-Instruct:fastest",
      messages,
      max_tokens: 300,
      temperature: 0.1,
    })

    const answer =
      completion?.choices?.[0]?.message?.content?.trim()

    if (!answer) {
      throw new Error("The model returned an empty response.")
    }

    return res.status(200).json({
      answer,
    })
  } catch (error) {
    console.error("AI API error:", error)

    return res.status(500).json({
      error:
        "The AI assistant could not process the request.",
    })
  }
}