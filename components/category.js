import { View, StyleSheet } from "react-native";
import CategoryItem from "./categoryItem";

const Category = ({ categories, onPress, choosen, navigation }) => {
  const onPresCategoryHandler = (item) => {
    if (item.name === "add") {
      navigation.navigate("createCategory");
    }
    onPress(item);
  };

  return (
    <View style={styles.container}>
      {categories.map((e) => (
        <CategoryItem
          item={e}
          key={e.id}
          onPress={onPresCategoryHandler}
          choosen={choosen}
        />
      ))}
      <CategoryItem
        item={{ id: 200, name: "add", icon: "question", type: "add" }}
        key={200}
        onPress={onPresCategoryHandler}
        choosen={choosen}
      />
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
