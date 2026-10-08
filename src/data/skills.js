export const skillGroups = [
  {
    title: "AI / ML",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Generative AI",
    ],
  },
  {
    title: "AI Engineering",
    skills: [
      "LangChain",
      "LangGraph",
      "FastAPI",
      "Flask",
      "REST APIs",
    ],
  },
  {
    title: "Development",
    skills: [
      "Python",
      "JavaScript",
      "React",
      "Git",
      "GitHub",
    ],
  },
];

export const skills = skillGroups.flatMap((group) => group.skills);
