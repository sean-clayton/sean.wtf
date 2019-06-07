import React, { useState } from "react";
import styled from "@emotion/styled";
import { darken } from "polished";

const IdleComponentContainer = styled.div`
  width: 100%;
  padding-top: 50%;
  position: relative;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const IdleComponentWrapper = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${p => darken(0.1, p.theme.colors.primary)};
  background-color: ${p => p.theme.colors.primaryXLight};
  box-shadow: 0 0 0 1px ${p => p.theme.colors.primary};
  transition: background-color ${p => p.theme.transitions.normal},
    color ${p => p.theme.transitions.normal};

  &:hover {
    color: ${p => p.theme.colors.bg};
    background-color: ${p => p.theme.colors.primary};
  }
`;

function IdleComponent({ onClick, url }) {
  return (
    <IdleComponentContainer>
      <IdleComponentWrapper href={url} onClick={onClick}>
        <span>Play Embedded Media</span>
      </IdleComponentWrapper>
    </IdleComponentContainer>
  );
}

function ComponentPlayer({ children, url }) {
  const [open, setOpen] = useState(false);
  const openComponent = e => {
    e.preventDefault();
    setOpen(true);
  };

  return open ? children : <IdleComponent onClick={openComponent} url={url} />;
}

export default ComponentPlayer;
