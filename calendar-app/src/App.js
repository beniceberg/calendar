import React, { Component } from 'react';
import './App.css';
const moment = require('moment');

class App extends Component {

  constructor (props) {
    super(props);
    this.current = new Date();
    this.state = {
      currentDate: this.current,
      viewDate: this.current.setDate(1),
    }
  }

  nextMonth () {
    this.setState({
      viewDate: moment(this.state.viewDate).add(1, 'months'),
    });
  }

  prevMonth () {
    this.setState({
      viewDate: moment(this.state.viewDate).subtract(1, 'months'),
    });
  }

  setMonth (monthId) {
    const viewDate = this.state.viewDate;
    viewDate.setMonth(monthId);
    this.setState({
      viewDate,
    })
  }

  setYear (yearId) {
    const viewDate = new Date(yearId, this.state.viewDate.getMonth(), 1);
    this.setState({
      viewDate,
    })
  }

  renderDate() {
    const daysArray = [];
    let viewMonth = new Date(this.state.viewDate).getMonth();
    let month = viewMonth;
    let day = new Date(this.state.viewDate);
    let dayOfWeek = day.getDay()
    if (dayOfWeek !== 1) {
      if(dayOfWeek === 0) dayOfWeek = 7;
      for (let i = dayOfWeek - 1; i > 0; i--) {
        daysArray.push(<p> {moment(this.state.viewDate).subtract(i,'days').calendar()} </p>);
      }
    }
    while (month === viewMonth) {
      daysArray.push(<p> {moment(day).format('l')} </p>);
      day = new Date(day.setDate(day.getDate()+1));
      month = moment(day).format('l').split('/')[0]-1;
    }
    let lastDay = day.getDay();
    if (lastDay !== 1) {
      if(lastDay === 0) daysArray.push(<p> {moment(day).format('l')} </p>);
      else {
        for (let i = 0; i <= 7 - lastDay; i++) {
          daysArray.push(<p> {moment(this.state.viewDate).add(i,'days').calendar()} </p>);
        }
      }
    }
    return daysArray;
  }

  render() {
    return (
      <div className="App">
        <h1>My Calendar</h1>
        {this.renderDate()}
        {/* {this.state.viewDate.getDay()} */}
        {/* {this.state.currentDate.getDate()} */}
      </div>
    );
  }

};

export default App;
