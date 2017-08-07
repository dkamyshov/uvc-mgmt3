import * as React from 'react';

import StationRecords   from './../components/StationRecords';
import StationPlan      from './../components/StationPlan';
import StationDeviation from './../components/StationDeviation';

import {stationLabels} from './../labels';

class Station extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            updated: false,
            info: props.data,
            plan: [...props.data.plan],
            records: [...props.data.records],
            deviation: [...props.data.deviation]
        };

        this.liftState = this.liftState.bind(this);
        this.updateNestedValue = this.updateNestedValue.bind(this);
        this.restoreInitialState = this.restoreInitialState.bind(this);
        this.addNewYear = this.addNewYear.bind(this);
        this.removeLastYear = this.removeLastYear.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            updated: false,
            info: props.data,
            plan: [...props.data.plan],
            records: [...props.data.records],
            deviation: [...props.data.deviation]
        });
    }

    restoreInitialState() {
        this.props.notifyChanges(false);

        this.setState({
            updated: false,
            plan: [...this.state.info.plan],
            records: [...this.state.info.records],
            deviation: [...this.state.info.deviation]
        });
    }

    updateNestedValue(name, offset, value) {
        const values = this.state[name];

        if(value > -1) {
            this.props.notifyChanges();
            this.setState({
                updated: true,
                [name]: [
                    ...values.slice(0, offset),
                    value,
                    ...values.slice(offset+1)
                ]
            });
        }
    }

    liftState() {
        this.props.updateStation({
            ...this.props.data,

            records: this.state.records,
            plan: this.state.plan,
            deviation: this.state.deviation
        });

        this.setState({
            updated: false
        });
    }

    addNewYear() {
        const {records, deviation} = this.state;

        const ly = records.slice(records.length - 12);

        const ny = ly.map((c, i) => {
            const nv = c + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random()*(deviation[i]+1));
            return nv < 0 ? 0 : nv;
        });

        this.props.notifyChanges();

        this.setState({
            updated: true,
            records: [...records, ...ny]
        });
    }

    removeLastYear() {
        const {records} = this.state;

        if(records.length >= 24) {
            this.setState({
                updated: true,
                records: records.slice(0, records.length - 12)
            });
        }
    }

    render() {
        const {info, plan, records, deviation, updated} = this.state;

        return <div className='uvc__station'>
            <div className='content_header'>
                {info.name}
                {
                    updated ? (
                        <div className='inline'>
                            <input type='button' value={stationLabels.cancelChanges} onClick={this.restoreInitialState} />
                            <input type='button' value={stationLabels.applyChanges} onClick={this.liftState} />
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>

            <StationRecords updateMonthValue={this.updateNestedValue.bind(null, "records")} 
                            plan={plan}
                            records={records}
                            initialEntry={info.initialEntry}
                            initialOffset={info.initialOffset} />

            <input type='button' onClick={this.addNewYear} value={stationLabels.addYear}/>
            <input type='button' disabled={records.length < 24} onClick={this.removeLastYear} value={stationLabels.removeLastYear}/>

            <div className='content_header'>
                {stationLabels.plan}
            </div>

            <StationPlan updatePlanValue={this.updateNestedValue.bind(null, "plan")}
                         plan={plan} />

            <div className='content_header'>
                {stationLabels.deviation}
            </div>

            <StationDeviation updateDeviationValue={this.updateNestedValue.bind(null, "deviation")}
                              deviation={deviation} />
        </div>;
    }
}

export default Station;