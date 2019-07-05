import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import _ from "lodash";
import Prism from "prismjs";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "../../config/theme";
import { transparentize } from "polished";

(typeof global !== "undefined" ? global : window).Prism = Prism;

_.each(
  [
    "ocaml",
    "reason",
    "fsharp",
    "coffeescript",
    "diff",
    "javascript",
    "typescript",
    "haskell",
    "elixir",
    "css",
    "scss",
    "rust",
    "elm",
    "swift",
    "markdown",
    "sql",
    "jsx",
    "tsx",
    "livescript"
  ],
  l => {
    require(`prismjs/components/prism-${l}`);
  }
);

const Wrapper = styled.div`
  overflow: auto;
  background-color: ${theme.colors.primaryXLight};
  box-shadow: 0 0 0 1px ${theme.colors.primary};
  overflow-x: auto;
`;

const Pre = styled.pre`
  float: left;
  overflow: initial;
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  color: ${p => transparentize(0.6, p.theme.colors.primary)};
  font-size: 1.1rem;
  line-height: 1.58;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    font-size: 1rem;
  }
`;

const customTheme = {
  plain: {
    backgroundColor: theme.colors.backgroundColor,
    color: theme.colors.text
  },
  styles: [
    {
      types: ["operator", "string", "keyword", "boolean"],
      style: {
        color: theme.colors.primaryDark
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: theme.colors.primary
      }
    },
    {
      types: ["prolog", "doctype", "cdata", "punctuation"],
      style: {}
    },
    {
      types: ["comment"],
      style: {
        color: theme.colors.bg,
        backgroundColor: theme.colors.primary,
        fontWeight: "bold",
        textDecoration: "underline"
      }
    },
    {
      types: ["namespace"],
      style: {}
    },
    {
      types: ["tag", "operator", "number"],
      style: {}
    },
    {
      types: ["property", "function"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {}
    },
    {
      types: ["attr-name"],
      style: {}
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "attr-value",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "at-rule",
        "constant",
        "constructor"
      ],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["placeholder", "variable", "builtin", "keyword"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["important"],
      style: {}
    }
  ]
};

const RE = /{([\d,-]+)}/;

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(",")
      .map(v => v.split("-").map(y => parseInt(y, 10)));
    return index => {
      const lineNumber = index + 1;
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      );
      return inRange;
    };
  } else {
    return () => false;
  }
}

function Code({ codeString, language, metastring, ...props }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (loaded) {
    if (props["react-live"]) {
      return (
        <LiveProvider code={codeString} noInline={true} theme={customTheme}>
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>
      );
    }
    const shouldHighlightLine = calculateLinesToHighlight(metastring);
    return (
      <Highlight
        {...defaultProps}
        Prism={Prism}
        code={codeString}
        language={language}
        theme={customTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Wrapper>
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({
                    line,
                    key: i,
                    className: shouldHighlightLine(i) ? "highlight-line" : ""
                  })}
                >
                  <LineNumber>{i + 1}</LineNumber>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Pre>
          </Wrapper>
        )}
      </Highlight>
    );
  } else {
    return (
      <Wrapper>
        <Pre>
          <code>{codeString}</code>
        </Pre>
      </Wrapper>
    );
  }
}

export default Code;
