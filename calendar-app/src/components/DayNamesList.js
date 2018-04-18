import React from 'react';

import { DayName } from './DayName';
import '../styles/DayNamesList.css';

const renderDayNames = (props) => {
  if (props.dayNames) {
    return props.dayNames.map((dayName) => {
      return <DayName
        key={dayName}
        dayName={dayName}
        />
    });
  }
}

export const DayNamesList = (props) => (
  <div className="DayNamesList">
    {renderDayNames(props)}
  </div>
)
