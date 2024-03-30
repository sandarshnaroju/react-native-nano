import NativeVideoPlayer from './VideoPlayer.native';
import WebVideoPlayer from './VideoPlayer.web';
let VideoPlayer;
if (process.env.NODE_ENV === 'web') {
  VideoPlayer = WebVideoPlayer;
} else {
  VideoPlayer = NativeVideoPlayer;
}
export default VideoPlayer;
