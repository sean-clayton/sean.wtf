import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Head from "next/head";
import PostLayout from "@/components/PostLayout";
import YouTubePlayer from "@/components/YouTubePlayer";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import Code from "@/components/Code";

const root = process.cwd();

function preToCodeBlock(preProps) {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === "code"
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = "",
      ...props
    } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: matches && matches.groups && matches.groups.lang
        ? matches.groups.lang
        : "",
      ...props,
    };
  }
}

const components = {
  pre: (preProps) => {
    const { className, ...props } = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code
        className={`${className} rounded-md bg-gray-800 py-3 px-4 overflow-x-auto`}
        {...props}
      />;
    } else {
      // it's possible to have a pre without a code in it
      return <pre
        className={`${className} rounded-md bg-gray-800 py-3 px-4 overflow-x-auto`}
        {...preProps}
      />;
    }
  },
  YouTube: YouTubePlayer,
  SpotifyPlayer: SpotifyPlayer,
};

export default function BlogPost({ mdxSource, frontMatter, slug }) {
  const content = hydrate(mdxSource, { components });

  return (
    <>
      <Head>
        <title>sean.wtf &middot; {frontMatter.title}</title>
      </Head>
      <PostLayout>
        <div className="mx-auto max-w-prose">
          <Link href={`/${slug}`}>
            <a>
              <h1
                className="text-center text-2xl mb-4 md:text-4xl font-bold md:mb-8 text-gray-800"
              >
                {frontMatter.title}
              </h1>
            </a>
          </Link>
          <div className="text-center">
            <time>
              Published: {(new Date(frontMatter.date)).toLocaleDateString()}
            </time>
          </div>
          <div className="text-center mb-4">
            {frontMatter.series.map((series) =>
              <Link key={series} href={`/series/${series}`}>
                <a className="text-sm mr-2">
                  #{series}
                </a>
              </Link>
            )}
          </div>
          <article className="prose prose-yellow">
            {frontMatter.link
              ? <div>
                Re: <a
                  href={frontMatter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {frontMatter.link}
                </a>
              </div>
              : null}
            {content}
          </article>
        </div>
      </PostLayout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: fs
      .readdirSync(path.join(root, "content"))
      .map((p) => ({ params: { slug: p.replace(/\.mdx/, "") } })),
  };
}

export async function getStaticProps({ params }) {
  const source = fs.readFileSync(
    path.join(root, "content", `${params.slug}.mdx`),
    "utf8",
  );
  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components: components,
  });
  return { props: { mdxSource, frontMatter: data, slug: params.slug } };
}
