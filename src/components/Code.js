import { lazy, Suspense, useEffect, useState } from "react";

function Wrapper(p) {
  return <div className="overflow-auto" {...p} />;
}

function Pre(p) {
  return <pre {...p} />;
}

const HighlightLoadable = lazy(() => import("./Highlight"));

const RE = /{([\d,-]+)}/;

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(",")
      .map((v) => v.split("-").map((y) => parseInt(y, 10)));
    return (index) => {
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

export default function Code({ codeString, language, metastring }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (loaded) {
    const shouldHighlightLine = calculateLinesToHighlight(metastring);
    return (
      <Suspense
        fallback={
          <Wrapper>
            <Pre>
              <code className="max-w-screen-md">{codeString}</code>
            </Pre>
          </Wrapper>
        }
      >
        <HighlightLoadable
          language={language}
          codeString={codeString}
          shouldHighlightLine={shouldHighlightLine}
        />
      </Suspense>
    );
  } else {
    return (
      <Wrapper>
        <Pre>
          <code className="max-w-screen-md">{codeString}</code>
        </Pre>
      </Wrapper>
    );
  }
}
