import React from 'react';

export const Day = (props) => (
  <div
    className="Day"
    style={{backgroundColor: (Number(props.day.split('/')[0]) == props.viewDate.getMonth()+1) ? "rgb(216, 239, 247)" : "rgb(221, 217, 216)"}}>
    {props.day.split('/')[1]}
  </div>
)
