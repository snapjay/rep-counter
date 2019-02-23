import React from 'react'
import {ProgressBar} from 'react-bootstrap'
import {HistoryItem} from "../../types"
import {renderTime, renderInt} from "./Utilities"

type Props = {
    historyList :HistoryItem[]
    longestTime: number
}

class History extends React.Component<Props> {

    render() {
        const history = this.props.historyList.map((item) =>
            <div className='history mb-1' key={item.lap}>
                <div>#{item.lap}</div>
                <ProgressBar
                    now={renderInt(item.time)}
                    max={renderInt(this.props.longestTime )}
                    label={renderTime(item.time)}
                    variant="success"
                    striped />
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
