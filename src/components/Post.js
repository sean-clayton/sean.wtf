import { get, kebabCase } from "lodash-es";
import Link from "next/link";
import Head from "next/head";
import PostLayout from "@/components/PostLayout";
import { formatDate } from "@/utils";

export default function Post({ post, content }) {
  const description = get(
    post,
    "frontMatter.description",
    "A post by Sean Clayton."
  );

  return (
    <>
      <Head>
        <title>sean.wtf &middot; {post.frontMatter.title}</title>
        <meta name="Description" content={description} />
      </Head>
      <PostLayout>
        <div className="mx-auto max-w-screen-md">
          <Link href={`/${post.slug}`}>
            <a>
              <h1 className="md:text-center text-3xl font-black mb-4 md:text-5xl md:mb-8 text-gray-800">
                {post.frontMatter.title}
              </h1>
            </a>
          </Link>
          <div className="md:text-center text-sm md:text-base italic">
            Published on {formatDate(new Date(post.frontMatter.date))}
          </div>
          <div className="md:text-center text-sm md:text-base mb-4">
            {post.frontMatter.series.map((series) => (
              <Link key={series} href={`/series/${kebabCase(series)}`}>
                <a className="text-sm mr-2">#{series}</a>
              </Link>
            ))}
          </div>
          <div className="max-w-screen-md mt-8">
            <article className="prose md:prose-lg prose-yellow max-w-none">
              {post.frontMatter.link ? (
                <div>
                  Re:{" "}
                  <a
                    href={post.frontMatter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.frontMatter.link}
                  </a>
                </div>
              ) : null}
              {content}
            </article>
          </div>
        </div>
      </PostLayout>
    </>
  );
}
