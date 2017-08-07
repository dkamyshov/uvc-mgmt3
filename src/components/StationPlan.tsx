import * as React from 'react';

import combineClassNames from '../../helpers/combineClassNames';

import {quartersSeasons, planLabels} from './../labels';

class StationRecord extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {plan, updatePlanValue} = this.props;

        return <div className='uvc__station_plan'>
            <table className='plan_table'>
                <thead>
                    <tr>
                        {
                            planLabels.periods.map((label, i) => (
                                <th className={quartersSeasons[i]} key={i}>{label}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        plan.map((p, i) => (
                            <td key={i}>
                                <input className={`month-input ${quartersSeasons[i]}`}
                                       type='number'
                                       value={p}
                                       onChange={(evt) => updatePlanValue(i, Number(evt.target.value))}/>
                            </td>
                        ))
                    }
                </tbody>
            </table>
        </div>;
    }
}

export default StationRecord;