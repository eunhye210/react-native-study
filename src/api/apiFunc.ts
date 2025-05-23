import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";
import { MOVIES } from "./path";

const MOVIE_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const AXIOS_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Constants.expoConfig?.extra?.TMDB_API_KEY}`,
  },
};

export async function fetchMovies() {
  const { data } = await axios.get(MOVIE_URL, AXIOS_OPTIONS);
  return data.results;
}

export function useGetMovies() {
  return useQuery({
    queryFn: fetchMovies,
    queryKey: ["movies"],
  });
}

export async function getMovieById(id: string) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    AXIOS_OPTIONS,
  );
  return data;
}

export function useGetMovieById(id: string) {
  return useQuery({
    queryFn: () => getMovieById(id),
    queryKey: ["movie", id],
    enabled: !!id,
  });
}
