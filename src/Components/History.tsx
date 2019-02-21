import React from 'react'
import {ProgressBar} from 'react-bootstrap'
import {HistoryItem} from "../../types"
import {renderTime} from "./Utilities"

type Props = {
    historyList :HistoryItem[]
    longestTime: number
}

class History extends React.Component<Props> {

    render() {
        const history = this.props.historyList.map((item) =>
            <div className='history mb-1' key={item.lap}>
                <div>#{item.lap}</div>
                <ProgressBar now={item.time} variant="success" max={this.props.longestTime} striped
                             label={renderTime(item.time)}/>
            </div>
        )

        return (
            <div>
                {history}
            </div>

        )
    }
}

export default History
