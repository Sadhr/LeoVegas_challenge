import { Link, NavLink, redirect, parsePath } from "react-router-dom";
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
    window.scrollTo(0, 0);
    delayedSearch(value);
    
    if (value.length === 0) {
      redirect("/");
      searchMovies("");
    }
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
        <input
          type="search"
          data-testid="search-movies"
          onKeyUp={handleInputChange}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
