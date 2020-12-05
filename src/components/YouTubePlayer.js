import ComponentPlayer from "@/components/ComponentPlayer";
import { lazy, Suspense } from "react";

const YouTubeLoadable = lazy(() => import("react-youtube"));

export default function YouTubePlayer(props) {
  return (
    <ComponentPlayer
      thumbnail={`https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`}
      url={`https://www.youtube.com/watch?v=${props.videoId}`}
    >
      <YouTubeLoadable className="w-full max-h-72 my-4" {...props} />
    </ComponentPlayer>
  );
}
