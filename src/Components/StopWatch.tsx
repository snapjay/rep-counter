import React from 'react'
import {Button, ProgressBar} from 'react-bootstrap'

export interface HistoryItem {
    lap: number
    time: number
}

export interface StopWatchState {
    running: boolean
    time: number
    lap: number
    lapTime: number
    longestTime: number
    history: HistoryItem[]
}

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
        const maxTime = this.calculateLongestTime()
        this.setState((state: StopWatchState) => (
            {
                time: state.time + 1,
                lapTime: state.lapTime + 1,
                longestTime: maxTime,
            }
        ))
    }

    private calculateLongestTime(): number {
        if (this.state.history.length === 0) {
            return this.state.lapTime + 1
        } else {
            const currentMax = Math.max(...this.state.history.map(a => a.time))
            if (currentMax < this.state.lapTime) {
                return this.state.lapTime + 1
            } else {
                return currentMax
            }

        }
    }

    private renderTime(time: number): string {
        return (time - (time %= 60)) / 60 + (9 < time ? ':' : ':0') + time
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

        const history = this.state.history.map((item) =>
            <div className='history mb-1' key={item.lap}>
                <div>#{item.lap}</div>
                <ProgressBar now={item.time} variant="success" max={this.state.longestTime} striped
                             label={this.renderTime(item.time)}/>
            </div>
        )

        return (
            <div>
                {actionBtn}
                <h1 className='text-center'>{this.renderTime(this.state.time)}</h1>

                {history}
                <div className='history mb-3'>
                    <div>#{this.state.lap}</div>
                    <ProgressBar now={this.state.lapTime} variant="warning" max={this.state.longestTime} striped animated
                                 label={this.renderTime(this.state.lapTime)}/>
                </div>
                {lapBtn}
            </div>

        )
    }
}

export default StopWatch
