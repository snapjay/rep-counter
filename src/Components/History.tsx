import React from 'react'
import {ProgressBar} from 'react-bootstrap'
import {HistoryItem} from "../../types"
import {RESOLUTION, renderTime} from "./Utilities"

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
                    now={Math.floor(item.time / RESOLUTION)}
                    max={Math.floor(this.props.longestTime  /RESOLUTION)}
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
