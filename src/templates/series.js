import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";
import _ from "lodash";

import {
  Layout,
  Wrapper,
  Header,
  Subline,
  Article,
  SectionTitle
} from "../components";
import config from "../../config";

const Content = styled.div`
  grid-column: 2;
  padding-top: 3rem;
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding-top: 2rem;
  }
`;

const series = ({ pageContext: { series }, data: { allMdx } }) => {
  const { nodes, totalCount } = allMdx;
  const subline = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${series}"`;
  const seriesName = _.startCase(series);

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`Series: ${seriesName} | ${config.siteTitleAlt}`} />
        <Header />
        <Content>
          <Subline sectionTitle>
            {subline} (See <Link to="/series">all series</Link>)
          </Subline>
          {nodes.map(post => (
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
};

export default series;

export const postQuery = graphql`
  query seriesPage($series: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          title
          date(formatString: "MM/DD/YYYY")
          series
        }
        fields {
          slug
        }
        excerpt(pruneLength: 200)
        timeToRead
      }
    }
  }
`;
