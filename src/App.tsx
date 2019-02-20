import React, {Component} from 'react';
import './App.css';
import StopWatch from './Components/StopWatch'

class App extends Component {
    render() {
        return (
            <div className="App">
                    <h5>Rep Timer</h5>
                    <StopWatch/>
            </div>
        )
    }
}

export default App;
