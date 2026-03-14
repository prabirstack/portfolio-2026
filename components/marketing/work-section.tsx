"use client";
import { Container } from "../shared/container";
import { SubHeading } from "./sub-heading";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: string;
  slug: string;
}

const projects: Project[] = [
  {
    title: "Project One",
    description: "A modern SaaS dashboard built for speed and clarity.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    category: "development",
    slug: "project-one",
  },
  {
    title: "Project Two",
    description: "Brand identity and website for a fitness startup.",
    tech: ["Figma", "Tailwind", "Motion"],
    category: "design",
    slug: "project-two",
  },
  {
    title: "Project Three",
    description: "Go-to-market strategy that hit revenue in 6 weeks.",
    tech: ["Analytics", "SEO", "Copywriting"],
    category: "strategy",
    slug: "project-three",
  },
  {
    title: "Project Four",
    description: "E-commerce platform that increased conversions by 40%.",
    tech: ["React", "Node.js", "PostgreSQL"],
    category: "development",
    slug: "project-four",
  },
  {
    title: "Project Five",
    description: "Mobile app for a real estate platform with 10K+ downloads.",
    tech: ["React Native", "TypeScript", "Firebase"],
    category: "development",
    slug: "project-five",
  },
  {
    title: "Project Six",
    description: "Complete brand redesign that doubled client engagement.",
    tech: ["Figma", "Illustrator", "Motion"],
    category: "design",
    slug: "project-six",
  },
];

const categories = [
  { value: "all", label: "All" },
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "strategy", label: "Strategy" },
];

const WorkSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects =
    activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SubHeading title="Selected Work">
          Products I&apos;ve built that turned ideas into revenue.
        </SubHeading>

        {/* Tab buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveTab(cat.value)}
                className={cn(
                  "px-6 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  activeTab === cat.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ProjectGrid projects={filteredProjects} />
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
};
export default WorkSection;

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link key={project.slug} href={`/work/${project.slug}`} className="group block h-full">
          <div
            className="h-full rounded-2xl border border-border/50 bg-card p-6 transition-all duration-500
   hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/20 overflow-hidden"
          >
            <div
              className="aspect-video rounded-xl bg-linear-to-br from-muted to-muted/50 mb-4
  transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary
  font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
