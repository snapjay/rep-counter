import React from 'react'
import {Button, ProgressBar} from 'react-bootstrap'
import History from './History'
import {StopWatchState} from "../../types"
import {calculateLongestTime, renderTime, RESOLUTION} from "./Utilities"

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

    private timestamp: number= 0
    readonly state: State = initialState
    private timerID: number = 0
    private MaxReps: number = 10

    protected start = (): void => {
        this.timestamp = performance.now()
        this.setState({running: true })
        requestAnimationFrame(this.tick.bind(this))
    }

    protected pause = (): void => {
        clearInterval(this.timerID)
        this.setState({running: false, time: 0})
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

private tick = (timestamp: number): void => {
    if (!this.state.running) return
    const time = parseFloat(((timestamp - this.timestamp) / 1000).toFixed(2))
    const longestTime = calculateLongestTime(this.state.history, this.state.lapTime)
    this.setState((state: StopWatchState) => (
        {
            time,
            lapTime: state.lapTime + 1,
            longestTime,
        }
    ))

    requestAnimationFrame(this.tick.bind(this))
}

render()
{
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
            <h1 className='text-center'>{(this.state.time)}</h1>
            <History historyList={this.state.history} longestTime={this.state.longestTime}></History>
            <div className='history mb-3'>
                <div>#{this.state.lap}</div>
                <ProgressBar now={Math.floor(this.state.lapTime / RESOLUTION)}
                             max={Math.floor(this.state.longestTime / RESOLUTION)}
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
