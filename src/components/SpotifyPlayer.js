/**
 * Spotify player iframe widget
 *
 * @author Alexander Wallin <office@alexanderwallin.com>
 * @see https://developer.spotify.com/technologies/widgets/spotify-play-button/
 */

import React from "react";
import ComponentPlayer from "@/components/ComponentPlayer";

// Size presets, defined by Spotify
const sizePresets = {
  large: {
    width: 300,
    height: 380,
  },
  compact: {
    width: 300,
    height: 80,
  },
};

/**
 * SpotifyPlayer class
 */
class SpotifyComponent extends React.Component {
  // ------------------------------------------------------
  // Render
  // ------------------------------------------------------

  render() {
    const { uri, view, theme } = this.props;
    let { size } = this.props;

    if (typeof size === "string") {
      size = sizePresets[size];
    }

    return (
      <iframe
        title="Spotify"
        className="SpotifyPlayer"
        src={`https://embed.spotify.com/?uri=${uri}&view=${view}&theme=${theme}`}
        width={size.width}
        height={size.height}
        frameBorder="0"
        allowtransparency="true"
      />
    );
  }
}

SpotifyComponent.defaultProps = {
  size: "large",
  view: "list",
  theme: "black",
};

export default function SpotifyPlayer(props) {
  return (
    <ComponentPlayer url={props.uri}>
      <SpotifyComponent {...props} />
    </ComponentPlayer>
  );
}
