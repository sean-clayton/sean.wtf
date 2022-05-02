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
              <div className="flex flex-col md:flex-row justify-between items-start text-lg mb-1">
                <Link href={`/${p.slug}`}>
                  <a>{p.frontMatter.title}</a>
                </Link>
                <div className="text-xs md:ml-6 min-w-max">
                  {formatDate(new Date(p.frontMatter.date))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <GlobalFooter />
    </main>
  );
}
