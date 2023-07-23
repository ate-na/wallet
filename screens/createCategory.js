import { StyleSheet, View } from "react-native";

const CreateCategory = () => {
  return (
    <View style={styles.container}>
      {/* <Category categories={categories} /> */}
      <Calculator />
    </View>
  );
};

export default CreateCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#888",
    overflow: "hidden",
    flexWrap: "wrap",
  },
});
