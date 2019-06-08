import React from "react";
import styled from "@emotion/styled";
import { darken, lighten } from "polished";
import { Link } from "gatsby";

const Wrapper = styled.div`
  display: flex;
  background-color: ${p => p.theme.colors.primary};
  box-shadow: inset 0 -1px 0 ${p => lighten(0.15, p.theme.colors.primary)};
  justify-items: center;
`;

const Text = styled.div`
  transition: ${p => p.theme.transitions.normal} color;
  color: ${props => darken(0.33, props.theme.colors.primary)};
`;

const PrevNextLink = styled(Link)`
  flex: 1;
  padding: 0 2em;
  height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${props => props.theme.colors.bg};
  box-shadow: 1px 0 0 ${p => lighten(0.15, p.theme.colors.primary)};

  &:hover {
    color: ${props => props.theme.colors.bg};

    ${Text} {
      color: ${props => props.theme.colors.bg};
    }
  }
`;

const Prev = styled(PrevNextLink)`
  align-items: flex-start;
  text-align: left;
`;

const Next = styled(PrevNextLink)`
  align-items: flex-end;
  text-align: right;
`;

const PrevNext = ({ next, prev }) => (
  <Wrapper>
    {prev ? (
      <Prev to={`/${prev.fields.slug}`}>
        <Text>Previous</Text>
        <div>{prev.frontmatter.title}</div>
      </Prev>
    ) : null}

    {next ? (
      <Next to={`/${next.fields.slug}`}>
        <Text>Next</Text>
        <div>{next.frontmatter.title}</div>
      </Next>
    ) : null}
  </Wrapper>
);

export default PrevNext;

PrevNext.defaultProps = {
  next: null,
  prev: null
};
