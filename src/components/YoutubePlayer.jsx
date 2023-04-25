import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey, playerRef }) => (<ReactPlayer 
  ref={playerRef}
  className="video-player" 
  url={`https://www.youtube.com/watch?v=${videoKey}`} 
  controls={true}
  playing={true}
  data-testid="youtube-player"
/>);

export default YoutubePlayer;