import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import Cell from "./src/components/Cell";
import Constants from "expo-constants";
import Button from "./src/components/Button";

type CellProps = {
  isSelected: boolean;
  player: 1 | 2 | undefined;
  index: number;
  // isPartOfHatTrick: boolean;
};

const initalCellState: Array<CellProps> = [
  { isSelected: false, player: 1, index: 0 },
  { isSelected: false, player: 1, index: 1 },
  { isSelected: false, player: 1, index: 2 },
  { isSelected: false, player: 1, index: 3 },
  { isSelected: false, player: 1, index: 4 },
  { isSelected: false, player: 1, index: 5 },
  { isSelected: false, player: 1, index: 6 },
  { isSelected: false, player: 1, index: 7 },
  { isSelected: false, player: 1, index: 8 },
];

export default function App() {
  const [player, setPlayer] = useState<1 | 2>(1);
  const [cells, setCells] = useState<CellProps[]>(initalCellState);

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

  function setCellsInitalState() {
    setCells(initalCellState);
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

      <View style={styles.buttonsWrapper}>
        <Button text="Refresh" icon="refresh" onPress={setCellsInitalState} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d6d6",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#918f8f",
    marginTop: Constants.statusBarHeight + 48,
  },
  wrapper: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    backgroundColor: "#918f8f",

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  buttonsWrapper: {
    marginBottom: Dimensions.get("window").height * 0.12,
  },
});
