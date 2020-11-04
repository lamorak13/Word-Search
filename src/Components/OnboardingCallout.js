import React from 'react'
import {Callout, DefaultButton, DirectionalHint, PrimaryButton} from "@fluentui/react"

function OnboardingCallout(props) {
    const {active, setActive, previous, next, number, target, openNext, openPrev, closeNext, closePrev, setSidebarActive} = props

    let circles = []

    for(let i=1; i<=9; i++) {
        circles.push(<div className={`circle ${i === number && "active"}`} key={i}></div>)
    }


    return (
        <> 
        {active && 
        <Callout
        className="callout"
        onDismiss={()=> setActive(false)}
        target={target}
        gapSpace={10}
        calloutWidth={window.innerWidth -50}
        calloutMaxWidth={500}
        directionalHint={DirectionalHint.topCenter}
        > 
            {props.children}

            <DefaultButton onClick={()=> previousStep()} className="previous" disabled={previous ? false : true}>
                Back
            </DefaultButton>

            {next ? 
            <PrimaryButton onClick={()=> nextStep()} className="next">
                Next
            </PrimaryButton> : 
            <PrimaryButton onClick={()=> setActive(false)} clasName="next">
                Finish
            </PrimaryButton>
            }
            
            
            <div className="circle-container">
                {circles}
            </div>
    
        </Callout>}
        </>
    )

    function nextStep() {
        if(openNext) {setSidebarActive(true)}
        else if(closeNext) setSidebarActive(false)
        setActive(false)
         next(true)        
    }

    function previousStep() {
        if(openPrev) {setSidebarActive(true)}
        else if(closePrev) setSidebarActive(false)
        setActive(false)
        previous(true)
    }
}

export default OnboardingCallout
