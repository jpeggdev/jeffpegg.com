import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleById, getPublishedArticles } from "@/lib/articles";
import MarkdownRenderer from "@/components/MarkdownRenderer";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const articles = getPublishedArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article || article.status !== 'published') {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back to Articles */}
      <div className="mb-8">
        <Link 
          href="/articles"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
        >
          ← Back to Articles
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300 mb-6">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <span>{article.readTime} min read</span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/articles?tag=${tag.toLowerCase()}`}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <MarkdownRenderer content={article.content} />
      </article>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Enjoyed this article? Let&apos;s connect!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://x.com/theRealJeffPegg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Follow on X
            </a>
            <a
              href="mailto:jeff.pegg@gmail.com?subject=About your article: ${article.title}"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Feedback
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}