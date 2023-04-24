// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// function useInfiniteScroll() {
//   const state = useSelector((state) => state);
//   const { movies } = state;
//   const [page, setPage] = useState(1);
//   const [shouldResetPage, setShouldResetPage] = useState(false);

//   useEffect(() => {
//     if (shouldResetPage) {
//       setPage(1);
//       window.scrollTo(0, 0);
//       setShouldResetPage(false);
//     }
//   }, [shouldResetPage]);

//   useEffect(() => {
//     function debounce(func, wait) {
//       let timeout;
//       return function () {
//         const context = this,
//           args = arguments;
//         clearTimeout(timeout);
//         timeout = setTimeout(function () {
//           func.apply(context, args);
//         }, wait);
//       };
//     }

//     const handleScroll = () => {
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;
//       const scrollTop = document.documentElement.scrollTop;
//       const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

//       if (distanceFromBottom < 100 && movies.hasMore) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     };
//     const debouncedHandleScroll = debounce(handleScroll, 200);

//     window.addEventListener("scroll", debouncedHandleScroll);

//     return () => window.removeEventListener("scroll", debouncedHandleScroll);
//   }, [movies.hasMore]);

//   return { page, setShouldResetPage };
// }

// export default useInfiniteScroll;


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementPageNumber } from "../data/moviesSlice";

function useInfiniteScroll() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { pageNumber, hasMore } = state.movies;
  
  useEffect(() => {
    function debounce(func, wait) {
      let timeout;
      return function () {
        const context = this,
          args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      };
    }

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

    window.addEventListener("scroll", debouncedHandleScroll);

    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [dispatch, hasMore, pageNumber]);

 

  return { pageNumber };
}

export default useInfiniteScroll;
