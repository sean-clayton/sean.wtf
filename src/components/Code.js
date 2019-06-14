import React, { useState, useEffect } from "react";
import _ from "lodash";
import Prism from "prismjs";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "../../config/theme";

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
    "tsx"
  ],
  l => {
    require(`prismjs/components/prism-${l}`);
  }
);

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

function Code({ codeString, language, ...props }) {
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
    return (
      <Highlight
        {...defaultProps}
        Prism={Prism}
        code={codeString}
        language={language}
        theme={customTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  } else {
    return (
      <pre>
        <code>{codeString}</code>
      </pre>
    );
  }
}

export default Code;
