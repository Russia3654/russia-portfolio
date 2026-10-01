"use client";

// import Modal from "@/components/Modal";
import { certificates, hobbies, skills, studies } from "@/data/About";
import { useState } from "react";

export default function About() {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    return (
        <section className="bg-gray-900/910 backdrop-blur-xs text-white min-h-screen py-12 md:py-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-purple-400 mb-6">About Me</h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                    I’m Pierre, a full‑stack developer passionate about scalable apps and immersive games.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button onClick={() => setActiveSection("skills")} className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">View Skills</button>
                    <button onClick={() => setActiveSection("studies")} className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">View Studies</button>
                    <button onClick={() => setActiveSection("certificates")} className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">View Certificates</button>
                    <button onClick={() => setActiveSection("hobbies")} className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">View Hobbies</button>
                </div>

                <div className={`${activeSection !== null ? "bg-gray-800" : ""} rounded-lg p-6 text-left transition-all duration-300`}>
                    {activeSection === "skills" && (
                        <div>
                            <p className="text-lg font-semibold text-purple-400 mb-4">My Skills</p>
                            <ul className="space-y-2">
                                {skills.map((skill) => (
                                    <li key={skill.title}>
                                        <span className="text-purple-400 font-semibold">{skill.title}</span>
                                        <span className="ml-2 text-gray-300">— {skill.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeSection === "studies" && (
                        <div>
                            <p className="text-lg font-semibold text-purple-400 mb-4">My Studies</p>
                            <ul className="space-y-2">
                                {studies.map((study, index) => (
                                    <li key={index}>
                                        <span className="text-purple-400 font-semibold">{study.degree}</span>
                                        <span className="ml-2 text-gray-300">— {study.institution} ({study.startDate} - {study.endDate === "" ? "Present" : study.endDate})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeSection === "certificates" && (
                        <div>
                            <p className="text-lg font-semibold text-purple-400 mb-4">My Certificates</p>
                            <ul className="space-y-2">
                                {certificates.map((certificate, index) => (
                                    <li key={index}>
                                        <span className="text-purple-400 font-semibold">{certificate.title}</span>
                                        <span className="ml-2 text-gray-300">— {certificate.issuer} {certificate.isDone ? `(${certificate.date})` : ""}</span>
                                        <span className={`ml-2 ${certificate.isDone ? "text-green-400" : "text-yellow-400"}`}>{certificate.isDone ? "Completed" : "In Progress"}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeSection === "hobbies" && (
                        <div>
                            <p className="text-lg font-semibold text-purple-400 mb-4">My Hobbies</p>
                            <ul className="space-y-2">
                                {hobbies.map((hobby, index) => (
                                    <li key={index}>
                                        <span className="text-purple-400 font-semibold">{hobby.title}</span>
                                        <span className="ml-2 text-gray-300">— {hobby.description}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section >
    )
}
