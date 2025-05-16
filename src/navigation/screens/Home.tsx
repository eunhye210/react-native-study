import { Text } from '@react-navigation/elements';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Constants from 'expo-constants';



const MOVIE_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const AXIOS_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Constants.expoConfig?.extra?.TMDB_API_KEY}`,
  },
};

export function Home() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(MOVIE_URL, AXIOS_OPTIONS);
      setMovies(data.results);
    } catch (e) {
      console.error(e);
    }
  }

  const goToDetail = (movie: any) => {
    navigation.navigate("MovieDetail", { id: movie.id });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 10 }} onPress={() => goToDetail(item)}>
            <Text style={{ fontFamily: 'NotoSansKR', fontSize: 18 }}>{item.title}</Text>
            <Text>{item.overview}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
