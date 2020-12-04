import Link from "next/link";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";

export default function PostListLayout({ posts, title }) {
  return (
    <main className="min-h-screen flex flex-col">
      <GlobalHeader />
      {title ? <h2 className="text-xl text-center">{title}</h2> : null}
      <ol className="flex-1 p-4 w-full max-w-screen-md mx-auto">
        {posts.map((p) => {
          return <li
            className="bg-yellow-50 text-yellow-900 mb-4 p-4"
            key={p.slug}
          >
            <Link href={`/${p.slug}`}>
              <a className="font-bold text-xl">
                {p.frontMatter.title}
              </a>
            </Link>
            <div>
              <Link href={`/${p.slug}`}>
                <a className="text-sm">
                  <time>
                    {(new Date(p.frontMatter.date)).toLocaleDateString()}
                  </time>
                </a>
              </Link>
            </div>
            <div>
              {(p.frontMatter.series).map((series) =>
                <Link key={series} href={`/series/${series}`}>
                  <a className="text-sm mr-2">
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
