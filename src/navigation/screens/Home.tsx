import { Text } from "@react-navigation/elements";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetMovies } from "../../api/apiFunc";

export function Home() {
  const navigation = useNavigation();

  const { data: movies, isLoading, isError } = useGetMovies();

  const goToDetail = (movie: any) => {
    navigation.navigate("MovieDetail", { id: movie.id });
  };

  if (isError) {
    return (
      <View>
        <Text>에러가 발생했습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => goToDetail(item)}
          >
            <Text style={{ fontFamily: "NotoSansKR", fontSize: 18 }}>
              {item.title}
            </Text>
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
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
