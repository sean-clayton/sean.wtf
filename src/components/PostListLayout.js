import Link from "next/link";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";

export default function PostListLayout({ posts, title }) {
  return (
    <main className="min-h-screen flex flex-col">
      <GlobalHeader />
      {title ? <h2 className="text-xl text-center">{title}</h2> : null}
      <ol className="flex-1 p-4 w-full max-w-prose mx-auto">
        {posts.map((p) => {
          return <li
            className="mb-4 text-yellow-900 flex flex-col"
            key={p.slug}
          >
            <Link href={`/${p.slug}`}>
              <a
                className="flex justify-between items-start font-bold text-xl mb-1"
              >
                <span>
                  {p.frontMatter.title}
                </span>
                <time className="text-xs ml-6">
                  {(new Date(p.frontMatter.date)).toLocaleDateString()}
                </time>
              </a>
            </Link>
            <div className="flex flex-wrap">
              {(p.frontMatter.series).map((series) =>
                <Link key={series} href={`/series/${series}`}>
                  <a className="text-xs mr-2">
                    #{series}
                  </a>
                </Link>
              )}
            </div>
          </li>;
        })}
      </ol>
      <GlobalFooter />
    </main>
  );
}
