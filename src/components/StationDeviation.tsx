import * as React from 'react';

import combineClassNames from '../../helpers/combineClassNames';

import {deviationLabels, seasons, months} from './../labels';

class StationDeviation extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {deviation, updateDeviationValue} = this.props;

        return <div className='uvc__station_plan'>
            <table className='deviation_table'>
                <thead>
                    <tr>
                        <th>{deviationLabels.month}</th>
                        <th>{deviationLabels.value}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deviation.map((dv, i) => (
                            <tr key={i} className={seasons[i]}>
                                <td>
                                    {months[i]}
                                </td>
                                <td>
                                    <input className='month-input'
                                        type='number'
                                        value={dv}
                                        onChange={(evt) => updateDeviationValue(i, Number(evt.target.value))}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>;
    }
}

export default StationDeviation;