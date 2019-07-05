import React from "react";
import { Link as GLink } from "gatsby";

function isExternal(url) {
  var match = url.match(
    /^([^:/?#]+:)?(?:\/\/([^/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
  );
  if (
    typeof match[1] === "string" &&
    match[1].length > 0 &&
    match[1].toLowerCase() !== window.location.protocol
  )
    return true;
  if (
    typeof match[2] === "string" &&
    match[2].length > 0 &&
    match[2].replace(
      new RegExp(
        ":(" + { "http:": 80, "https:": 443 }[window.location.protocol] + ")?$"
      ),
      ""
    ) !== window.location.host
  )
    return true;
  return false;
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
