import * as React from 'react';

import StationRecord from '../components/StationRecord';

const pad8 = [-1,-1,-1,-1,-1,-1,-1,-1];
const pad4 = [-1,-1,-1,-1,-1,-1,-1,-1];

class StationRecords extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {records, plan, initialEntry, initialOffset, updateMonthValue} = this.props;

        const entriesCount = records.length;

        let monthly = [...records];
        let monthlyTotal = [];
        let acc = initialEntry;
        for(let i = 0; i < entriesCount; ++i) {
            acc += monthly[i];
            monthlyTotal.push(acc);
        }
        let quarters = [];
        for(let i = 0; i < entriesCount/12; ++i) {
            const year = monthly.slice(i*12, i*12+12);
            quarters.push([
                year.slice(0, 3).reduce(($, v) => $+v, 0),
                year.slice(3, 6).reduce(($, v) => $+v, 0),
                year.slice(6, 9).reduce(($, v) => $+v, 0),
                year.slice(9, 12).reduce(($, v) => $+v, 0)
            ]);
        }

        monthly = [...pad8, ...monthly, ...pad4];
        monthlyTotal = [...pad8, ...monthlyTotal, ...pad4];

        let slices = [];

        for(let i = 0; i < entriesCount/12+1; ++i) {
            slices.push({
                quarters: quarters[i] || [],
                monthly: monthly.slice(i*12, i*12+12),
                offsets: Array.apply(null, Array(12)).map((c, j) => i*12 - 8 + j),
                monthlyTotal: monthlyTotal.slice(i*12, i*12+12),
                plan: plan,
                year: initialOffset+i
            });
        }

        return <div className='uvc__station_records'>
            {
                slices.map((slice, i) => (
                    <StationRecord key={i}
                                   monthly={slice.monthly}
                                   monthlyTotal={slice.monthlyTotal}
                                   quarters={slice.quarters}
                                   offsets={slice.offsets}
                                   plan={slice.plan}
                                   year={slice.year}
                                   updateMonthValue={updateMonthValue}
                                   last={i == slices.length-1}
                                   />
                ))
            }
        </div>;
    }
}

export default StationRecords;