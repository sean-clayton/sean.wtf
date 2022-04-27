import ComponentPlayer from "@/components/ComponentPlayer";
import { lazy, Suspense } from "react";

const SpotifyLoadable = lazy(() => import("@/components/Spotify"));

export default function SpotifyPlayer(props) {
  return (
    <ComponentPlayer url={props.uri}>
      <SpotifyLoadable {...props} />
    </ComponentPlayer>
  );
}
