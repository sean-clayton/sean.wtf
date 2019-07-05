import React from "react";
import { MDXProvider } from "@mdx-js/react";
import styled from "@emotion/styled";
import YouTubeBase from "react-youtube";
import {
  SpotifyPlayer as Spotify,
  Code,
  ComponentPlayer
} from "./src/components";

function preToCodeBlock(preProps) {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === "code"
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = "",
      ...props
    } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : "",
      ...props
    };
  }
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

const YouTubeStyled = styled(YouTubeBase)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YouTubeContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
  overflow: hidden;
`;

const YouTubeWrapper = styled.div`
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  box-sizing: border-box;
  padding: 1em;
  background-color: ${p => p.theme.colors.primaryXLight};
  box-shadow: 0 0 0 1px ${p => p.theme.colors.primary};
`;

const YouTube = p => (
  <ComponentPlayer url={`https://www.youtube.com/watch?v=${p.videoId}`}>
    <YouTubeWrapper>
      <YouTubeContainer>
        <YouTubeStyled {...p} />
      </YouTubeContainer>
    </YouTubeWrapper>
  </ComponentPlayer>
);

const SpotifyPlayer = p => (
  <ComponentPlayer url={p.uri}>
    <Spotify {...p} />
  </ComponentPlayer>
);

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
