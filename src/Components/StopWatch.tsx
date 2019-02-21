import React from 'react'
import {Button, ProgressBar} from 'react-bootstrap'
import History from './History'
import {StopWatchState} from "../../types"
import {calculateLongestTime, renderTime} from "./Utilities"

const initialState: StopWatchState = {
    running: false,
    timestamp: 0,
    time: 0,
    lap: 1,
    lapTime: 0,
    longestTime: 10,
    history: []
}
type State = Readonly<typeof initialState>

class StopWatch extends React.Component<{}, State> {

    readonly state: State = initialState
    private MaxReps: number = 10
    private timerID: number = 0

    protected start = (): void => {
        this.setState({running: true, timestamp: performance.now()})
        requestAnimationFrame(this.tick.bind(this))
    }

    protected pause = (): void => {
        clearInterval(this.timerID)
        this.setState({running: false})
    }

    protected lap = (): void => {
        const newHistory = this.state.history.slice(0)
        const historyItem = {lap: this.state.lap, time: this.state.lapTime}
        newHistory.push(historyItem)
        this.setState((state: StopWatchState) => (
            {
                lap: state.lap + 1,
                lapTime: 0,
                history: newHistory
            }
        ))
    }

    private  calculate(timestamp: number) {
        const time = (timestamp - this.state.timestamp )
        this.setState({
            time
        })
    }

    private tick = (timestamp: number): void => {
        if (!this.state.running) return
        const longestTime = calculateLongestTime(this.state.history, this.state.lapTime)
        this.setState((state: StopWatchState) => (
            {
                timestamp,
                lapTime: state.lapTime + 1,
                longestTime,
            }
        ))

        requestAnimationFrame(this.tick.bind(this))
    }

    render() {
        let actionBtn
        let lapBtn

        if (this.state.running) {
            actionBtn = <Button size='sm'  variant="outline-secondary" onClick={this.pause}> Pause </Button>
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
                    <ProgressBar now={parseFloat((this.state.lapTime/ 60).toFixed(0))} variant="warning" max={parseFloat((this.state.longestTime/ 60).toFixed(0))} striped animated={false}
                                 label={renderTime(this.state.lapTime)}/>

                </div>
                {lapBtn}
            </div>

        )
    }
}

export default StopWatch
