import { Link, NavLink, redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import debounce from "../utils/debounce";

import "../styles/header.scss";

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector((state) => state.starred);

  const delayedSearch = debounce((query) => {
    searchMovies(query);
  }, 500);

  const handleInputChange = (e) => {
    const { value } = e.target;
    delayedSearch(value);
  };

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies("")}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <NavLink to="/"  className="search-link">
          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={handleInputChange}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
