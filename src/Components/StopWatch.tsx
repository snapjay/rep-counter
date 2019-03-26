import React from 'react'
import {Button, ProgressBar} from 'react-bootstrap'
import History from './History'
import {ILapItem, IResults, StopWatchState} from '../../types'
import {calculate, calculateLongestTime, renderInt, renderTime} from './Utilities'
import Firebase from "../Services/Firebase"

const initialState: StopWatchState = {
    running: false,
    time: 0,
    lapTime: 0,
    longestTime: 10,
    dbRow: {
        results: {},
        meta: {
            totalTime: 0
        }
    }
}
type State = Readonly<typeof initialState>

class StopWatch extends React.Component<{}, State> {

    private timestamp: number = 0
    private lapstamp: number = 0
    private interval: number = 0
    readonly state: State = initialState
    private MaxReps: number = 10

    constructor() {
        super(null)
        Firebase.onLastedUpdate((dbRow: ILapItem) => {
            this.setState((state: StopWatchState) => (
                {
                    time: dbRow.meta.totalTime,
                    dbRow
                }
            ))
        })
    }

    protected reset = () => {
        this.setState(initialState)
        Firebase.newSet()
    }

    protected start = (): void => {
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
        const currentLap = this.state.dbRow.meta.laps
        const newHistory:IResults = Object.assign({[currentLap ]: {lap: currentLap + 1, time: this.state.lapTime}}, this.state.dbRow.results)
        this.lapstamp = performance.now()
        this.setState((state: StopWatchState) => (
            {
                lapTime: 0,
            }
        ))
        Firebase.updateResults(newHistory)
        Firebase.updateMeta({
            longestTime: this.state.longestTime,
            laps: currentLap +1,
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
        const longestTime = calculateLongestTime(this.state.dbRow.results, this.state.lapTime)
        this.setState((state: StopWatchState) => (
            {
                time,
                lapTime,
                longestTime,
            }
        ))
    }

    render() {
        let actionBtn, lapBtn, resetBtn

        if (this.state.running) {
            actionBtn = <Button size='sm' variant="outline-secondary" onClick={this.pause}> Pause </Button>
            lapBtn = <Button size='lg' onClick={this.lap}>Lap</Button>
        } else {
            actionBtn = <Button size='sm' variant="outline-secondary" onClick={this.start}> Start </Button>
            resetBtn = <Button size='sm' variant="outline-warning" className='ml-2' onClick={this.reset}> Reset </Button>
        }

        return (
            <div>
                {actionBtn}
                {resetBtn}

                <h1 className='text-center'>{renderTime(this.state.time)}</h1>
                <History historyList={this.state.dbRow.results} longestTime={this.state.longestTime}></History>
                <div className='history mb-3'>
                    <div>#{this.state.dbRow.meta.laps + 1}</div>
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
