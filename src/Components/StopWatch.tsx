import React from 'react'
import {Button, ProgressBar} from 'react-bootstrap'
import History from './History'
import {StopWatchState} from "../../types"
import {calculateLongestTime, renderTime} from "./Utilities"

const initialState: StopWatchState = {
    running: false,
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
        this.setState({running: true})
        this.timerID = window.setInterval(
            () => this.tick(),
            1000
        )
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
    private tick = (): void => {
        const maxTime = calculateLongestTime(this.state.history, this.state.lapTime)
        this.setState((state: StopWatchState) => (
            {
                time: state.time + 1,
                lapTime: state.lapTime + 1,
                longestTime: maxTime,
            }
        ))
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
                    <ProgressBar now={this.state.lapTime} variant="warning" max={this.state.longestTime} striped animated
                                 label={renderTime(this.state.lapTime)}/>
                </div>
                {lapBtn}
            </div>

        )
    }
}

export default StopWatch
