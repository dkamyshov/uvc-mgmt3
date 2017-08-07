import * as React from 'react';

import {reportLabels} from './../labels';

const stationRow = (station, year) => {
    const recordOffset = (year - station.initialOffset) * 12;

    if(recordOffset > station.records.length - 12) {
        return <tr>
            <td>{station.name}</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
        </tr>;
    } else {
        let monthlyTotal = [],
            acc = station.initialEntry;

        for(let i = 0; i <= station.records.length; ++i) {
            acc += station.records[i];
            monthlyTotal.push(acc);
        }

        const periodStart = recordOffset > 0 ? monthlyTotal[recordOffset-1] : station.initialEntry;
        const periodEnd = monthlyTotal[recordOffset + 11];
        const monthly = station.records.slice(recordOffset, recordOffset + 12);
        const yearly = monthly.reduce(($, v) => $+v, 0);
        const quarters = [
            monthly.slice(0, 3).reduce(($, v) => $+v, 0),
            monthly.slice(3, 6).reduce(($, v) => $+v, 0),
            monthly.slice(6, 9).reduce(($, v) => $+v, 0),
            monthly.slice(9, 12).reduce(($, v) => $+v, 0)
        ];

        const plan = station.plan;

        return <tr className={quarters.every((x, i) => x <= plan[i]) ? '' : 'off-plan'}>
            <td>{station.name}</td>
            <td>{periodStart}</td>
            <td>{quarters[0]} [{plan[0]}]</td>
            <td>{quarters[1]} [{plan[1]}]</td>
            <td>{quarters[2]} [{plan[2]}]</td>
            <td>{quarters[3]} [{plan[3]}]</td>
            <td>{yearly}</td>
            <td>{periodEnd}</td>
        </tr>;
    }
}

class Stats extends React.Component<any, any> {
    constructor(props) {
        super(props);

        let minYear = 9999, maxYear = 0;

        for(let i in this.props.stations) {
            if(!this.props.stations.hasOwnProperty(i)) continue;

            const station = this.props.stations[i];

            let min = station.initialOffset;
            let max = station.initialOffset + station.records.length/12 - 1;

            minYear = Math.min(min, minYear);
            maxYear = Math.max(max, maxYear);
        }

        let yearsAvailable = [];

        for(let i = minYear; i <= maxYear; ++i) {
            yearsAvailable.push(i);
        }

        this.state = {
            year: -1,
            options: yearsAvailable
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(y) {
        this.setState({
            year: y
        });
    }

    render() {
        const {stations} = this.props;
        const {year} = this.state;

        const control = <div>
            {reportLabels.selectYear}: <select onChange={(evt) => this.handleChange(Number(evt.target.value))} value={this.state.year}>
                <option value={-1}>---</option>

                {
                    this.state.options.map(o => (
                        <option value={o}>{o}</option>
                    ))
                }
            </select>
        </div>;

        const tableHeader = <tr>
            <th>{reportLabels.name}</th>
            <th>{reportLabels.beginning}</th>
            <th>{reportLabels.q1}</th>
            <th>{reportLabels.q2}</th>
            <th>{reportLabels.q3}</th>
            <th>{reportLabels.q4}</th>
            <th>{reportLabels.year}</th>
            <th>{reportLabels.ending}</th>
        </tr>;

        let tableElements = [];

        if(year > -1) {
            for(let i = 0; i < stations.length; ++i) {
                if(i > 0 && i % 10 == 0) {
                    tableElements.push(tableHeader);
                }

                tableElements.push(stationRow(stations[i], year));
            }
        }

        return <div>
            <div className='content_header'>
                {reportLabels.title}
            </div>

            {control}

            { year > -1 ? 
                <table className='stats_table'>
                    <thead>
                        {tableHeader}
                    </thead>

                    <tbody>
                        {
                            tableElements.map(row => (
                                row
                            ))
                        }
                    </tbody>
                </table> : ''
            }
        </div>;
    }
}

export default Stats;