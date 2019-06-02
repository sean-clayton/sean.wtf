import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { SpotifyPlayer } from "./src/components";

const components = {
  wrapper: ({ children }) => <>{children}</>
};

const globalComponents = {
  SpotifyPlayer
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={{ ...components, ...globalComponents }}>
    {element}
  </MDXProvider>
);
