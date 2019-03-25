export interface StopWatchState {
    running: boolean
    time: number
    lapTime: number
    lap: number
    longestTime: number
    history: HistoryItem[]
}

export interface HistoryItem {
    lap: number
    time: number
}


export interface IRepMeta {
    longestTime?: number
    laps?: number
    totalTime?: number
}
