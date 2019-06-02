import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import styled from "@emotion/styled";
import _ from "lodash";

import { Layout, Wrapper, Header, SectionTitle } from "../components";
import config from "../../config";

const Content = styled.div`
  grid-column: 2;
  padding-top: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding-top: 3rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding-top: 2rem;
  }
`;

const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;

const series = ({
  data: {
    allMdx: { group }
  }
}) => (
  <Layout>
    <Wrapper>
      <Helmet title={`series | ${config.siteTitle}`} />
      <Header>
        <Link to="/">{config.siteTitle}</Link>
      </Header>
      <Content>
        <SectionTitle>series</SectionTitle>
        {group.map(series => (
          <Title key={series.fieldValue}>
            <Link to={`/series/${_.kebabCase(series.fieldValue)}`}>
              {_.startCase(series.fieldValue)}
            </Link>{" "}
            ({series.totalCount})
          </Title>
        ))}
      </Content>
    </Wrapper>
  </Layout>
);

export default series;

export const postQuery = graphql`
  query seriesIndex {
    allMdx {
      group(field: frontmatter___series) {
        fieldValue
        totalCount
      }
    }
  }
`;
