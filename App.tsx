import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Vibration, View } from "react-native";
import { Dimensions } from "react-native";
import Cell from "./src/components/Cell";
import Constants from "expo-constants";
import Button from "./src/components/Button";

type CellProps = {
  isSelected: boolean;
  player: 1 | 2 | undefined;
  index: number;
  isPartOfTheMatch: boolean;
};

const initalCellState: Array<CellProps> = [
  { isSelected: false, player: 1, index: 0, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 1, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 2, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 3, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 4, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 5, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 6, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 7, isPartOfTheMatch: false },
  { isSelected: false, player: 1, index: 8, isPartOfTheMatch: false },
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

const SHORT_VIBRATION_DURATION = 0.2 * 1000; // time of vibration x one second in ms

export default function App() {
  const [player, setPlayer] = useState<1 | 2>(1);
  const [gameHasWinner, setGameHasWinner] = useState(false);
  const [gameHasTie, setGameHasTie] = useState(false);
  const [cells, setCells] = useState<CellProps[]>(initalCellState);

  function handleCellSelected(index: number) {
    Vibration.vibrate(SHORT_VIBRATION_DURATION);

    if (cells[index].isSelected) return;
    setCells((oldState) =>
      oldState.map((cell) => {
        if (cell.index === index) {
          const updatedCell = {
            isSelected: true,
            player,
            index,
            isPartOfTheMatch: false,
          };
          setPlayer(player === 1 ? 2 : 1);
          return updatedCell;
        } else return cell;
      })
    );
  }

  useEffect(() => {
    if (!gameHasTie && !gameHasWinner) verifyIfGameHasAWinner();
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
            setCells((oldState) =>
              oldState.map((cell) => {
                if (match.indexOf(cell.index) !== -1) {
                  return {
                    isSelected: true,
                    player: cell.player,
                    index: cell.index,
                    isPartOfTheMatch: true,
                  };
                } else return cell;
              })
            );
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
    Vibration.vibrate(SHORT_VIBRATION_DURATION);
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
          <Text style={styles.winner}>{`Player '${
            player === 1 ? "o" : "x"
          }' is the winner!`}</Text>
        )}
        {gameHasTie && <Text style={styles.winner}>{`Game has a tie!`}</Text>}
        {!gameHasTie && !gameHasWinner && (
          <Text style={styles.winner}>{`Turn of player '${
            player === 1 ? "x" : "o"
          }'`}</Text>
        )}
      </View>

      <View style={styles.wrapper}>
        {cells.map((cell) => (
          <Cell
            isSelected={cell.isSelected}
            player={cell.player}
            index={cell.index}
            isPartOfTheMatch={cell.isPartOfTheMatch}
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
    backgroundColor: "#010106",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#bbb",
    marginTop: Constants.statusBarHeight + 48,
    textAlign: "center",
  },
  winner: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#bbb",
    marginTop: 8,
    textAlign: "center",
  },
  wrapper: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    backgroundColor: "#bbb",

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  buttonsWrapper: {
    marginBottom: Dimensions.get("window").height * 0.12,
  },
});
