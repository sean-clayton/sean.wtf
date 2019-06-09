import React from "react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import { transparentize, darken } from "polished";
import SEO from "./SEO";
import theme from "../../config/theme";
import useBuildTime from "../hooks/useBuildTime";
import Providers from "./Providers";
import dankMono from "./DankMono";

const globalStyle = (
  <Global
    styles={css`
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      html,
      body {
        padding: 0;
        margin: 0;
      }
      ::selection {
        color: ${theme.colors.bg};
        background: ${theme.colors.primary};
      }
      html {
        font-family: ${theme.fontFamily.monospace};
        font-size: ${theme.baseFontSize};
        h1 {
          font-size: 2em;
        }
        h2 {
          font-size: 1.75em;
        }
        h3 {
          font-size: 1.5em;
        }
        h4 {
          font-size: 1.25em;
        }
        h5 {
          font-size: 1.15em;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          a {
          }
        }
        @media (max-width: ${theme.breakpoints.phone}) {
          font-size: 16px;
        }
      }
      body {
        background: ${theme.colors.bg};
        color: ${theme.colors.grey.default};
      }
      a {
        color: ${theme.colors.primary};
        text-decoration: none;
        transition: color ${theme.transitions.normal};
      }
      a:hover {
        color: ${theme.colors.primaryLight};
      }
      a:not([href]):not([tabindex]) {
        color: inherit;
        text-decoration: none;
        &:hover,
        &:focus {
          color: inherit;
          text-decoration: none;
        }
        &:focus {
          outline: 0;
        }
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: ${theme.colors.grey.dark};
        font-family: ${theme.fontFamily.monospace};
      }
      hr {
        border: none;
        border-bottom: 4px dotted ${theme.colors.primaryLight};
      }
      blockquote {
        font-style: italic;
        position: relative;
      }
      ul,
      ol {
        font-size: 1.1rem;
        li {
          line-height: 1.58;
          font-size: inherit;
        }
      }
      blockquote:before {
        content: "";
        position: absolute;
        background: ${theme.colors.primary};
        height: 100%;
        width: 6px;
        margin-left: -1.6rem;
      }
      label {
        margin-bottom: 0.5rem;
        color: ${theme.colors.grey.dark};
      }
      input,
      textarea,
      button {
        font-size: 1rem;
      }
      textarea {
        font-family: ${theme.fontFamily.monospace};
      }
      input,
      textarea {
        border-radius: 0.5rem;
        border: none;
        background: rgba(0, 0, 0, 0.05);
        padding: 0.4rem 1rem;
        &:focus {
          outline: none;
        }
      }
      pre {
        margin-block-start: 2rem;
        margin-block-end: 2rem;
        overflow: auto;
        line-height: 1.58;
        padding: 1rem;
        background-color: ${theme.colors.primaryXLight};
        box-shadow: 0 0 0 1px ${theme.colors.primary};
        color: ${darken(0.1, theme.colors.primary)};

        code {
          background-color: transparent;
          padding: 0;
        }
      }
      code {
        background-color: ${transparentize(0.9, theme.colors.primary)};
        color: ${darken(0.1, theme.colors.primary)};
      }
      pre,
      code {
        font-family: ${theme.fontFamily.monospace};
      }
      figure {
        margin: 0 0 1rem 0;
      }
      img {
        vertical-align: middle;
      }
      [role="button"] {
        cursor: pointer;
      }
      a,
      area,
      button,
      [role="button"],
      input,
      label,
      select,
      summary,
      textarea {
        touch-action: manipulation;
      }
      table {
        border-collapse: collapse;
        background-color: ${theme.colors.bg};
      }
      caption {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        color: ${theme.colors.color};
        text-align: center;
        caption-side: bottom;
      }
      th {
        text-align: left;
      }
      fieldset {
        min-width: 0;
        padding: 0;
        margin: 0;
        border: 0;
      }
      legend {
        display: block;
        width: 100%;
        padding: 0;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        line-height: inherit;
      }
      input[type="search"] {
        -webkit-appearance: none;
      }
      output {
        display: inline-block;
      }
      svg:not(:root) {
        overflow: hidden;
        vertical-align: middle;
      }
      [hidden] {
        display: none !important;
      }
    `}
  />
);

const SiteWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  background-color: ${p => p.theme.colors.primary};
  color: ${p => transparentize(0.25, p.theme.colors.bg)};
  text-align: center;
  padding: 2rem 1rem;

  span {
    font-size: 0.75rem;
  }

  a {
    color: ${p => p.theme.colors.bg};
  }
`;

const Layout = ({ children, customSEO }) => {
  const buildTime = useBuildTime();

  return (
    <Providers>
      <SiteWrapper>
        {!customSEO && <SEO buildTime={buildTime} />}
        {globalStyle}
        <ContentWrapper>{children}</ContentWrapper>
        <Footer>
          &copy; 2017–{new Date().getFullYear()} by S. P. O. Clayton. All rights
          reserved.
          <br />
          All writings on this site by Sean Clayton are available under the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://creativecommons.org/licenses/by-sa/4.0/"
          >
            CC BY-SA 4.0
          </a>{" "}
          license.
          <br />
          <a href="/cc-by-sa-4.0.txt">You can view the license here.</a>
          <br />
          <a href="https://github.com/sean-clayton/sean.wtf">GitHub Repo</a>
        </Footer>
        {dankMono}
      </SiteWrapper>
    </Providers>
  );
};

export default Layout;

Layout.defaultProps = {
  customSEO: false
};
