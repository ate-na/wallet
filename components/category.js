import { FlatList, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice
import CategoryItem from "./categoryItem";

const Category = ({ categories, onPress }) => {
  const onPresCategoryHandler = (item) => {
    onPress(item);
  };

  return (
    <View style={styles.container}>
      {categories.map((e) => (
        <CategoryItem item={e} key={e.id} onPress={onPresCategoryHandler} />
      ))}
    </View>
  );
};

export default Category;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "#333",
  },
});
