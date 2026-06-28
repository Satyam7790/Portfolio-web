export interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  gradient: string;
  icon: string;
}

export const projects: Project[] = [
  {
    title: "Shelf",
    tagline: "Book Explorer",
    description:
      "Digital library app for searching and discovering books by genre using Google Books API. Features fast search, responsive UI, and real-time API integration.",
    tech: ["JavaScript", "HTML", "CSS", "Google Books API"],
    github: "https://github.com/Satyam7790",
    gradient: "from-emerald-500 to-cyan-500",
    icon: "📚",
  },
  {
    title: "AI College FAQ Chatbot",
    tagline: "Intelligent Q&A System",
    description:
      "AI-powered chatbot answering student queries using Google Sheets and LLM integration. Features structured knowledge base and natural language query handling.",
    tech: ["JavaScript", "LLM Integration", "Google Sheets API"],
    github: "https://github.com/Satyam7790",
    gradient: "from-purple-500 to-cyan-400",
    icon: "🤖",
  },
  {
    title: "Atlas",
    tagline: "Interactive Map Engine",
    description:
      "Interactive navigation engine built with JavaScript and advanced DOM manipulation. Features event-driven interactions, spatial UI design, and dynamic rendering.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Satyam7790",
    gradient: "from-orange-500 to-rose-500",
    icon: "🗺️",
  },
];

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "Java", level: 80 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 90 },
      { name: "Unity", level: 75 },
      { name: "VS Code", level: 95 },
    ],
  },
  {
    name: "Concepts",
    skills: [
      { name: "DSA", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "Open Source", level: 70 },
      { name: "Game Dev", level: 75 },
      { name: "AI Integration", level: 80 },
    ],
  },
];

export interface Achievement {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export const achievements: Achievement[] = [
  { label: "Problems Solved", value: 133, suffix: "+", icon: "⚡" },
  { label: "Public Repositories", value: 11, suffix: "", icon: "📦" },
  { label: "Pull Shark Achievement", value: 1, suffix: "x", icon: "🦈" },
  { label: "Day Coding Streak", value: 14, suffix: "", icon: "🔥" },
];

export interface Experience {
  year: string;
  title: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    year: "2025",
    title: "Started B.Tech CSE",
    description:
      "Began my journey at Newton School of Technology, diving into computer science fundamentals and software engineering.",
  },
  {
    year: "2025",
    title: "Building AI & Frontend Projects",
    description:
      "Started building AI-integrated applications and frontend projects, exploring the intersection of AI and interactive systems.",
  },
  {
    year: "2026",
    title: "Expanding into Advanced Systems",
    description:
      "Expanding expertise into advanced systems architecture, game development, and agentic AI systems.",
  },
];
