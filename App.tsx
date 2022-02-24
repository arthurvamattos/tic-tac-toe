import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
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

const positionsMatchs = [
  [0, 3, 6],
  [0, 1, 2],
  [0, 4, 8],
  [1, 4, 7],
  [3, 4, 5],
  [2, 4, 6],
  [2, 5, 8],
  [6, 7, 8],
];

export default function App() {
  const [player, setPlayer] = useState<1 | 2>(1);
  const [gameHasWinner, setGameHasWinner] = useState(false);
  const [gameHasTie, setGameHasTie] = useState(false);
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

  useEffect(() => {
    verifyIfGameHasAWinner();
  }, [cells]);

  function verifyIfGameHasAWinner() {
    let hasWinner = false;
    if (cells.filter((cell) => cell.isSelected).length > 4) {
      positionsMatchs.forEach((match) => {
        if (
          cells[match[0]].isSelected &&
          cells[match[1]].isSelected &&
          cells[match[2]].isSelected
        ) {
          if (
            cells[match[0]].player === cells[match[1]].player &&
            cells[match[0]].player === cells[match[2]].player
          ) {
            setGameHasWinner(true);
            hasWinner = true;
            return;
          }
        }
      });
    }
    if (cells.filter((cell) => cell.isSelected).length === 9 && !hasWinner) {
      setGameHasTie(true);
    }
  }

  function setCellsInitalState() {
    setCells(initalCellState);
    setGameHasWinner(false);
    setGameHasTie(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={styles.title}>Tic Tac Toe</Text>
        {gameHasWinner && (
          <Text style={styles.winner}>{`Player ${player} is the winner!`}</Text>
        )}
        {gameHasTie && <Text style={styles.winner}>{`Game has a tie!`}</Text>}
      </View>

      <View style={styles.wrapper}>
        {cells.map((cell) => (
          <Cell
            isSelected={cell.isSelected}
            player={cell.player}
            index={cell.index}
            key={cell.index}
            disabled={gameHasWinner || gameHasTie}
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
    color: "#363636",
    marginTop: Constants.statusBarHeight + 48,
    textAlign: "center",
  },
  winner: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#363636",
    marginTop: 8,
    textAlign: "center",
  },
  wrapper: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    backgroundColor: "#363636",

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  buttonsWrapper: {
    marginBottom: Dimensions.get("window").height * 0.12,
  },
});
