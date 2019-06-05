import React from "react";
import { MDXProvider } from "@mdx-js/react";
import styled from "@emotion/styled";
import YouTubeBase from "react-youtube";
import { SpotifyPlayer, Code } from "./src/components";

function preToCodeBlock(preProps) {
  if (
    // children is MDXTag
    preProps.children &&
    // MDXTag props
    preProps.children.props &&
    // if MDXTag is going to render a <code>
    preProps.children.props.originalType === "code"
  ) {
    // we have a <pre><code> situation
    const codeString = preProps.children.props.children;
    const { className, ...props } = preProps.children.props;

    return {
      codeString: codeString.trim(),
      language: className && className.split("-")[1],
      ...props
    };
  }
  return undefined;
}

const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />;
    }
  },
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
