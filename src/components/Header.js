import React from "react";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import { transparentize, darken } from "polished";
import config from "../../config";

const Wrapper = styled.header`
  background-color: ${props => transparentize(0.9, props.theme.colors.primary)};
  border-bottom: 2px dotted ${p => transparentize(0.4, p.theme.colors.primary)};
  grid-column: 1 / -1;
  margin-left: -1rem;
  margin-right: -1rem;
  height: 150px;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: ${props => darken(0.3, props.theme.colors.primary)};
    font-size: 1.5em;
    padding: 1rem;
    &:hover {
      color: ${props =>
        transparentize(0.15, darken(0.3, props.theme.colors.primary))};
    }
  }
`;

function Header() {
  return (
    <Wrapper>
      <Content>
        <Link to="/">{config.siteTitle}</Link>
      </Content>
    </Wrapper>
  );
}

export default Header;
