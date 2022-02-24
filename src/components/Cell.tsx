import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type CellProps = TouchableOpacityProps & {
  isSelected: boolean;
  player: 1 | 2 | undefined;
  index: number;
  // isPartOfHatTrick: boolean;
};

export default function Cell({ isSelected, player, ...rest }: CellProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.95} {...rest}>
      {isSelected ? (
        player === 1 ? (
          <Feather name="x" size={48} color="#585666" />
        ) : (
          <Feather name="circle" size={48} color="#585666" />
        )
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",

    width: Dimensions.get("window").width * 0.29,
    height: Dimensions.get("window").width * 0.29,

    marginBottom: "1.7%",
  },
});
