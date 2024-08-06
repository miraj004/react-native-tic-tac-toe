import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icons from './components/Icons';

const App = (): React.JSX.Element => {
  const [board, setBoard] = useState<string[][]>(() => []);
  const [winningCells, setWinningCells] = useState<number[][]>([]);

  const choices = ['cross', 'circle'];
  const [player, setPlayer] = useState<string>('');
  const [winner, setWinner] = useState<string>('');
  const [draw, setDraw] = useState(() => false);

  const updateBoard = (row: number, col: number, newValue: string) => {
    if (board[row][col] !== '' || winner.length > 0) {
      return;
    }
    const newBoard = [...board];
    newBoard[row][col] = newValue;
    setBoard(() => newBoard);
    checkWinner(newBoard);
    setPlayer(() => (player == choices[0] ? choices[1] : choices[0]));
  };

  const checkWinner = (board: string[][]) => {
    // Check rows
    for (let i = 0; i < board.length; i++) {
      if (
        board[i][0] !== '' &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        setWinner(() => board[i][0]);
        setWinningCells([
          [i, 0],
          [i, 1],
          [i, 2],
        ]);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < board.length; i++) {
      if (
        board[0][i] !== '' &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        setWinner(() => board[0][i]);
        setWinningCells(() => [
          [0, i],
          [1, i],
          [2, i],
        ]);
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      setWinner(() => board[0][0]);
      setWinningCells(() => [
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
      return;
    }

    if (
      board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      setWinner(() => board[0][2]);
      setWinningCells(() => [
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
      return;
    }

    if (board.flat().every(cell => cell !== '')) {
      setWinner(() => '');
      setDraw(() => true);
    }
  };

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setBoard(() => [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    const randomIndex = Math.floor(Math.random() * choices.length);
    setPlayer(() => choices[randomIndex]);
    setWinner(() => '');
    setDraw(() => false);
    setWinningCells(() => []);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {draw ? (
          <>
            <Text style={styles.headingText}>Draw</Text>
            <TouchableOpacity
            style={styles.resetButton}
              onPress={resetGame}>
              <Icons name="reset" />
            </TouchableOpacity>
          </>
        ) : winner.length > 0 ? (
          <>
            <Text style={styles.headingText}>
              {' '}
              <Icons name={winner} /> {' won!'}
            </Text>
            <TouchableOpacity onPress={resetGame}
            style={styles.resetButton}
            >
              <Icons name="reset" />
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.headingText}>
            {'Player '} <Icons name={player}></Icons>
            {'  turn'}
          </Text>
        )}
      </View>
      <View style={styles.mainContainer}>
        {board.map((row, rowIndex) =>
          row.map((column, columnIndex) => (
            <TouchableOpacity
              style={[
                styles.playerButton,
                winningCells.some(
                  ([winRow, winCol]) =>
                    winRow === rowIndex && winCol === columnIndex,
                ) && styles.winningCell,
              ]}
              key={columnIndex + ' ' + rowIndex}
              onPress={() => {
                updateBoard(rowIndex, columnIndex, player);
              }}>
              <Icons name={board[rowIndex][columnIndex]} />
            </TouchableOpacity>
          )),
        )}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  playerButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  winningCell: {
    backgroundColor: '#FEFBD8',
    elevation: 0,
    borderWidth: 2,
    borderColor: '#FFA38F'
  },
  resultContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 20,
  },
  resetButton: {
   marginVertical: 20
  },
  resetButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
