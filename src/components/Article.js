import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import { transparentize } from "polished";

import Subline from "./Subline";

const Post = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;

  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
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
    color: ${props => props.theme.colors.grey.dark};
    &:hover {
      color: ${props => props.theme.colors.primaryLight};
    }
  }
`;

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

function Article({ title, date, description, slug, timeToRead, series }) {
  return (
    <Post>
      <Title>
        <Link to={`/${slug}`}>{title}</Link>
      </Title>
      <Subline>
        {date} &mdash; {timeToRead} Min Read &mdash;{" "}
        {series.map((cat, i) => (
          <React.Fragment key={cat}>
            {"#"}
            <Link to={`/series/${kebabCase(cat)}`}>{cat}</Link>{" "}
          </React.Fragment>
        ))}
      </Subline>
      {description ? <Excerpt>{description}</Excerpt> : null}
    </Post>
  );
}

export default Article;
