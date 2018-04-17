import React, { Component } from 'react';
import './App.css';
const moment = require('moment');

class App extends Component {

  constructor (props) {
    super(props);
    this.current = new Date();
    this.state = {
      currentDate: new Date(),
      // viewDate: new Date(moment(this.current).format('l').split('/')[2], moment(this.current).format('l').split('/')[0] - 1, 1),
      viewDate: new Date(this.current.setDate(1)),
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

  getDate() {
    const daysArray = [];
    let viewMonth = this.state.viewDate.getMonth();
    let month = viewMonth;
    let day = this.state.viewDate;
    let dayNumber = 0;
    while (month === viewMonth) {
      daysArray.push(<p> {moment(day).format('l')} </p>);
      day = this.state.viewDate.setDate(this.state.viewDate.getDate()+1);
      month = moment(day).format('l').split('/')[0]-1;
    }
    return daysArray;
  }

  render() {
    return (
      <div className="App">
        <h1>My Calendar</h1>
        {this.getDate()}
        {/* {this.state.viewDate} */}
        {/* {this.state.currentDate.getDate()} */}
      </div>
    );
  }

};

export default App;
