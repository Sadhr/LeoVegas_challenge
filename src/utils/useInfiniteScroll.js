import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementPageNumber } from "../data/moviesSlice";
import debounce from "./debounce";

function useInfiniteScroll(location) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { pageNumber, hasMore } = state.movies;

  
  useEffect(() => {
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

      if (distanceFromBottom < 100 && hasMore) {
        dispatch(incrementPageNumber());
      }
    };

    const debouncedHandleScroll = debounce(handleScroll, 200);
    if(location === "/") {

      window.addEventListener("scroll", debouncedHandleScroll);
    }

    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [dispatch, hasMore, pageNumber]);

 

  return { pageNumber };
}

export default useInfiniteScroll;
