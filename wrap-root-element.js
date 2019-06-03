import React from "react";
import { MDXProvider } from "@mdx-js/react";
import styled from "@emotion/styled";
import YouTubeBase from "react-youtube";
import { SpotifyPlayer } from "./src/components";

const components = {
  wrapper: ({ children }) => <>{children}</>
};

const YouTube = styled(YouTubeBase)`
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-height: 20em;
  height: 100%;
  max-height: 30em;
  max-width: ${p => p.theme.maxWidth};
  padding: 1em;
  background-color: ${p => p.theme.colors.primaryXLight};
  box-shadow: 0 0 0 1px ${p => p.theme.colors.primary};
`;

const globalComponents = {
  YouTube,
  SpotifyPlayer,
  Fragment: React.Fragment
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={{ ...components, ...globalComponents }}>
    {element}
  </MDXProvider>
);
