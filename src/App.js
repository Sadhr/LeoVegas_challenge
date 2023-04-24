import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies, resetPageNumber } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import "./app.scss";

import useInfiniteScroll from "./utils/useInfiniteScroll";

import Modal from "./components/Modal";

const App = () => {
  const state = useSelector((state) => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const [trailerClicked, setTrailerClicked] = useState(false);

  const { pageNumber } = useInfiniteScroll();

  const closeModal = () => {
    setOpen(false);
    setTrailerClicked(false);
  };

  const closeCard = () => {};

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(resetPageNumber());
      window.scrollTo(0, 0);
      dispatch(
        fetchMovies(`${ENDPOINT_SEARCH}&query=${query}&page=${pageNumber}`)
      );
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(resetPageNumber());
      window.scrollTo(0, 0);
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${pageNumber}`));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    dispatch(resetPageNumber());
    getSearchResults(query);
  };

  const getMovies = () => {
    if (searchQuery) {
      dispatch(
        fetchMovies(
          `${ENDPOINT_SEARCH}&query=` + searchQuery + "&page=" + pageNumber
        )
      );
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${pageNumber}`));
    }
  };

  const viewTrailer = (movie) => {
    getMovie(movie.id);
    setTrailerClicked(true);
    if (!videoKey) setOpen(true);
    setOpen(true);
  };

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    setVideoKey(null);
    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    getMovies();
  }, [pageNumber]);

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          videoKey={videoKey}
          trailerClicked={trailerClicked}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                closeCard={closeCard}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>

        {movies.fetchStatus === "loading" && (
          <div style={{ backgroundColor: "red", padding: 20 }}>LOADING</div>
        )}
        {!movies.hasMore && (
          <div
            style={{ backgroundColor: "yellow", color: "black", padding: 20 }}
          >
            THER IS NO MORE MOVIES
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
