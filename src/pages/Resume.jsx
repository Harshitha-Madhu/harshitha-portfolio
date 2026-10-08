import { profile } from "../data/profile"

const education = [
  {
    degree: "B.Tech — Artificial Intelligence & Machine Learning",
    institute: "Sasi Institute of Technology and Engineering",
    year: "2023–2027",
    result: "8.5 / 10.0 CGPA",
  },
  {
    degree: "Intermediate",
    institute: "Sasi Junior College",
    year: "2021–2023",
    result: "97.6%",
  },
  {
    degree: "Matriculation",
    institute: "Bhashyam Public School",
    year: "2021",
    result: "100%",
  },
]

const skills = {
  "AI / ML": [
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "LLM Fine-tuning",
    "Transformers",
    "RAG",
    "Computer Vision",
    "NLP",
  ],
  Frameworks: [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Hugging Face",
    "LangChain",
    "OpenAI API",
    "Pinecone",
  ],
  Programming: [
    "Python",
    "Java",
    "SQL",
    "Data Structures & Algorithms",
  ],
  "Deployment / Tools": [
    "Docker",
    "Kubernetes",
    "AWS SageMaker",
    "Flask",
    "FastAPI",
    "REST APIs",
    "Gradio",
    "Git",
    "CI/CD",
    "MLOps",
    "Linux",
  ],
}

const projects = [
  {
    name: "PennyWise-AI",
    category: "Generative AI & RAG",
    github: "https://github.com/Harshitha-Madhu/PennyWiseAI",
    description:
      "Financial intelligence application using Gemini, zero-shot classification, Pinecone semantic search and RAG for natural-language interaction with financial data.",
  },
  {
    name: "HealthHarbourAI",
    category: "Multimodal Medical Diagnostic System",
    github: "https://github.com/Harshitha-Madhu/HealthHarbourAI",
    description:
      "Multimodal AI system using Gemini 1.5 Pro for medical imaging analysis and evidence-based diagnostic suggestions with a Gradio interface.",
  },
  {
    name: "Production-Grade ML Simulation",
    category: "MLOps & System Design",
    github:
      "https://github.com/Harshitha-Madhu/Production-Grade-Simulation",
    description:
      "Production-oriented ML lifecycle simulation using Docker, CI/CD, containerization, observability and scalable ML system design.",
  },
  {
    name: "Revenue-Fraud Detection Engine",
    category: "Predictive Analytics",
    github: "https://github.com/Harshitha-Madhu/Revenue-Fraud",
    description:
      "Fraud detection system using XGBoost, Random Forest and feature engineering for low-latency transaction scoring.",
  },
  {
    name: "AI-Document-Anonymizer",
    category: "NLP & OCR",
    github:
      "https://github.com/Harshitha-Madhu/AI-Document-Anonymizer",
    description:
      "Document processing pipeline combining OCR, text classification and abstractive summarization using Hugging Face Transformers.",
  },
  {
    name: "FingerDiab",
    category: "Computer Vision & Machine Learning",
    github: "https://github.com/Harshitha-Madhu/FingerDiab",
    description:
      "Non-invasive diabetes risk prediction system using OpenCV, Flask, Random Forest, fingerprint data and health parameters.",
  },
  {
    name: "Synthetic Financial Data Generation Engine",
    category: "Generative Modeling",
    github:
      "https://github.com/Harshitha-Madhu/Finance-TimeSeries-GAN-Engine",
    description:
      "MLP-based 1D GAN approach for privacy-preserving synthetic financial data generation.",
  },
]

const certifications = [
  "AWS Generative AI: Specialization in Diffusion Models — Feb 2026",
  "Oracle AI-Vector Certification — Oct 2025",
  "IBM SkillsBuild: Build an AI Agent — Mar 2026",
  "Cisco: Introduction to Modern AI — Feb 2026",
]

