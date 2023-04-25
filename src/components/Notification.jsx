import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../data/moviesSlice";

export default function Notification({ message }) {
  const state = useSelector((state) => state);
  const { videoNotification } = state.movies;
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => dispatch(hideNotification()), 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [videoNotification, dispatch]);

  return videoNotification ? (
    <div className="notification" style={{ padding: "30px" }}>
      <h6>{message}</h6>
    </div>
  ) : null;
}
