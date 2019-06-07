import React from "react";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";
import config from "../../config";

import { Header, Layout, Wrapper, Article, SectionTitle } from "../components";

const Content = styled.div`
  grid-column: 2;
  padding-top: 3rem;
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding-top: 2rem;
  }
  overflow: hidden;
`;

const IndexPage = ({
  data: {
    allMdx: { nodes: posts }
  }
}) => (
  <Layout>
    <Wrapper>
      <Header />
      <Content>
        {posts.map(post => (
          <Article
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            excerpt={post.excerpt}
            timeToRead={post.timeToRead}
            slug={post.fields.slug}
            series={post.frontmatter.series}
            key={post.fields.slug}
          />
        ))}
      </Content>
    </Wrapper>
  </Layout>
);

export default IndexPage;

export const IndexQuery = graphql`
  query IndexQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MM/DD/YYYY")
          series
        }
        timeToRead
      }
    }
  }
`;
