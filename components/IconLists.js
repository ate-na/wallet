import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import IconCategory from "./IconCategory";

const icons = [
  "coffee",
  "plane",
  "suitcase",
  "car",
  "bicycle",
  "soccer-ball-o",
  "rocket",
  "apple",
  "map",
  "shopping-cart",
  "shopping-basket",
  "trophy",
  "gift",
  "briefcase",
];

const IconList = ({ navigation, route }) => {
  const onPressIconsHandler = (item) => {
    navigation.navigate("createCategory", {
      item,
      category: route?.params?.category || {},
    });
  };
  return (
    <View style={styles.container}>
      {icons.map((e) => (
        <TouchableOpacity
          style={styles.icons}
          onPress={onPressIconsHandler.bind(onPressIconsHandler, { item: e })}
        >
          <IconCategory name={e} size={20} color={"white"} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default IconList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "#666",
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
