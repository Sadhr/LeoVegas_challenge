import { useEffect, useRef } from "react";
import YouTubePlayer from "./YoutubePlayer";
import Notification from "./Notification";

export default function Modal({ isOpen, closeModal, videoKey }) {
  const playerRef = useRef(null);

  function handleCloseModal() {
    closeModal();
    // Pause the player if it's playing
    if (
      playerRef.current &&
      playerRef.current.getInternalPlayer().getPlayerState() === 1
    ) {
      playerRef.current.getInternalPlayer().pauseVideo();
    }
  }

  useEffect(() => {
    function handleCloseModalOnEscapeKey(event) {
      if (event.keyCode === 27) handleCloseModal();
    }

    window.addEventListener("keydown", handleCloseModalOnEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleCloseModalOnEscapeKey);
    };
  }, []);

  return (
    <>
      {videoKey && (
        <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
          <span
            className="modal_close_button btn-close"
            onClick={handleCloseModal}
          ></span>
          <div className="modal_content">
            <YouTubePlayer videoKey={videoKey} playerRef={playerRef} />
          </div>
        </div>
      )}

      <Notification message="no trailer available. Try another movie" />
    </>
  );
}
