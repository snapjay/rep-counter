import app from 'firebase/app'
import 'firebase/database'
import 'firebase/database/Database'

const config = {
    apiKey: "AIzaSyBGUcA2c6pkVf5uHFm_XBxE54Bwf7yOiMw",
    authDomain: "rep-timer.firebaseapp.com",
    databaseURL: "https://rep-timer.firebaseio.com",
    projectId: "rep-timer",
    storageBucket: "rep-timer.appspot.com",
    messagingSenderId: "603081695200"
}

class Firebase {
    private db: firebase.database.Database = null
    private ref: firebase.database.Reference = null

    constructor() {
        if (!app.apps.length) {
            app.initializeApp(config);
            this.db = app.database();
            this.ref = this.db.ref('/reps')
        }
    }

    public addRep = (set: number, time: number) => {
        this.ref.push({set, time})
    }
}

export default Firebase;
