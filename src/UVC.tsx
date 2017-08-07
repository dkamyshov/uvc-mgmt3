import * as React from 'react';

import Home    from './components/Home';
import Sidebar from './components/Sidebar';
import Station from './components/Station';
import Stats   from './components/Stats';

import labels from './labels';

import data from './data.js';

const process = (sd) => {
  return sd.map((_, i) => {
    _.name = decodeURIComponent(_.name);
    
    const sp = _.name.split(' ');
    
    const primary = sp[1].trim();
    const secondary = sp.slice(2).join(' ');
    const id = i;
    
    const firstYear = _.records.sort((a,b) => a.mark - b.mark)[0];
    
    const initialPeriod = firstYear.mark-1;
    const initialEntry = firstYear.total - firstYear.monthly.reduce((a, b) => a + b);
    
    const entries = _.records.sort((a,b) => a.mark - b.mark).reduce((__, _) => {
      __ = __.concat(_.monthly);
      return __;
    }, []);
    
    const plan = _.plan;
    
    return {
      id: id,
      name: primary + ' ' + secondary,
      plan: plan,
      initialOffset: initialPeriod,
      initialEntry: initialEntry,
      records: entries,
      deviation: [2,2,2,2,2,2,2,2,2,0,0,0]
    };
  });
};

class UVC extends React.Component<any, any> {
    hasUnsavedChanges: boolean;

    constructor(props) {
        super(props);

        this.state = {
            section: {
                path: ''
            },

            stations: process(data)
        };

        this.goToStation = this.goToStation.bind(this);
        this.removeStation = this.removeStation.bind(this);
        this.showStatistics = this.showStatistics.bind(this);
        this.updateStation = this.updateStation.bind(this);
        this.notifyChanges = this.notifyChanges.bind(this);
    }

    goToStation(id) {
        if(id === this.state.section.stationId) return;

        if(this.hasUnsavedChanges) {
            if(!confirm(labels.confirm)) {
                return;
            }
            this.hasUnsavedChanges = false;
        }

        this.setState({
            section: {
                path: 'station',
                stationId: id
            }
        });
    }

    showStatistics() {
        if(this.hasUnsavedChanges) {
            if(!confirm(labels.confirm)) {
                return;
            }
            this.hasUnsavedChanges = false;
        }

        this.setState({
            section: {
                path: 'stats'
            }
        });
    }

    removeStation(id) {
        const {stations} = this.state;

        this.setState({
            stations: stations.filter(station => station.id !== id)
        });
    }

    notifyChanges(hasChanged = true) {
        this.hasUnsavedChanges = hasChanged;
    }

    updateStation(station) {
        const cs = this.state.stations.find(s => s.id === station.id);
        const rest = this.state.stations.filter(s => s.id !== station.id);

        this.hasUnsavedChanges = false;

        this.setState({
            stations: [
                ...rest,
                {
                    ...station,
                    records: [...station.records],
                    plan: [...station.plan],
                    deviation: [...station.deviation]
                }
            ]
        });
    }

    render() {
        const {stations, section} = this.state;

        const station = stations.find(s => s.id === section.stationId);

        let content;

        switch(section.path) {
            case '': content = <Home />; break;
            case 'station': content = station ? <Station notifyChanges={this.notifyChanges} updateStation={this.updateStation} data={station}/> : (
                    labels.notFound
                ); break;
            case 'stats': content = <Stats stations={stations} />; break;
            default: content = 'Whoops! Internal error.';
        }

        return <div className='uvc__app'>
            <Sidebar stations={stations.sort((a, b) => a.id - b.id)}
                     section={section}
                     goToStation={this.goToStation}
                     goToMainPage={() => this.setState({section: {path: ''}})}
                     showStatistics={this.showStatistics}/>

            <div className='uvc__content'>
                { content }
            </div>
        </div>;
    }
}

export default UVC;