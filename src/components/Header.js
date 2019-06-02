import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.header`
  background-color: ${props => props.theme.colors.primary};
  grid-column: 1 / -1;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 2rem 2rem 5rem 2rem;
`;

const Content = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;

  a {
    color: ${props => props.theme.colors.white};
    font-size: 1.2rem;
    &:hover {
      opacity: 0.85;
      color: ${props => props.theme.colors.white};
    }
  }
`;

const Header = ({ children }) => (
  <Wrapper>
    <Content>{children}</Content>
  </Wrapper>
);

export default Header;
