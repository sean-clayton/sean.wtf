import { kebabCase } from "lodash-es";
import Link from "next/link";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import { formatDate } from "@/utils";

export default function PostListLayout({ posts, title }) {
  return (
    <main className="min-h-screen flex flex-col">
      <GlobalHeader />
      {title ? <h2 className="text-xl text-center">{title}</h2> : null}
      <ol className="flex-1 p-4 w-full max-w-screen-md mx-auto">
        {posts.map((p) => {
          return (
            <li className="mb-4 text-yellow-900 flex flex-col" key={p.slug}>
              <Link href={`/${p.slug}`}>
                <a className="flex flex-col-reverse md:flex-row justify-between items-start text-lg mb-1">
                  <div>{p.frontMatter.title}</div>
                  <div className="text-xs md:ml-6 min-w-max">
                    {formatDate(new Date(p.frontMatter.date))}
                  </div>
                </a>
              </Link>
              <div className="flex flex-wrap">
                {p.frontMatter.series.map((series) => (
                  <Link key={series} href={`/series/${kebabCase(series)}`}>
                    <a className="text-xs mr-2">#{series}</a>
                  </Link>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
      <GlobalFooter />
    </main>
  );
}
