interface ProjectCardProps {
    title: string;
    type: string;
    language: string;
    description: string;
    link?: string;
}

export default function ProjectCard({ title, type, language, description, link }: ProjectCardProps) {

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-purple-300 mb-4">{title}</h3>
            <h4 className="text-sm font-bold text-purple-300 mb-4">{type} / {language}</h4>
            <p className="text-gray-300 mb-4">{description}</p>
            {link
                ? (
                    <a
                        href={link}
                        className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                        View Project
                    </a>
                ) : (
                    <span className="text-gray-500 italic">Coming soon</span>
                )}

        </div>
    );
}