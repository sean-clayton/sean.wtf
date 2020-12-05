import { kebabCase } from "lodash-es";
import Link from "next/link";
import Head from "next/head";
import PostLayout from "@/components/PostLayout";
import { formatDate } from "@/utils";

export default function Post({ post, content }) {
  return (
    <>
      <Head>
        <title>sean.wtf &middot; {post.frontMatter.title}</title>
      </Head>
      <PostLayout>
        <div className="mx-auto max-w-screen-md">
          <Link href={`/${post.slug}`}>
            <a>
              <h1
                className="text-center text-2xl tracking-tighter mb-4 md:text-4xl md:mb-8 text-gray-800"
              >
                {post.frontMatter.title}
              </h1>
            </a>
          </Link>
          <div className="text-center italic">
            Published on {formatDate(new Date(post.frontMatter.date))}
          </div>
          <div className="text-center mb-4">
            {post.frontMatter.series.map((series) =>
              <Link key={series} href={`/series/${kebabCase(series)}`}>
                <a className="text-sm mr-2">
                  #{series}
                </a>
              </Link>
            )}
          </div>
          <div className="max-w-screen-md">
            <article className="prose md:prose-lg prose-yellow max-w-none">
              {post.frontMatter.link
                ? <div>
                  Re: <a
                    href={post.frontMatter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.frontMatter.link}
                  </a>
                </div>
                : null}
              {content}
            </article>
          </div>
        </div>
      </PostLayout>
    </>
  );
}
