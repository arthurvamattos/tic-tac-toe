import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import Cell from "./src/components/Cell";

type CellProps = {
  isSelected: boolean;
  player: 1 | 2 | undefined;
  index: number;
  // isPartOfHatTrick: boolean;
};

export default function App() {
  const [player, setPlayer] = useState<1 | 2>(1);
  const [cells, setCells] = useState<CellProps[]>([
    { isSelected: false, player: 1, index: 0 },
    { isSelected: false, player: 1, index: 1 },
    { isSelected: false, player: 1, index: 2 },
    { isSelected: false, player: 1, index: 3 },
    { isSelected: false, player: 1, index: 4 },
    { isSelected: false, player: 1, index: 5 },
    { isSelected: false, player: 1, index: 6 },
    { isSelected: false, player: 1, index: 7 },
    { isSelected: false, player: 1, index: 8 },
  ]);

  function handleCellSelected(index: number) {
    if (cells[index].isSelected) return;
    setCells((oldState) =>
      oldState.map((cell) => {
        if (cell.index === index) {
          setPlayer(player === 1 ? 2 : 1);
          return { isSelected: true, player, index };
        } else return cell;
      })
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.wrapper}>
        {cells.map((cell) => (
          <Cell
            isSelected={cell.isSelected}
            player={cell.player}
            index={cell.index}
            key={cell.index}
            onPress={() => handleCellSelected(cell.index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#585666",
    marginBottom: 24,
  },
  wrapper: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    backgroundColor: "#585666",

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
