import { View, StyleSheet } from "react-native";
import CategoryItem from "./categoryItem";

const Category = ({
  route,
  categories,
  onPress,
  choosen,
  navigation,
  isEdit = false,
}) => {
  const onPresCategoryHandler = (item) => {
    if (isEdit) {
      navigation.navigate("createCategory", { category: item });
    }
    onPress(item, true);
  };
  const addCategoryHandler = (item) => {
    onPress(item, false);
    navigation.navigate("createCategory", isEdit ? { category: item } : {});
  };

  return (
    <View style={styles.container}>
      {categories.map((e) => (
        <CategoryItem
          item={e}
          key={e._id}
          onPress={onPresCategoryHandler}
          choosen={choosen}
        />
      ))}
      <CategoryItem
        item={{ _id: 200, title: "add", icon: "question", type: "add" }}
        key={200}
        onPress={addCategoryHandler}
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
