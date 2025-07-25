import Link from "next/link";
import { getPublishedArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function Home() {
  const recentArticles = getPublishedArticles().slice(0, 2);
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="mt-24 mb-20 relative">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Software engineer, <span className="text-blue">AI enthusiast</span>, and creator of <span className="text-yellow">digital experiences</span>.
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          I&apos;m <span className="text-blue-dark font-medium">Jeff Pegg</span>, a software engineer based in the digital frontier. I&apos;m passionate about 
          building great software and exploring the transformative potential of artificial intelligence. 
          I share insights on development, <span className="text-yellow-dark font-medium">AI trends</span>, and creating tools that make a meaningful impact.
        </p>
        <div className="mt-6 flex gap-6">
          <Link
            href="https://github.com/jpeggdev"
            className="group -m-1 p-1"
            aria-label="Follow on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-6 w-6 fill-zinc-500 transition group-hover:fill-blue dark:fill-zinc-400 dark:group-hover:fill-blue-light" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z" />
            </svg>
          </Link>
          <Link
            href="https://x.com/theRealJeffPegg"
            className="group -m-1 p-1"
            aria-label="Follow on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z" />
            </svg>
          </Link>
          <Link
            href="mailto:jeff.pegg@gmail.com"
            className="group -m-1 p-1"
            aria-label="Send email"
          >
            <svg className="h-6 w-6 fill-zinc-500 transition group-hover:fill-yellow dark:fill-zinc-400 dark:group-hover:fill-yellow-light" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Recent Articles Section */}
      {recentArticles.length > 0 && (
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Recent Articles</h2>
            <Link 
              href="/articles" 
              className="text-sm font-medium text-yellow hover:text-yellow-dark dark:text-yellow-light dark:hover:text-yellow transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-16">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}