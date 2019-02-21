export interface StopWatchState {
    running: boolean
    timestamp: number
    time: number
    lap: number
    lapTime: number
    longestTime: number
    history: HistoryItem[]
}

export interface HistoryItem {
    lap: number
    time: number
}
