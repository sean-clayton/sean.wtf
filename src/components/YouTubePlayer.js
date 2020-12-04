import YouTube from "react-youtube";
import ComponentPlayer from "./ComponentPlayer";

export default function YouTubePlayer(props) {
  return (
    <ComponentPlayer url={`https://www.youtube.com/watch?v=${props.videoId}`}>
      <YouTube {...props} />
    </ComponentPlayer>
  );
}
