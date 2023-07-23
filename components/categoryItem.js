import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Icon } from "react-native-vector-icons/Icon";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace 'FontAwesome' with the icon library of your choice

const CategoryItem = ({ item, onPress }) => {
  const [colorBtn, setColorBtn] = useState("#f0f0f0");
  const [activeBtn, setActiveBtn] = useState("");
  const onClickBtnHandler = () => {
    setColorBtn("orange");
    setActiveBtn(item.id);
    onPress(item);
  };
  return (
    <View style={styles.categoryItem}>
      <TouchableOpacity
        style={[
          styles.circle,
          activeBtn === item.id
            ? { backgroundColor: colorBtn }
            : { backgroundColor: "#f0f0f0" },
        ]}
        onPress={onClickBtnHandler}
      ></TouchableOpacity>
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "column",
    marginHorizontal: 4,
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "#666",
    overflow: "hidden",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    marginTop: 20,
    fontSize: 16,
    color: "white",
  },
});
