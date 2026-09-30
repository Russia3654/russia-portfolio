export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
        Hi, I’m Pierre
      </h1>
      <p className="text-lg md:text-xl font-medium text-gray-300 max-w-xl mx-auto mb-6">
        Full‑Stack Developer crafting scalable web platforms and immersive games with React, .NET, and Unity.
      </p>
      <a
        href="/projects"
        className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg 
             hover:bg-purple-700 transition-transform hover:scale-105 text-center"
      >
        View My Projects
      </a>
    </section>
  );
}
