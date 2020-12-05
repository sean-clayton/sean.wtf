import Prism from "prismjs";
import HighlightBase, { defaultProps } from "prism-react-renderer";
import { each } from "lodash-es";

function Wrapper(p) {
  return <div className="overflow-auto" {...p} />;
}

function Pre(p) {
  return <pre {...p} />;
}

each(
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
    "livescript",
  ],
  (l) => {
    require(`prismjs/components/prism-${l}`);
  },
);

const customTheme = {
  styles: [
    {
      types: ["comment"],
      style: {
        fontWeight: "bold",
        textDecoration: "underline",
      },
    },
    {
      types: ["namespace"],
      style: {},
    },
    {
      types: ["property", "function"],
      style: {
        fontWeight: "bold",
      },
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
        "constructor",
      ],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["placeholder", "variable", "builtin", "keyword"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through",
      },
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["important"],
      style: {},
    },
  ],
};

export default function Highlight(
  { language, codeString, shouldHighlightLine },
) {
  return (
    <HighlightBase
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
                  className: shouldHighlightLine(i) ? "highlight-line" : "",
                })}
              >
                {line.map((token, key) => {
                  const tokenProps = getTokenProps(
                    { token, key },
                  );

                  return <span
                    key={key}
                    {...tokenProps}
                  />;
                })}
              </div>
            ))}
          </Pre>
        </Wrapper>
      )}
    </HighlightBase>
  );
}