function Resume() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">

      {/* HEADER */}
      <section className="rounded-md border border-[#30363d] bg-[#161b22] p-6 sm:p-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <p className="text-sm text-[#8b949e]">
              Professional Profile
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              SIRRA MADHU HARSHITHA
            </h1>

            <p className="mt-2 text-lg text-[#8b949e]">
              AI/ML Engineer • B.Tech Artificial Intelligence & Machine Learning
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-sm">

              <a
                href={`mailto:${profile.email}`}
                className="text-[#58a6ff] hover:underline"
              >
                {profile.email}
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-[#58a6ff] hover:underline"
              >
                LinkedIn
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#58a6ff] hover:underline"
              >
                GitHub
              </a>

            </div>
          </div>

          <div className="flex gap-2">

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm hover:border-[#58a6ff]"
            >
              View PDF
            </a>

            <a
              href="/resume.pdf"
              download="SIRRA_MADHU_HARSHITHA_Resume.pdf"
              className="rounded-md bg-[#238636] px-4 py-2 text-sm font-medium text-white"
            >
              Download
            </a>

          </div>

        </div>

        <p className="mt-6 border-t border-[#30363d] pt-6 text-sm leading-7 text-[#8b949e]">
          AI/ML undergraduate with hands-on experience in Generative AI,
          NLP, LLM fine-tuning and RAG systems. Interested in scalable ML
          systems and AI security.
        </p>

      </section>


      {/* EDUCATION */}
      <Section title="Education">

        <div className="space-y-3">

          {education.map((item) => (
            <div
              key={item.degree}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-5"
            >

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">

                <div>
                  <h3 className="font-semibold">
                    {item.degree}
                  </h3>

                  <p className="mt-1 text-sm text-[#8b949e]">
                    {item.institute}
                  </p>
                </div>

                <div className="text-sm sm:text-right">
                  <p className="text-[#8b949e]">
                    {item.year}
                  </p>

                  <p className="mt-1 font-medium">
                    {item.result}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </Section>


      {/* COURSEWORK */}
      <Section title="Relevant Coursework">

        <div className="flex flex-wrap gap-2">

          {[
            "Machine Learning",
            "Deep Learning",
            "Data Structures & Algorithms",
            "Operating Systems",
            "DBMS",
            "Computer Networks",
          ].map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}

        </div>

      </Section>


      {/* SKILLS */}
      <Section title="Technical Skills">

        <div className="grid gap-4 md:grid-cols-2">

          {Object.entries(skills).map(([group, items]) => (
            <div
              key={group}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-5"
            >

              <h3 className="font-semibold">
                {group}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">

                {items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}

              </div>

            </div>
          ))}

        </div>

      </Section>


      {/* EXPERIENCE */}
      <Section title="Professional Experience">

        <div className="rounded-md border border-[#30363d] bg-[#161b22] p-6">

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">

            <div>
              <h3 className="text-lg font-semibold">
                GenAI & Multi-Agent Orchestration Intern
              </h3>

              <p className="mt-1 text-[#58a6ff]">
                PurpleLane
              </p>
            </div>

            <p className="text-sm text-[#8b949e]">
              May 2026 – Jul 2026
            </p>
          </div>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-[#8b949e]">

            <li>
              • Worked on Generative AI systems and multi-agent orchestration
              frameworks.
            </li>

            <li>
              • Applied deep learning techniques to improve model performance
              and pipeline response time.
            </li>

            <li>
              • Worked with LLM-based agents for task automation.
            </li>

          </ul>

        </div>

      </Section>


      {/* PROJECTS */}
      <Section title="Selected Projects">

        <div className="space-y-4">

          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-6"
            >

              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <h3 className="text-lg font-semibold">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#8b949e]">
                    {project.category}
                  </p>
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#58a6ff] hover:underline"
                >
                  GitHub →
                </a>

              </div>

              <p className="mt-4 text-sm leading-7 text-[#8b949e]">
                {project.description}
              </p>

            </div>
          ))}

        </div>

      </Section>


      {/* CERTIFICATIONS */}
      <Section title="Certifications">

        <div className="space-y-3">

          {certifications.map((item) => (
            <div
              key={item}
              className="rounded-md border border-[#30363d] bg-[#161b22] p-4 text-sm"
            >
              {item}
            </div>
          ))}

        </div>

      </Section>


      {/* HONORS */}
      <Section title="Honors & Leadership">

        <div className="space-y-3">

          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4 text-sm text-[#8b949e]">
            • 2-Star Coder on CodeChef.
          </div>

          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4 text-sm text-[#8b949e]">
            • Ethical Hacking Recognition — Certified Enthusiast by Supraja Technologies.
          </div>

          <div className="rounded-md border border-[#30363d] bg-[#161b22] p-4 text-sm text-[#8b949e]">
            • Open-Source Contributor maintaining AI repositories with documented deployment guides.
          </div>

        </div>

      </Section>


      {/* DOWNLOAD */}
      <section className="mt-10 mb-8 rounded-md border border-[#30363d] bg-[#161b22] p-6 text-center">

        <h2 className="text-lg font-semibold">
          Want the complete resume?
        </h2>

        <p className="mt-2 text-sm text-[#8b949e]">
          View or download the original PDF resume.
        </p>

        <div className="mt-5 flex justify-center gap-3">

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[#30363d] bg-[#21262d] px-4 py-2 text-sm hover:border-[#58a6ff]"
          >
            View PDF
          </a>

          <a
            href="/resume.pdf"
            download="SIRRA_MADHU_HARSHITHA_Resume.pdf"
            className="rounded-md bg-[#238636] px-4 py-2 text-sm font-medium"
          >
            Download Resume
          </a>

        </div>

      </section>

    </main>
  )
}


function Section({ title, children }) {
  return (
    <section className="mt-10">

      <div className="mb-4 flex items-center gap-3">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <div className="h-px flex-1 bg-[#30363d]" />

      </div>

      {children}

    </section>
  )
}


function Tag({ children }) {
  return (
    <span className="rounded-full border border-[#30363d] bg-[#0d1117] px-3 py-1 text-xs text-[#8b949e]">
      {children}
    </span>
  )
}


export default Resume
