import {HistoryItem} from "../../types"

export const RESOLUTION: number = 10

export function renderTime(time: number): string {
    return (time - (time %= 60)) / 60 + (9 < time ? ':' : ':0') + time
}

export function calculateLongestTime(history: HistoryItem[], lapTime:number): number {
    if (history.length === 0) {
        return lapTime + 1
    } else {
        const currentMax = Math.max(...history.map(a => a.time))
        if (currentMax < lapTime) {
            return lapTime + 1
        } else {
            return currentMax
        }
    }
}
