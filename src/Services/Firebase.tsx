import firebase from 'firebase'
import {IHistoryItem, ILapItem, IRepMeta,} from '../../types'

class Firebase {

    readonly LOG_REF = 'logs'
    readonly META_PATH = 'meta'
    readonly RESULTS_PATH = 'results'
    private Database: firebase.database.Database
    private Logs: firebase.database.Reference

    private CurrentSet: firebase.database.Reference

    constructor() {
        const config = {
            apiKey: 'AIzaSyBGUcA2c6pkVf5uHFm_XBxE54Bwf7yOiMw',
            authDomain: 'rep-timer.firebaseapp.com',
            databaseURL: 'https://rep-timer.firebaseio.com',
            projectId: 'rep-timer',
            storageBucket: 'rep-timer.appspot.com',
            messagingSenderId: '603081695200'
        }

        firebase.initializeApp(config)
        this.Database = firebase.database()
        this.Logs = this.Database.ref(this.LOG_REF)
    }

    protected getLogsRef() {
        return this.Logs
    }


    public onLastedUpdate(callback: (arg1: ILapItem) => void) {
        const getLast: firebase.database.Reference = this.Logs.limitToLast(1).ref
        getLast.on('value', (snapshot) => {
            const rsp =  snapshot.val()
            let val:ILapItem = {meta: {}, results:{}}
            if (rsp) {
                const val: ILapItem = rsp[Object.keys(rsp)[0]]
                console.log(val)
            }

            callback(val)
        })
        this.CurrentSet = getLast
    }

    public newSet() {
        const defaultMeta :IRepMeta = {
            date: firebase.database.ServerValue.TIMESTAMP,
            longestTime: 0,
            laps: 1,
            totalTime: 0,
        }
        this.CurrentSet = this.getLogsRef().push({meta: defaultMeta})
    }

    public updateSet(history: IHistoryItem[]) {
        this.CurrentSet.child(this.RESULTS_PATH).set(history)
    }

    public updateMeta(meta: IRepMeta) {
        this.CurrentSet.child(this.META_PATH).update(meta)
    }

}

export default new Firebase()
