import YouTube from "react-youtube";
import ComponentPlayer from "./ComponentPlayer";

export default function YouTubePlayer(props) {
  return (
    <ComponentPlayer
      thumbnail={`https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`}
      url={`https://www.youtube.com/watch?v=${props.videoId}`}
    >
      <YouTube className="w-full max-h-72 my-4" {...props} />
    </ComponentPlayer>
  );
}
