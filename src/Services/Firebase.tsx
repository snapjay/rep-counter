import firebase from 'firebase'
import {HistoryItem, IRepMeta, } from '../../types'

class Firebase {

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
        this.Logs = this.Database.ref('logs')
    }

    protected getLogsRef() {
        return this.Logs
    }

    public newSet() {
        this.CurrentSet = this.getLogsRef().push()
        this.CurrentSet.child('meta').set({
            date: firebase.database.ServerValue.TIMESTAMP
        })
    }

    public updateSet(history: HistoryItem[]) {
        this.CurrentSet.child('results').set(history)
    }

    public updateMeta(meta: IRepMeta) {
        this.CurrentSet.child('meta').update(meta)
    }

}

export default new Firebase()
