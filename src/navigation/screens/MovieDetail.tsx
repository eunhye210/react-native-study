import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useGetMovieById } from "../../api/apiFunc";

const MovieDetail = () => {
  const route = useRoute();
  const { id } = route.params;

  const { data: detail } = useGetMovieById(id);

  return (
    <View style={styles.container}>
      {detail && (
        <>
          <Text>Movie Detail</Text>
          <Text>Title : {detail.original_title}</Text>
          <Text>Genre : {detail.genres.map((v) => v.name).join(", ")}</Text>
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
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
    paddingLeft: 20,
  },
});

export default MovieDetail;
