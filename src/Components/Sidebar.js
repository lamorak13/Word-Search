import React, {useState, useEffect} from 'react'
import {SpinButton, Checkbox, TextField, FontIcon} from "@fluentui/react"

function Sidebar(props) {
    const {size, setSize, sidebarActive, setSidebarActive, setGrid, backwards, setBackwards, orientations, setOrientations, possibleChars, setPossibleChars, words, setWords, deleteWord, resetColor} = props
    let [addWord, setAddWord] = useState("")

   
    useEffect(() => {
        window.addEventListener("keydown", closeOnEsc)

        return () => {
            window.removeEventListener("keydown", closeOnEsc)
        }
    })

    

    const elements = words.map((el, id) => (
        <li className='word-list__item' key={id}>
          {el}
          <FontIcon iconName="ErrorBadge" onClick={()=>deleteWord(id)} style={{fontSize: "14px"}}></FontIcon>
        </li>
      ));

    return (
    <div className={sidebarActive ? "sidebar active": "sidebar"}>
        <h1 id="sidebar">Word Puzzle Settings</h1>
        <FontIcon iconName="ChromeClose" onClick={()=> setSidebarActive(!sidebarActive)} className="close-btn" />
    <SpinButton
    label="Grid dimensions"
      value={size}
      onChange={(e) => onChangeUpdateGrid(e)}
      onIncrement={()=> {if(size<20) updateGrid(1)}}
      onDecrement={()=> {
          if(size>1) updateGrid(-1)}}
    />
    
    <h2>Allowed orientations</h2>
    <Checkbox label="horizontal" name="horizontal" checked={orientations.includes("horizontal")} onChange={orientationHandler}/>
    <Checkbox label="vertical" name="vertical" checked={orientations.includes("vertical")} onChange={orientationHandler}/>
    <Checkbox label="diagonal down" name="diagonalDown" checked={orientations.includes("diagonalDown")} onChange={orientationHandler}/>
    <Checkbox label="diagonal up" name="diagonalUp" checked={orientations.includes("diagonalUp")} onChange={orientationHandler}/>
    <Checkbox label="allow backwards placement" checked={backwards} onChange={()=> setBackwards(!backwards)} />
    <h2>Allowed Characters</h2>
    <TextField value={possibleChars} onChange={(e)=> setPossibleChars(e.target.value)}></TextField>
    <h2>Current Words</h2>
    <ul className="word-list">
        {elements}
    </ul>
    <form onSubmit={(e)=> {e.preventDefault(); addWordHandler()}} className="form">
    <TextField name="addWord" value={addWord} onChange={(e)=>setAddWord(e.target.value.toUpperCase())} ></TextField>
    <FontIcon iconName="BoxAdditionSolid" onClick={()=> addWordHandler() } style={{fontSize: "30px", cursor: "pointer"}}></FontIcon>
    </form>
    </div>
    )

    function orientationHandler(e) {
        let name = e.target.name
        if(!orientations.includes(name)){
            setOrientations([...orientations, name])
        } else {
            setOrientations(orientations.filter(el => (el !== name)))
        }
    }

    function addWordHandler() {
        if(addWord === "") return
        setWords([...words, addWord])
        setAddWord("")
    }

    function updateGrid(num) {
        setGrid( new Array(size + num).fill('').map(() => new Array(size  + num).fill('')))
        resetColor("finished")
        setSize(size + num)
    }

    function onChangeUpdateGrid(e) {
        let value = parseInt(e.target.value)
        if(!value || value < 1 || value > 20) return
        setGrid(new Array(value).fill("").map(()=> new Array(value).fill("")))
        resetColor("finished")
        setSize(value)
    }

    function closeOnEsc(e) {
        if(e.which === 27) {
            setSidebarActive(false)
        }
    }

}

export default Sidebar
