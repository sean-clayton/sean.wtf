import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import _ from "lodash";
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
  const allSeries = _.map(
    _.uniq(_.flatMap(fs.readdirSync(contentRoot), (p) => {
      const content = fs.readFileSync(path.join(contentRoot, p), "utf8");
      const frontMatter = matter(content).data;
      return frontMatter.series;
    })),
    (series) => ({
      params: {
        series: series,
      },
    }),
  );

  return {
    paths: allSeries,
    fallback: true,
  };
}

export async function getStaticProps({ params: { series } }) {
  const contentRoot = path.join(root, "content");
  const postData = _.filter(
    _.reverse(_.sortBy(
      _.map(fs.readdirSync(contentRoot), (p) => {
        const content = fs.readFileSync(path.join(contentRoot, p), "utf8");
        const frontMatter = matter(content).data;
        return {
          slug: p.replace(/\.mdx/, ""),
          content,
          frontMatter,
        };
      }),
      "frontMatter.date",
    )),
    (post) => {
      return _.includes(post.frontMatter.series, series);
    },
  );
  return { props: { postData, series } };
}
