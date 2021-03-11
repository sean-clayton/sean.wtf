import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import {
  filter,
  flatMap,
  includes,
  kebabCase,
  map,
  reverse,
  sortBy,
  uniq,
} from "lodash-es";
import PostListLayout from "@/components/PostListLayout";

export default function Series({ postData = [], series }) {
  return (
    <>
      <Head>
        <title>Series</title>
      </Head>
      <PostListLayout title={`Series: ${series}`} posts={postData} />
    </>
  );
}

const root = process.cwd();

const contentRoot = path.join(root, "content");

export async function getStaticPaths() {
  const allSeries = map(
    uniq(
      flatMap(fs.readdirSync(contentRoot), (p) => {
        const content = fs.readFileSync(path.join(contentRoot, p), "utf8");
        const frontMatter = matter(content).data;
        return map(frontMatter.series, kebabCase);
      })
    ),
    (series) => ({
      params: {
        series: encodeURIComponent(series),
      },
    })
  );

  return {
    paths: allSeries,
    fallback: false,
  };
}

export async function getStaticProps({ params: { series } }) {
  const contentRoot = path.join(root, "content");
  const postData = filter(
    reverse(
      sortBy(
        map(fs.readdirSync(contentRoot), (p) => {
          const content = fs.readFileSync(path.join(contentRoot, p), "utf8");
          const frontMatter = matter(content).data;
          return {
            slug: p.replace(/\.mdx/, ""),
            content,
            frontMatter,
          };
        }),
        "frontMatter.date"
      )
    ),
    (post) => {
      const slugs = map(post.frontMatter.series, kebabCase);
      const slug = kebabCase(series);
      return includes(slugs, slug);
    }
  );
  return { props: { postData, series } };
}
