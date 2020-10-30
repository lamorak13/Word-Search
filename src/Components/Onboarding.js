import React, {useState} from 'react'
import OnboardingCallout from "./OnboardingCallout"

function Onboarding(props) {
    const {setSidebarActive, firstCalloutActive, setFirstCalloutActive} = props
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [active4, setActive4] = useState(false)

    return (
        <>
        <OnboardingCallout active={firstCalloutActive} setActive={setFirstCalloutActive} number={1} previous={null} next={setActive2} target="#help">
            <h2>This is a test to see if heroku works</h2>
            <p>Some sample Text</p>
        </OnboardingCallout>
        <OnboardingCallout active={active2} setActive={setActive2} number={2} previous={setFirstCalloutActive} next={setActive3} target="#grid">
        </OnboardingCallout>
        <OnboardingCallout active={active3} setActive={setActive3} number={3} previous={setActive2} next={setActive4} target="#sidebar" setSidebarActive={setSidebarActive}>
        </OnboardingCallout>
        <OnboardingCallout active={active4} setActive={setActive4} number={4} previous={setActive3} next={null} target="#grid">
        </OnboardingCallout>
        </>
    )
}

export default Onboarding
