export default function About() {
  return (
    <div className="max-w-2xl">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          I&apos;m Jeff Pegg. I live in the digital frontier, where I design the future.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          I&apos;ve loved making things for as long as I can remember, and wrote my first 
          program when I was 6 years old, just two weeks after my parents brought home the first computer I&apos;d ever seen.
        </p>
      </header>
      
      <div className="mt-16 sm:mt-20">
        <div className="space-y-20">
          <section>
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 overflow-visible" aria-hidden="true">
                <circle cx="5" cy="5" r="5" fill="currentColor" className="text-zinc-300 dark:text-zinc-600" />
                <circle cx="5" cy="5" r="2" fill="currentColor" className="text-zinc-600 dark:text-zinc-300" />
              </svg>
              <span className="ml-3">What I Do</span>
            </h2>
            <div className="mt-6 text-base text-zinc-600 dark:text-zinc-400 space-y-4">
              <p>
                I specialize in building modern web applications using TypeScript, React, and Next.js. 
                I&apos;m particularly interested in creating tools and applications that leverage AI to solve real-world problems.
              </p>
              <p>
                My passion extends beyond just coding—I&apos;m fascinated by the intersection of human creativity and artificial intelligence, 
                and how we can build systems that amplify human capabilities rather than replace them.
              </p>
            </div>
          </section>

          <section>
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 overflow-visible" aria-hidden="true">
                <circle cx="5" cy="5" r="5" fill="currentColor" className="text-zinc-300 dark:text-zinc-600" />
                <circle cx="5" cy="5" r="2" fill="currentColor" className="text-zinc-600 dark:text-zinc-300" />
              </svg>
              <span className="ml-3">My Interests</span>
            </h2>
            <div className="mt-6">
              <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400">
                <li>• Full-stack web development with modern frameworks</li>
                <li>• Artificial Intelligence and Machine Learning applications</li>
                <li>• Game development and interactive experiences</li>
                <li>• Developer experience and productivity tools</li>
                <li>• Open source contribution and community building</li>
                <li>• Writing about technology and sharing knowledge</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 overflow-visible" aria-hidden="true">
                <circle cx="5" cy="5" r="5" fill="currentColor" className="text-zinc-300 dark:text-zinc-600" />
                <circle cx="5" cy="5" r="2" fill="currentColor" className="text-zinc-600 dark:text-zinc-300" />
              </svg>
              <span className="ml-3">Technical Skills</span>
            </h2>
            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Languages</h3>
                  <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>TypeScript / JavaScript</li>
                    <li>C#</li>
                    <li>Python</li>
                    <li>PHP</li>
                    <li>HTML / CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Frameworks</h3>
                  <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>React / Next.js</li>
                    <li>Node.js</li>
                    <li>REST APIs</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Tools</h3>
                  <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    <li>PostgreSQL</li>
                    <li>Git / GitHub</li>
                    <li>Docker</li>
                    <li>Vercel / AWS</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}