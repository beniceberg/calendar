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
      viewDate: new Date().setDate(1),
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
    // const daysArray = [];
    // const viewMonth = moment(this.state.viewDate).format('l').split('/')[0];
    // for (let i=0; i<100; i++) {
    //   const date = <p> {moment(this.state.viewDate).add(i, 'days').calendar()} </p>;
    //   daysArray.push(date);
    // }
    // const firstDay = this.state.viewDate.getDay();
    // if (firstDay !== 0) {
    //   // if (firstDay === 0) firstDay = 7;
    //   for (let i=firstDay; i > 0; i--) {
    //     daysArray.push(<p> {moment(this.state.viewDate).subtract(i,'days')} </p>)
    //   }
    // }

    // let viewMonth = this.state.viewDate;
    // viewMonth = viewMonth.getMonth();
    // let month = viewMonth;
    // let dayNumber = 0;
    // while (month === viewMonth) {
    //   const day = this.state.viewDate.setDate(this.state.viewDate.getDate()+1);
    //   daysArray.push(<p> {day} </p>);
    //   month = day.getMonth();
    // }
    // return daysArray;
  }
  render() {
    return (
      <div className="App">
        <h1>My Calendar</h1>
        {/* {this.getDate()} */}
        {this.state.viewDate}
      </div>
    );
  }

};

export default App;
