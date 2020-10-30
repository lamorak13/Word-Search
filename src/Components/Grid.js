import React, {useState} from 'react';
import {PrimaryButton} from "@fluentui/react"
import finished from "../img/finished.svg"

function Grid(props) {
  const {wordFind, size, grid, colorCurrentPoint, resetColor, words, gameEnded, setGameEnded } = props
  const [active, setActive] = useState(false)
  const [currentSearch, setCurrentSearch] = useState([])

  let pointer = -1;
  const elements = grid.map((row, index) => {
    pointer++;
    return row.map((el, id) => (
      <div className='grid__cell' key={id} id={pointer.toString() + id}  onMouseOver={ ()=>{if(active) addToCurrentSearch(index, id, "search", 200)}} onMouseDown={()=>addToCurrentSearch(index, id, "search", 200)}>
        {el}
      </div>
    ));
  });

  const wordsElements = words.map((el, id) => <li id={el} className="search-word" key={id} >{el}</li>)

  return (
    <div className ={`grid-container ${gameEnded ? "column" : ""}`} >
      {gameEnded ? 
      <>
      <h1>You did it!</h1>
      <img className="finished" src={finished} alt="finished"/>
      <PrimaryButton onClick={()=> wordFind()}>Start new</PrimaryButton>
      </>

       :  
       <>
       <div
        id='grid'
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${size}, 50px)`,
          gridTemplateRows: `repeat(${size}, 50px)`,
          maxWidth: `calc(${size} * 50px)`
        }}
        onMouseDown={()=> setActive(true)}
        onMouseUp={()=> endCurrentSearch()}
        onMouseLeave={()=> endCurrentSearch()}
        >
        {elements}
      </div>
      <ul className="words-list">
        {wordsElements}
      </ul>
      </>
      }
      
    </div>
  );

  function addToCurrentSearch(i, j, className, ms) {
    colorCurrentPoint(i, j, className, ms)
    setCurrentSearch([...currentSearch, [i,j, grid[i][j]]])
  }

  function endCurrentSearch(){
    setActive(false)
    resetColor("search")
    const currentSearchResult = currentSearch.reduce(function(sum, value) { return sum + value[2]}, "")
    const currentSearchResultReversed = currentSearch.reduce(function(sum, value) {return value[2] + sum}, "")
    for (let word of words) {
     if(word === currentSearchResult){ 
       currentSearch.map((el, id) => colorCurrentPoint(el[0], el[1], "finished", 0))
       document.getElementById(currentSearchResult).style.textDecoration = "line-through"
       break
      } 
      if(word === currentSearchResultReversed) {
        currentSearch.map((el, id) => colorCurrentPoint(el[0], el[1], "finished", 0))
       document.getElementById(currentSearchResultReversed).style.textDecoration = "line-through"
       break
      }
    }
    setCurrentSearch([])
    let searchedWords = document.getElementsByClassName("search-word")
    for (const li of searchedWords) {
      if(li.style.textDecoration !== "line-through") return
    }
    setGameEnded(true)
  }

}

export default Grid;
