import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import YouTubePlayer from "@/components/YouTubePlayer";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import Code from "@/components/Code";
import Post from "@/components/Post";

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
        className={`${className} overflow-x-auto`}
        {...props}
      />;
    } else {
      // it's possible to have a pre without a code in it
      return <pre
        className={`${className} overflow-x-auto`}
        {...preProps}
      />;
    }
  },
  YouTube: YouTubePlayer,
  SpotifyPlayer: SpotifyPlayer,
};

export default function BlogPost(props) {
  const content = hydrate(props.mdxSource, { components });

  return (
    <>
      <Post post={props} content={content} />
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
