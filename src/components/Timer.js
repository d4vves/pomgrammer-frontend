import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useSound from 'use-sound'
import Beep from '../utils/beep.mp3'

export default function Timer({id, setShowPoms, currentPoms, setCurrentPoms}) {
    const [play] = useSound(Beep)

    let [minutes, setMinutes] = useState(0)
    let [seconds, setSeconds] = useState(5)
    let [breakTime, setBreakTime] = useState(false)
    let [finished, setFinished] = useState(false)
    let [focus, setFocus] = useState('')
    let [startTimer, setStartTimer] = useState(false)

    const runTimer = () => {
        if (startTimer) {
            const pomInterval = setInterval(() => {
                if (seconds >= 0) {
                    setSeconds(seconds -= 1)
                }
                if (seconds < 0 && minutes > 0) {
                    setMinutes(minutes -= 1)
                    seconds = 59
                    setSeconds(59)
                }
                if (seconds < 0 && minutes === 0 && !breakTime) {
                    play()
                    setMinutes(0)
                    setSeconds(5)
                    setBreakTime(true)
                }
                if (seconds < 0 && minutes === 0 && breakTime) {
                    play()
                    clearInterval(pomInterval)
                    setFinished(true)
                }
            }, 1000)
            return () => {clearInterval(pomInterval)}
        }
    }

    useEffect(runTimer, [breakTime, startTimer])

    const handleFocus = (e) => {
        setFocus(e.target.value)
    }

    const addPom = (e) => {
        e.preventDefault()
        let newPom = {
            focus: focus
        }
        axios.post(`${process.env.REACT_APP_API}/poms/${id}`, newPom)
        .then(response => {
            if (response.status === 200) {
                setCurrentPoms([...currentPoms, newPom])
                setShowPoms(true)
            }
        })
    }

    const enableTimer = () => {
        setStartTimer(true)
    }

    return (
        <div className='timerContainer'>
            {
                !finished ? 
                    !breakTime ?
                        <div>
                            <h1>Let 'er rip!</h1>
                            <h1 className='timerText'>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                            <button onClick={enableTimer}>Start</button>
                        </div>
                    :
                        <div>
                            <h1>Take a break!</h1>
                            <h1 className='timerText'>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                        </div>
                :
                    <div>
                        <h1>Great job!</h1>
                        <form onSubmit={addPom} className='timerSubmit'>
                            <label htmlFor='focus'>What did you focus on? </label>
                            <input type='text' name='focus' id='focus' onChange={handleFocus} />
                            <input type='submit' value='add pom' />
                        </form>
                    </div>
            }
        </div>
    )
}