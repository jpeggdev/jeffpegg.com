import Link from "next/link";
import { Article } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="group relative flex flex-col items-start">
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-muted opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
        <Link href={`/articles/${article.id}`}>
          <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{article.title}</span>
        </Link>
      </h2>
      <p className="relative z-10 mt-2 text-sm text-muted-foreground">
        {article.excerpt}
      </p>
      <time
        className="relative z-10 mt-3 flex items-center text-sm text-muted-foreground pl-3.5"
        dateTime={article.publishedAt}
      >
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-border" />
        </span>
        {formatDate(article.publishedAt)}
      </time>
      <div
        aria-hidden="true"
        className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
      >
        Read article
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="ml-1 h-4 w-4 stroke-current"
        >
          <path
            d="m9.75 8 .75-.75v.75"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m9.75 8.25 4.5-4.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
}