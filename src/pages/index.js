import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { map, reverse, sortBy } from "lodash-es";
import PostListLayout from "@/components/PostListLayout";

const root = process.cwd();

export default function Home({ postData }) {
  return (
    <>
      <Head>
        <title>sean.wtf</title>
        <meta
          name="Description"
          content="Writings and thoughts from Sean Clayton."
        />
      </Head>
      <a rel="me" className="hidden" href="https://mastodon.social/@seanc" />
      <a rel="me" className="hidden" href="https://kolektiva.social/@sc" />
      <PostListLayout posts={postData} />
    </>
  );
}

export async function getStaticProps() {
  const contentRoot = path.join(root, "content");
  const postData = reverse(
    sortBy(
      map(fs.readdirSync(contentRoot), (p) => {
        const content = fs.readFileSync(path.join(contentRoot, p), "utf8");

        return {
          slug: p.replace(/\.mdx/, ""),
          frontMatter: matter(content).data,
        };
      }),
      "frontMatter.date"
    )
  );
  return { props: { postData } };
}
