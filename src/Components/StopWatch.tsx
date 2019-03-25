import React from 'react'
import {Button, ProgressBar} from 'react-bootstrap'
import History from './History'
import {StopWatchState} from "../../types"
import {calculate, calculateLongestTime, renderInt, renderTime} from "./Utilities"
import Firebase from "../Services/Firebase"

const initialState: StopWatchState = {
    running: false,
    time: 0,
    lapTime: 0,
    lap: 1,
    longestTime: 10,
    history: []
}
type State = Readonly<typeof initialState>

class StopWatch extends React.Component<{}, State> {

    private timestamp: number = 0
    private lapstamp: number = 0
    private interval: number = 0
    readonly state: State = initialState
    private MaxReps: number = 10

    protected start = (): void => {
        if (this.state.time === 0 ){
            Firebase.newSet()
        }

        if (!this.timestamp) {
            this.timestamp = performance.now()
            this.lapstamp = performance.now()
        }
        this.setState({running: true})
        this.interval = window.setInterval(this.tick.bind(this), 41)
    }

    protected pause = (): void => {
        clearInterval(this.interval)
        this.timestamp = 0
        this.lapstamp = 0
        this.setState({running: false})
        Firebase.updateMeta({
            totalTime: this.state.time
        })
    }

    protected lap = (): void => {
        const newHistory = this.state.history.slice(0)
        const historyItem = {lap: this.state.lap, time: this.state.lapTime}
        this.lapstamp = performance.now()
        newHistory.push(historyItem)
        this.setState((state: StopWatchState) => (
            {
                lap: state.lap + 1,
                lapTime: 0,
                history: newHistory
            }
        ))
        Firebase.updateSet(newHistory)
        Firebase.updateMeta({
            longestTime: this.state.longestTime,
            laps: this.state.lap,
            totalTime: this.state.time
        })
    }

    private tick = (): void => {
        if (!this.state.running) return
        const currentTime = performance.now()
        const time = calculate(this.timestamp, currentTime, this.state.time)
        const lapTime = calculate(this.lapstamp, currentTime, this.state.lapTime)
        this.timestamp = currentTime
        this.lapstamp = currentTime
        const longestTime = calculateLongestTime(this.state.history, this.state.lapTime)
        this.setState((state: StopWatchState) => (
            {
                time,
                lapTime,
                longestTime,
            }
        ))
    }

    render() {
        let actionBtn
        let lapBtn

        if (this.state.running) {
            actionBtn = <Button size='sm' variant="outline-secondary" onClick={this.pause}> Pause </Button>
            lapBtn = <Button size='lg' onClick={this.lap}>Lap</Button>
        } else {
            actionBtn = <Button size='sm' variant="outline-secondary" onClick={this.start}> Start </Button>
        }

        return (
            <div>
                {actionBtn}
                <h1 className='text-center'>{renderTime(this.state.time)}</h1>
                <History historyList={this.state.history} longestTime={this.state.longestTime}></History>
                <div className='history mb-3'>
                    <div>#{this.state.lap}</div>
                    <ProgressBar now={renderInt(this.state.lapTime)}
                                 max={renderInt(this.state.longestTime)}
                                 label={renderTime(this.state.lapTime)}
                                 striped
                                 animated={false}
                                 variant="info"/>

                </div>
                {lapBtn}
            </div>

        )
    }
}

export default StopWatch
