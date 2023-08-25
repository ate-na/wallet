import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconCategory from "./IconCategory";

const CategoryItem = ({ item, onPress, choosen }) => {
  const onClickBtnHandler = () => {
    onPress(item);
  };
  return (
    <View style={styles.categoryItem}>
      <IconCategory
        isActive={choosen?._id === item?._id}
        isTouchable={true}
        onPress={onClickBtnHandler}
        name={item?.icon || "question"}
        color={"white"}
        size={27}
      />
      <Text style={styles.categoryName}>{item?.title}</Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    height: 80,
    width: 80,
    justifyContent: "center",
    marginVertical: 10,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 14,
    color: "white",
    marginTop: 10,
  },
});
