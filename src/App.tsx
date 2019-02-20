import React, {Component} from 'react';
import './App.css';
import StopWatch from './Components/StopWatch'

class App extends Component {
    render() {
        return (
            <div className="App">
                    <h5>Rep Timer</h5>
                    <StopWatch/>
                <small className='mt-4'>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></small>
            </div>
        )
    }
}

export default App;
