import React from "react";
import { Link, graphql } from "gatsby";
import { transparentize } from "polished";
import styled from "@emotion/styled";
import kebabCase from "lodash/kebabCase";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { Layout, Wrapper, Header, Subline, SEO, PrevNext } from "../components";
import config from "../../config";

const Content = styled.article`
  grid-column: 2;
  padding-top: 3rem;
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding-top: 2rem;
  }
  p {
    font-size: 1.1rem;
    line-height: 1.58;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    @media (max-width: ${props => props.theme.breakpoints.phone}) {
      font-size: 1rem;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;

    &:hover {
      a.anchor {
        opacity: 1;
      }
    }
  }
  a.anchor {
    position: absolute;
    left: -16px;
    opacity: 0;
    transition: opacity ease-in-out ${p => p.theme.transitions.normal};

    svg {
      transform: translateX(-0.5rem);
    }
  }
`;

const Title = styled.h1`
  position: relative;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 4px dotted
    ${p => transparentize(0.666, p.theme.colors.primary)};
  &:after {
    content: "";
    position: absolute;
    bottom: 2px;
    display: block;
    width: 100%;
    border-bottom: 4px dotted
      ${p => transparentize(0.666, p.theme.colors.primary)};
  }

  a {
    color: inherit;
  }
`;

const PostContent = styled.div`
  margin-top: 4rem;
`;

const Post = ({
  pageContext: { slug, prev, next },
  data: { mdx: postNode }
}) => {
  const post = postNode.frontmatter;

  return (
    <Layout customSEO>
      <Wrapper>
        <SEO postPath={slug} postNode={postNode} article />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
        </Header>
        <Content>
          <Title>
            <Link to={`/${slug}`}>{post.title}</Link>
          </Title>
          <Subline>
            {post.date} &mdash; {postNode.timeToRead} Min Read &mdash;{" "}
            {(post.series || []).map((cat, i) => (
              <React.Fragment key={cat}>
                {"#"}
                <Link to={`/series/${kebabCase(cat || "")}`}>{cat}</Link>{" "}
              </React.Fragment>
            ))}
          </Subline>
          <PostContent>
            <MDXRenderer>{postNode.code.body}</MDXRenderer>
          </PostContent>
          <PrevNext prev={prev} next={next} />
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Post;

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code {
        body
      }
      excerpt
      frontmatter {
        title
        date(formatString: "MM/DD/YYYY")
        series
      }
      timeToRead
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
    }
  }
`;
