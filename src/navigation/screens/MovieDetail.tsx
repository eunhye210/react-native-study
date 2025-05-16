import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Constants from 'expo-constants';

const MOVIE_URL = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
const AXIOS_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Constants.expoConfig?.extra?.TMDB_API_KEY}`,
  },
};

const MovieDetail = () => {
  const route = useRoute();
  const {id} = route.params;
  const [detail, setDetail] = useState(null);

  const fetchMovieDetail = async () => {
    try {
      const {data} = await axios.get(MOVIE_URL(id), AXIOS_OPTIONS);
      setDetail(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchMovieDetail();
  }, [id]);

  return (
      <View style={styles.container}>
        {detail && (
          <>
            <Text>Movie Detail</Text>
            <Text>Title : {detail.original_title}</Text>
            <Text>Genre : {detail.genres.map((v) => v.name).join(', ')}</Text>
            <Text>Country : {detail.origin_country}</Text>
            <Text>Language : {detail.original_language}</Text>
          </>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
    paddingLeft: 20,
  },
});

export default MovieDetail;