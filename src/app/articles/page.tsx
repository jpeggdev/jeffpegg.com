import { getPublishedArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function Articles() {
  const articles = getPublishedArticles();

  return (
    <div className="max-w-2xl mx-auto">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Writing on software design, AI, and the future of development.
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          All of my long-form thoughts on programming, AI trends, development tools, 
          and more, collected in chronological order.
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-border md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}