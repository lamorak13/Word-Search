import React, { useState } from 'react';
import Grid from './Grid';
import Nav from './Nav';
// import Sidebar from "./Sidebar"
import Onboarding from "./Onboarding"
import Sidebar from "./Panel"


function Data() {
  const [gameEnded, setGameEnded] = useState(false)
  const [size, setSize] = useState(5);
  const [words, setWords] = useState(["TEST", "ABC"]);
  const [orientations, setOrientations] = useState(['horizontal', 'vertical']);
  const [backwards, setBackwards] = useState(false);
  const [possibleChars, setPossibleChars] = useState('ABCDEFGHIJKLOMNOPQRSTUVWXYZ');
  const [grid, setGrid] = useState(new Array(size).fill('').map(() => new Array(size).fill('')));
  const [sidebarActive, setSidebarActive] = useState(false)
  const [firstCalloutActive, setFirstCalloutActive] = useState(false)
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  return (
    <>
      <Nav solvePuzzle={solvePuzzle} clearGrid={clearGrid} wordFind={wordFind} setSidebarActive={setSidebarActive} sidebarActive={sidebarActive} setFirstCalloutActive={setFirstCalloutActive} />
      <Grid wordFind={wordFind} grid={grid} size={size} colorCurrentPoint={colorCurrentPoint} resetColor={resetColor} words={words} gameEnded={gameEnded} setGameEnded={setGameEnded} />
      <Sidebar sidebarActive={sidebarActive} setSidebarActive={setSidebarActive} size={size} setSize={setSize} setGrid={setGrid} backwards={backwards} setBackwards={setBackwards} orientations={orientations} setOrientations={setOrientations} possibleChars={possibleChars} setPossibleChars={setPossibleChars} words={words} setWords={setWords} deleteWord={deleteWord} resetColor={resetColor}></Sidebar>
      <Onboarding setSidebarActive={setSidebarActive} firstCalloutActive={firstCalloutActive} setFirstCalloutActive={setFirstCalloutActive}></Onboarding>
    </>
  );

  // main functions
  // these are used for creating the puzzle

  // starts the wordFind game
  // creates a proxy of the grid state and fills it with the given words
  // fills the rest of the empty points with random strings
  // sets the grid state to the poxy
  function wordFind() {
    setGameEnded(false) 
    clearGrid();
    const proxy = new Array(size).fill('').map(() => new Array(size).fill(''));
    setWords(words.sort((a, b) => b.length - a.length));

    for (let word of words) {
      if (backwards) {
        let directions = ["forwards", "backwards"]
        let direction = directions[Math.floor(Math.random() * directions.length)];
        if (direction === 'backwards') word = word.split('').reverse().join('');
      }
      

      const possiblePoints = getPossibleStartingPoints(word, orientations, proxy);
      placeWord(word, possiblePoints, proxy);
    }
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (proxy[i][j] === '') proxy[i][j] = getRandomChar();
      }
    }
    setGrid(proxy);
  }

  // gets all possible starting points of a word inside the grid given the current orientation
  // returns an array of all the possible points
  function getPossibleStartingPoints(word, orientations, proxy) {
    let wordLength = word.length;
    const possiblePoints = [];

    for (let o = 0; o < orientations.length; o++) {
      let orientation = orientations[o];

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (checkOrientation(orientation, i, j, wordLength, size)) {
            let pointer = 0;
            for (const char of word) {
              let next = nextPoint(orientation, i, j, pointer);
              if (proxy[next.i][next.j] !== char && proxy[next.i][next.j] !== '') break;
              pointer++;
            }
            if (pointer === wordLength) possiblePoints.push([i, j, orientation]);
          } else {
            let skip = skipToNext(orientation, i, j, size);
            i = skip.i;
            j = skip.j;
          }
        }
      }
    }
    return possiblePoints;
  }

  // places a word at a random possible position
  // the position contains the x and y coordinates as well as the orientation
  function placeWord(word, possiblePoints, proxy) {
    if (!possiblePoints.length) {
      alert('not all words could be placed');
      return;
    }

    let selected = possiblePoints[Math.floor(Math.random() * possiblePoints.length)];
    let pointer = 0;

    for (const char of word) {
      let next = nextPoint(selected[2], selected[0], selected[1], pointer);
      proxy[next.i][next.j] = char;
      pointer++;
    }
    return proxy;
  }

  //checks, if a word could possibly be placed on the grid, starting with the current point
  // returns true if it's possible, returns false if not
  function checkOrientation(orientation, i, j, wordLength, size) {
    switch (orientation) {
      case 'horizontal':
        return j + wordLength <= size ? true : false;

      case 'vertical':
        return i + wordLength <= size ? true : false;

      case 'diagonalDown':
        return i + wordLength <= size && j + wordLength <= size ? true : false;

      case 'diagonalUp':
        return i - wordLength >= -1 && j + wordLength <= size ? true : false;
      default:
        return;
    }
  }

  // a function that returns the next point given the current position and orientation
  function nextPoint(orientation, i, j, pointer) {
    switch (orientation) {
      case 'horizontal':
        return { i, j: j + pointer, orientation };

      case 'vertical':
        return { i: i + pointer, j, orientation };

      case 'diagonalDown':
        return { i: i + pointer, j: j + pointer, orientation };

      case 'diagonalUp':
        return { i: i - pointer, j: j + pointer, orientation };
      default:
        return;
    }
  }

  // skips to the next possible point given the current orientation
  function skipToNext(orientation, i, j, size) {
    switch (orientation) {
      case 'horizontal':
        return { i: i + 1, j: i + 1 >= size ? Infinity : -1 };

      case 'vertical':
        return { i: Infinity, j: Infinity };

      case 'diagonalDown':
        return { i: i + 1, j: i + 1 >= size ? Infinity : -1 };

      case 'diagonalUp':
        return { i: i + 1, j: i + 1 >= size ? Infinity : -1 };
      default:
        return;
    }
  }

  // helper functions
  // clear the gird
  // used when the clear button is clicked
  function clearGrid() {
    setGrid(new Array(size).fill('').map(() => new Array(size).fill('')));
    resetColor('finished');
    let underlined = document.getElementsByClassName("search-word")

    for (const li of underlined) {
      li.style.textDecoration = "none"
    }
  }

  // delete a word based on its ID
  // used when the delete button of a word is clicked
  function deleteWord(id) {
    setWords(words.filter((word, index) => index !== id));
  }

  // get a random char
  // this function is used to fill the remaining fields that don't contain a word
  function getRandomChar() {
    return possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  // Feature: Word Puzzle Solver
  // This algorithm solves the puzzle in case the user gets stuck
  async function solvePuzzle() {
    if (grid[0][0] === "") return
    for (const word of words) {
      loop: for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          resetColor('search');
          await colorCurrentPoint(i, j, 'current', 200);
          if (await checkForWord(word, i, j)) break loop;
        }
      }
    }
    resetColor('current');
    resetColor('search');
  }

  async function checkForWord(word, i, j) {
    if (grid[i][j] === word[0]) {
    await colorCurrentPoint(i, j, 'search', 100);

    let pointer = 1;
    let checked = [[i, j]];
    const stack = getNeighbours(i, j, word);

    while (stack.length) {
      const current = stack.pop();

      if (grid[current.i][current.j] === word[pointer]) {
        checked.push([current.i, current.j]);
        await colorCurrentPoint(current.i, current.j, 'search', 100);
        if (pointer === word.length - 1) {
          for (const point of checked) {
            await colorCurrentPoint(point[0], point[1], 'finished', 0);
          }
          document.getElementById(word).style.textDecoration = "line-through"
          return true;
        }

        let test = nextPoint(current.orientation, current.i, current.j, 1);
        if (test.i >= 0 && test.i < size && test.j >= 0 && test.j < size) stack.push(test);
        pointer++;
      } else {
        checked = [[i, j]];
        pointer = 1;
      }
    }} 

    if(grid[i][j] === word[word.length -1]) {
      await colorCurrentPoint(i, j, 'search', 100);

    let pointer = word.length -2;
    let checked = [[i, j]];
    const stack = getNeighbours(i, j, word);

    while (stack.length) {
      const current = stack.pop();

      if (grid[current.i][current.j] === word[pointer]) {
        checked.push([current.i, current.j]);
        await colorCurrentPoint(current.i, current.j, 'search', 100);
        if (pointer === 0) {
          for (const point of checked) {
            await colorCurrentPoint(point[0], point[1], 'finished', 0);
          }
          document.getElementById(word).style.textDecoration = "line-through"
          return true;
        }

        let test = nextPoint(current.orientation, current.i, current.j, 1);
        if (test.i >= 0 && test.i < size && test.j >= 0 && test.j < size) stack.push(test);
        pointer--;
      } else {
        checked = [[i, j]];
        pointer = word.length-2;
      }
    }
    }
    return false;
  }

  function getNeighbours(i, j, word) {
    let neighbours = [];
    for (const orientation of orientations) {
      const test = nextPoint(orientation, i, j, 1);

      if (test.i >= 0 && test.i < size && test.j >= 0 && test.j < size) neighbours.push(test);
    }
    return neighbours;
  }

  async function colorCurrentPoint(i, j, className, ms) {
    if (className === 'current') {
      let current = document.getElementsByClassName(className)[0];
      if (current) current.classList.remove(className);
      let points = document.getElementsByClassName('search');
      for (const point of points) {
        point.classList.remove('search');
      }
    }
    document.getElementById(i.toString() + j).classList.add(className);
    await delay(ms);
  }

  function resetColor(classname) {
    let points = document.getElementsByClassName(classname);

    while (points.length) {
      points[0].classList.remove(classname);
    }
  }
}

export default Data;
