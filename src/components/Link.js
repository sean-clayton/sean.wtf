import React from "react";
import { Link as GLink } from "gatsby";

function isExternal(url) {
  return /^(https?|mailto):\/\//.test(url);
}

function Link(props) {
  if (isExternal(props.to)) {
    return (
      <a {...props} href={props.to} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }
  return <GLink {...props} />;
}

export default Link;
