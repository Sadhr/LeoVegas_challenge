# Code Review for Movieland App "LeoVegas"

Overall, the Movieland App looks great! It's well-organized and easy to navigate. Here are a few notes on specific components and files:

## src/components/Header.jsx

```
 <Link to="/" onClick={(e) => searchMovies('')} className="search-link" >
```

On line 33 I don't think it's good to add the searchMovies function on the Link because the onClick doesn't need the argument.

```
onKeyUp={(e) => searchMovies(e.target.value)}
```

onKeyUp handler that triggers searchMovies with the input value. This can cause a performance issue since the function is called on every key press, even if the user is typing very quickly. Instead, consider using a debounce function to only call the searchMovies function after the user has stopped typing for a certain amount of time.

## src/components/Movie.jsx

```
const myClickHandler = (e) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    e.target.parentElement.parentElement.classList.remove("opened");
  };
```

In the myClickHandler function, the variable e is being redefined using var, which is not necessary since e is already declared as a parameter of the function.

## src/components/Movies.jsx

The key prop of the Movie component is set to movie.id, which assumes that each movie object has a unique id property. If this is not the case, then this could cause issues with rendering and updating the component correctly. I found a case when searching there is some movies they show in more then on page.

## src/App.js

The closeCard function is defined but is not being used anywhere in the code.

The no trailer available message is rendered every time the component re-renders, even when it is not needed. It is better to render this message conditionally only when there is no videoKey available.

## src/constants.js

API key is hardcoded in the code, which is not a good practice as it can be exposed if the codebase is compromised. It's better to store API keys in environment variables or configuration files.

The search movie has a `/` after the movie and that prevents the search

The movie ID in the ENDPOINT_MOVIE URL is hardcoded. It's better to use a variable or a function to get the movie ID dynamically, based on user input or API response.

##### Thank you for the opportunity to review this code! I'm impressed by the effort put into building these endpoints.
