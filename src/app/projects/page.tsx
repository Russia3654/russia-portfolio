import ProjectCard from '@/components/projectCard';
import { projects } from "@/data/projects";

export default function ProjectsPage() {
    return (
        <section className="bg-gray-900/910 backdrop-blur-xs text-white min-h-screen py-12 md:py-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-semibold text-purple-400 mb-8 text-center">
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            type={project.type}
                            language={project.language}
                            description={project.description}
                            link={project.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
