import {number} from "prop-types"

export interface StopWatchState {
    running: boolean
    time: number
    lapTime: number
    lap: number
    longestTime: number
    history: IHistoryItem[]
}

export interface IHistoryItem {
    lap: number
    time: number
}

export interface ILapItem {
    meta: IRepMeta,
    results: {
        [number]: IHistoryItem
    }
}

export interface IRepMeta {
    date?: Object,
    longestTime?: number
    laps?: number
    totalTime?: number
}
