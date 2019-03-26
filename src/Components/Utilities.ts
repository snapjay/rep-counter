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

export function dateFormat(date: Date): string {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return  ('0' + date.getDate()).slice(-2) + ' ' +
        monthNames[(date.getMonth())] + ' - ' +
        // date.getFullYear() + '/' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2)

}