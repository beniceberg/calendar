import React from 'react';

import { Day } from './Day';
import '../styles/DaysList.css';

const renderDays = (props) => {
  if (props.renderDays) {
    return props.renderDays.map((day) => {
      return <Day
        key={day}
        day={day}
        viewDate={props.viewDate}
        />
    });
  }
}

export const DaysList = (props) => (
  <div className="DaysList">
    {renderDays(props)}
  </div>
)
