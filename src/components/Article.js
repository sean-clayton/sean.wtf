import React from "react";
import styled from "@emotion/styled";
import Link from "./Link";
import kebabCase from "lodash/kebabCase";
import { get } from "lodash/fp";

import Subline from "./Subline";

const Post = styled.article`
  display: flex;
  flex-direction: column;
  margin-block-start: 1rem;
  margin-block-end: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    margin-block-start: 1rem;
    margin-block-end: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.1em;
  position: relative;

  a {
    color: ${props => props.theme.colors.grey.dark};
    border-bottom: 4px solid ${get("theme.colors.primary")};
    &:hover {
      background-color: ${get("theme.colors.primary")};
      color: ${get("theme.colors.bg")};
    }
  }
`;

const Excerpt = styled.p`
  grid-column: -1 / 1;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

function Article({ title, date, description, slug, timeToRead, series, link }) {
  return (
    <Post>
      <Title>
        <Link to={link || `/${slug}`}>{title}</Link>
      </Title>
      <Subline>
        <Link to={`/${slug}`}>{timeToRead} Min Read &mdash;</Link>{" "}
        {(series || []).map((cat, i) => (
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
