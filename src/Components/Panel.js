import React, {useState, useEffect} from 'react'
import {SpinButton, Checkbox, TextField, FontIcon, Panel} from "@fluentui/react"

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
          <FontIcon iconName="Cancel" onClick={()=>deleteWord(id)} style={{fontSize: "10px"}}></FontIcon>
        </li>
      ));

    return (
    <Panel 
    isOpen={sidebarActive} 
    hasCloseButton={true}
    isLightDismiss={false}
    isBlocking={false}
    onDismiss={()=> setSidebarActive(false)}
    >
        <h1 id="sidebar">Word Puzzle Settings</h1>
        <SpinButton
        id="grid-dimensions"
        label="Grid dimensions"
        value={size}
        onChange={(e) => onChangeUpdateGrid(e)}
        onIncrement={()=> {if(size<20) updateGrid(1)}}
        onDecrement={()=> {
            if(size>1) updateGrid(-1)}}
        />
    
    <h2 id="orientations">Allowed orientations</h2>
    <Checkbox label="horizontal" name="horizontal" checked={orientations.includes("horizontal")} onChange={orientationHandler}/>
    <Checkbox label="vertical" name="vertical" checked={orientations.includes("vertical")} onChange={orientationHandler}/>
    <Checkbox label="diagonal down" name="diagonalDown" checked={orientations.includes("diagonalDown")} onChange={orientationHandler}/>
    <Checkbox label="diagonal up" name="diagonalUp" checked={orientations.includes("diagonalUp")} onChange={orientationHandler}/>
    <Checkbox label="allow backwards placement" checked={backwards} onChange={()=> setBackwards(!backwards)} />
    <h2 id="characters">Allowed Characters</h2>
    <TextField value={possibleChars} onChange={(e)=> setPossibleChars(e.target.value)}></TextField>
    <h2 id="word-list">Current Words</h2>
    <ul className="word-list">
        {elements}
    </ul>
    <form onSubmit={(e)=> {e.preventDefault(); addWordHandler()}} className="form">
    <TextField name="addWord" value={addWord} onChange={(e)=>setAddWord(e.target.value.toUpperCase())} ></TextField>
    <FontIcon iconName="ToDoLogoOutline" onClick={()=> addWordHandler() } style={{fontSize: "30px", cursor: "pointer"}}></FontIcon>
    </form>
    </Panel>
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
        if((size + num) * 50 > window.innerWidth * 0.8) {
            alert("Your chosen grid dimensions are too big for your device screen. Pleasae choose a smaller number")
            return
        }
        setGrid( new Array(size + num).fill('').map(() => new Array(size  + num).fill('')))
        resetColor("finished")
        setSize(size + num)
    }

    function onChangeUpdateGrid(e) {
        let value = parseInt(e.target.value)
        if(!value || value < 1 || value > 20) return
        if(value * 50 > window.innerWidth * 0.8) {
            alert("Your chosen grid dimensions are too big for your device screen. Pleasae choose a smaller number")
            return
        }
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
