import * as React from 'react';

import combineClassNames from '../../helpers/combineClassNames';

import {quartersSeasons, seasonsOfYear, monthsOfYear, stationLabels, recordLabels} from './../labels';

class StationRecord extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {monthly, monthlyTotal, quarters, offsets, plan, year, updateMonthValue, last} = this.props;

        return <div className='uvc__station_record'>
            <div className={combineClassNames('uvc__station_record__header', 'last', last)}>
                {year}
            </div>

            <table className='quarters_table'>
                <thead>
                    <tr>
                        {
                            stationLabels.periods.map((label, i) => (
                                <th key={i} className={combineClassNames(quartersSeasons[i], 'off-plan', (quarters[i] || 0) > (plan[i] || 0))}>{label}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        quarters.length ? (
                            <tr>
                                {
                                    quarters.map((q, i) => (
                                        <td key={i} className={combineClassNames(quartersSeasons[i], 'off-plan', (quarters[i] || 0) > (plan[i] || 0))}>{q}</td>
                                    ))
                                }

                                <td>
                                    {quarters.reduce(($, v) => $+v, 0)}
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td className='fall'>-</td>
                                <td className='winter'>-</td>
                                <td className='spring'>-</td>
                                <td className='summer'>-</td>
                                <td>-</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <table className='monthly_table'>
                <thead>
                    <tr>
                        <th>{recordLabels.months}</th>
                        <th>{recordLabels.hours}</th>
                        <th>{recordLabels.total}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        monthly.map((c, i) => (
                            c > -1 ? (
                                <tr className={seasonsOfYear[i]} key={i}>
                                    <td>{monthsOfYear[i]}</td>
                                    <td>
                                        <input className='month-input' type='number' onChange={(evt) => updateMonthValue(offsets[i], Number(evt.target.value))} value={c}/>
                                    </td>
                                    <td><div className='input_padder'>{monthlyTotal[i]}</div></td>
                                </tr>
                            ) : (
                                <tr key={i} className={seasonsOfYear[i]}>
                                    <td>{monthsOfYear[i]}</td>
                                    <td><div className='input_padder'>-</div></td>
                                    <td><div className='input_padder'>-</div></td>
                                </tr>
                            )
                        ))
                    }

                    <tr className='total_row'>
                        <td>{recordLabels.totalUpper}</td>
                        <td>
                            <div className='input_padder'>
                                {
                                    monthly.every(x => x > -1) ? (
                                        monthly.reduce(($, v) => $+v, 0)
                                    ) : (
                                        '-'
                                    )
                                }
                            </div>
                        </td>
                        <td>
                            <div className='input_padder'>
                                {monthly[11] > -1 ? monthlyTotal[11] : '-'}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}

export default StationRecord;