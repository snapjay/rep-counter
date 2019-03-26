import {IHistoryItem, IResults} from "../../types"

export const RESOLUTION: number = 10

export function renderTime(time: number): string {
    let n = (time / 1000).toFixed(2)
    const parsed: string[] = n.split('.')
    let seconds: number = parseInt(parsed[0])
    return ((seconds - (seconds %= 60)) / 60 + (9 < seconds ? ':' : ':0') + seconds) + `:${parsed[1]}`
}

export function renderInt(time: number): number {
    return parseFloat(((time / 1000) / RESOLUTION).toFixed(2))
}

export function calculate(timestamp: number, currentTime:number, time: number): number {
    const diff = currentTime - timestamp
    return time += diff
}


export function calculateLongestTime(history: IResults, lapTime: number): number {
    if (!history) return 0
    if (Object.values(history).length === 0) {
        return lapTime + 1
    } else {
        const currentMax = Math.max(...Object.values(history).map(a => a.time))
        if (currentMax < lapTime) {
            return lapTime + 1
        } else {
            return currentMax
        }
    }
}
