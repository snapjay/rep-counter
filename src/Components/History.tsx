import React from 'react'
import {ProgressBar} from 'react-bootstrap'
import {IHistoryItem, IResults} from "../../types"
import {renderTime, renderInt} from "./Utilities"
import {number} from "prop-types"
import {debug} from "util"

type Props = {
    historyList: IResults,
    longestTime: number
}

class History extends React.Component<Props> {

    render() {
        const list = this.props.historyList
        if (!list || !Object.keys(list).length) {
            return (
                <div/>
            )
        } else {

            const history = Object.keys(list).map((key: string, index) => {
                return (
                     <div className='history mb-1' key={list[key].lap}>
                         <div>#{list[key].lap}</div>
                        <ProgressBar
                            now={renderInt(list[key].time)}
                            max={renderInt(this.props.longestTime)}
                            label={renderTime(list[key].time)}
                            variant="success"
                            striped/>
                    </div>
                )
            })

            return (
                <div>
                    {history}
                </div>

            )
        }
    }
}

export default History
