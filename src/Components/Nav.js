import React from 'react';
import {FontIcon, PrimaryButton} from "@fluentui/react"

function Nav(props) {
  const {solvePuzzle, wordFind, clearGrid, setSidebarActive, sidebarActive, setFirstCalloutActive } = props;

  return (
    <nav className='nav'>
      <PrimaryButton className='start' onClick={() => wordFind()}>
        Start Puzzle
      </PrimaryButton>
      <PrimaryButton className='solve' id="solve" onClick={() => solvePuzzle()}>
        Solve
      </PrimaryButton>
      <PrimaryButton className='clear' onClick={() => clearGrid()}>
        Clear Puzzle
      </PrimaryButton>
      <PrimaryButton className='button' id="help" onClick={()=> setFirstCalloutActive(true)}>
            <FontIcon iconName="Help" style={{fontSize: "16px"}}></FontIcon>
            Help
        </PrimaryButton>
      <PrimaryButton className='button' id="settings" onClick={()=> setSidebarActive(!sidebarActive)}> 
      <FontIcon iconName="Settings" style={{fontSize: "16px"}}></FontIcon>
      <p>Settings</p>
      </PrimaryButton>
    </nav>
  );
}

export default Nav;
