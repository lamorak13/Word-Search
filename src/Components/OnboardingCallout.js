import React, {useEffect} from 'react'
import {Callout, DefaultButton, PrimaryButton} from "@fluentui/react"

function OnboardingCallout(props) {
    const {setSidebarActive} = props
    const {active, setActive, previous, next, number, target} = props

    let circles = []

    for(let i=1; i<=4; i++) {
        circles.push(<div className={`circle ${i === number && "active"}`} key={i}></div>)
    }

    useEffect(() => {
        if(setSidebarActive) {
            if(active) setSidebarActive(true)
            else setSidebarActive(false)
        }
    }, [setSidebarActive, active])

    return (
        <> 
        {active && 
        <Callout
        className="callout"
        onDismiss={()=> setActive(false)}
        target={target}
        gapSpace={10}
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
            setActive(false)
            next(true)        
    }

    function previousStep() {
            setActive(false)
            previous(true)
    }
}

export default OnboardingCallout
