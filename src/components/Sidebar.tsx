import * as React from 'react';

import combineClassNames from '../../helpers/combineClassNames';
import {sidebarLabels} from './../labels';

class Sidebar extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {stations, section, goToStation, addStation, showStatistics, goToMainPage} = this.props;

        return <div className='uvc__sidebar'>
            <div className='pull-center'>
                <img onClick={goToMainPage} src='./logo.png' />
            </div>

            {
                stations.map((s, i) => (
                    <div key={i} onClick={(e) => {goToStation(s.id); e.stopPropagation();}} className='uvc__sidebar__link station'>
                        <div className={combineClassNames('link__label', 'active', s.id === section.stationId)}>
                            {s.name}
                        </div>
                    </div>
                ))
            }

            {/*<div onClick={(e) => {addStation(); e.stopPropagation();}} className='uvc__sidebar__link add'>
                <div className='link__label'>
                    {sidebarLabels.add}
                </div>
            </div>*/}

            <div onClick={(e) => {showStatistics(); e.stopPropagation();}} className='uvc__sidebar__link add'>
                <div className={combineClassNames('link__label', 'active', section.path === 'stats')}>
                    {sidebarLabels.report}
                </div>
            </div>

            <div className='uvc__sidebar__link inactive'>
                <div>
                    &nbsp;
                </div>
            </div>
        </div>;
    }
}

export default Sidebar;