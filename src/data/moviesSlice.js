import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("fetch-movies", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    fetchStatus: "",
    hasMore: true,
    pageNumber: 1,
    videoNotification: false
  },
  reducers: {
    incrementPageNumber: (state) => {
      state.pageNumber += 1
    },
    resetPageNumber: (state) => {
      state.pageNumber = 1
    },
    showNotification: (state) => {
      state.videoNotification = true
    },
    hideNotification: (state) => {
      state.videoNotification = false
    },
    
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovies.fulfilled, (state, action) => {
          const { page, results, total_pages, total_results } = action.payload;
          if (page === 1) {
            state.movies = { page, results, total_pages, total_results };
          } else {
            state.movies.page = page;
            state.movies.total_pages = total_pages;
            state.movies.total_results = total_results;
            state.movies.results = [...state.movies.results, ...results];
          }
          state.hasMore = page < total_pages;
          state.fetchStatus = "success";
        })
        .addCase(fetchMovies.pending, (state) => {
          state.fetchStatus = "loading";
        })
        .addCase(fetchMovies.rejected, (state) => {
          state.fetchStatus = "error";
        })
    },
});

export const { incrementPageNumber, resetPageNumber, showNotification, hideNotification } = moviesSlice.actions;

export default moviesSlice;
