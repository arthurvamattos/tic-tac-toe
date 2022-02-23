import { Dimensions, StyleSheet, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

type CellProps = RectButtonProps & {
  isSelected: boolean;
  player: 1 | 2 | undefined;
  index: number;
  // isPartOfHatTrick: boolean;
};

export default function Cell({ isSelected, player, ...props }: CellProps) {
  return (
    <RectButton style={styles.container} {...props}>
      {isSelected ? (
        player === 1 ? (
          <Feather name="x" size={48} color="#585666" />
        ) : (
          <Feather name="circle" size={48} color="#585666" />
        )
      ) : (
        <View></View>
      )}
    </RectButton>
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
