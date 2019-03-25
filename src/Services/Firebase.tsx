import firebase from 'firebase'
import {HistoryItem} from '../../types'

class Firebase {

    private Database: firebase.database.Database
    private Logs: firebase.database.Reference

    private CurrentSet : firebase.database.Reference

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
    }

    public updateSet(history: HistoryItem[]) {
        this.CurrentSet.set(history)
    }

    // onStatusUpdate(callback) {
    //     this.Logs.limitToLast(1).orderByChild("type").equalTo(LOG_TYPES.STATUS_CHANGE).on('value', (snapshot) => {
    //         let rsp = snapshot.val()
    //         let status = 'UNKNOWN'
    //         if (rsp) {
    //             status = rsp[Object.keys(rsp)[0]].value
    //         }
    //         callback(status)
    //     })
    // }
    //
    // onLogUpdate(callback, filter = 'ALL', count = 50) {
    //     // eslint-disable-next-line
    //     let resource = this.Logs.limitToLast(count)
    //     if (filter !== 'ALL') {
    //         resource = resource.orderByChild("type").equalTo(filter)
    //     }
    //     resource = resource.on('value', (snapshot) => {
    //         let build = []
    //         let rsp = snapshot.val()
    //         if (rsp) {
    //             Object.keys(rsp).map((key, index) => build.unshift(rsp[key]))
    //         }
    //         callback(build)
    //     })
    // }
}

export default new Firebase()
