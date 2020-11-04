import React, {useState} from 'react'
import OnboardingCallout from "./OnboardingCallout"

function Onboarding(props) {
    const {setSidebarActive, firstCalloutActive, setFirstCalloutActive} = props
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [active4, setActive4] = useState(false)
    const [active5, setActive5] = useState(false)
    const [active6, setActive6] = useState(false)
    const [active7, setActive7] = useState(false)
    const [active8, setActive8] = useState(false)
    const [active9, setActive9] = useState(false)

    return (
        <>
        <OnboardingCallout active={firstCalloutActive} setActive={setFirstCalloutActive} number={1} previous={null} next={setActive2} target="#grid">
            <h2>The Word Puzzle</h2>
            <p>This is the word puzzle. It consists of a grid of which each cell contains a character. Your goal is to find all of the searched words on the grid. You can mark them by clicking and dragging the mouse over the grid.</p>
        </OnboardingCallout>
        <OnboardingCallout active={active2} setActive={setActive2} number={2} previous={setFirstCalloutActive} next={setActive3} target="#searched-words" openNext={true} setSidebarActive={setSidebarActive}>
            <h2>The searched words</h2>
            <p>These are the words you are supposed to find on the grid. Once a word has been found, it will be marked as finished - both on the list and on the grid.</p>
        </OnboardingCallout>
        <OnboardingCallout active={active3} setActive={setActive3} number={3} previous={setActive2} next={setActive4} target="#sidebar" closePrev={true} setSidebarActive={setSidebarActive} >
            <h2>The Settings</h2>
            <p>By clicking on this button, you can set all your preferrences - for example the grid dimensions, the words you need to find, etc.</p>
        </OnboardingCallout>
        <OnboardingCallout active={active4} setActive={setActive4} number={4} previous={setActive3} next={setActive5} target="#grid-dimensions" >
            <h2>Grid Dimensions</h2>
            <p>Here you can specify the dimensions of the grid. If the grid would be too big for your screen size, you will get a notificaion.</p>
        </OnboardingCallout>
        <OnboardingCallout active={active5} setActive={setActive5} number={5} previous={setActive4} next={setActive6} target="#orientations" >
            <h2>Word Placement</h2>
            <p>This setting allows you to specify, in which direction the words can be placed. The default is horizontal and vertical.</p>
        </OnboardingCallout>
        <OnboardingCallout active={active6} setActive={setActive6} number={6} previous={setActive5} next={setActive7} target="#characters" >
            <h2>Filled characters</h2>
            <p>Once all the words have been placed on th grid, the remaining empty cells will be filled with these characters. Feel free to change them and take a look what the puzzle will look like</p>
        </OnboardingCallout>
        <OnboardingCallout active={active7} setActive={setActive7} number={7} previous={setActive6} next={setActive8} target="#word-list" closeNext={true} setSidebarActive={setSidebarActive}>
            <h2>Word list</h2>
            <p>Here you can add and delete the words you need to search. Just type a new word and press ENTER or click the + button to add the word. TO delete a word, click on the X next to the word in the word list.</p>
        </OnboardingCallout>
        <OnboardingCallout active={active8} setActive={setActive8} number={8} previous={setActive7} next={setActive9} target="#solve" openPrev={true} setSidebarActive={setSidebarActive}>
            <h2>Can't find 'em all?</h2>
            <p>If you are struggeling to find all words or you just want to take a look at the Word Puzzle Visualizer, you can click the "Solve" button. This will automatically start an algorithm that solves the puzzle for you.</p>
        </OnboardingCallout>
        <OnboardingCallout active={active9} setActive={setActive9} number={9} previous={setActive8} next={null} target="#grid">
            <h2>Have fun!</h2>
            <p>Now, it's time for you to solve some puzzles and test all the settings :D</p>
        </OnboardingCallout>
        </>
    )
}

export default Onboarding
