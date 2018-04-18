import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { DaysList } from './components/DaysList';
import { DayNamesList } from './components/DayNamesList';

// import MonthDropDown from './components/MonthDropDown';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const moment = require('moment');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

class App extends Component {

  constructor (props) {
    super(props);
    this.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.current = new Date();
    this.state = {
      currentDate: this.current,
      viewDate: this.current.setDate(1),
      daysList: [],
      value: 'Month',
    }
  }

  componentDidMount () {
    this.renderDays();
  }

  prevMonth = async () => {
    const viewDate = await new Date(this.state.viewDate).setMonth(new Date(this.state.viewDate).getMonth() - 1);
    this.setState({
      viewDate,
    });
    this.renderDays();
  }

  nextMonth = async () => {
    const viewDate = await new Date(this.state.viewDate).setMonth(new Date(this.state.viewDate).getMonth() + 1);
    this.setState({
      viewDate,
    });
    this.renderDays();
  }

  handleChange = (value) => {
    this.setState({value: value});
    // this.props.setMonth(value);
    // this.props.storeMonth(value);
    const monthId = months.indexOf(value);
    this.setMonth(monthId);
  };

  setMonth = async (monthId) => {
    const viewDate = await new Date(this.state.viewDate).setMonth(monthId)
    this.setState({
      viewDate,
    })
  }

  setYear (yearId) {
    this.setState({
      viewDate: new Date(this.state.viewDate).setYear(yearId),
    })
  }

  renderDays = async ()  => {
    const daysList = [];
    let date = await new Date(this.state.viewDate);
    const viewMonth = date.getMonth();
    let checkMonth = viewMonth;

    // Overflow days before View Month
    let firstDay = date.getDay();
    if (firstDay !== 1) {
      if(firstDay === 0) firstDay = 7;
      for (let i = firstDay - 1; i > 0; i--) {
        daysList.push(moment(this.state.viewDate).subtract(i,'days').calendar());
      }
    }

    // Days of View Month
    while (checkMonth === viewMonth) {
      daysList.push(moment(date).format('L'));
      date = await new Date(date.setDate(date.getDate()+1));
      checkMonth = moment(date).format('L').split('/')[0]-1;
    }

    // Overflow days after View Month
    let lastDay = date.getDay();
    if (lastDay !== 1) {
      if(lastDay === 0) daysList.push(moment(date).format('L'));
      else {
        for (let i = 0; i <= 7 - lastDay; i++) {
          daysList.push(moment(date).add(i,'days').calendar());
        }
      }
    }
    this.setState({
      daysList,
    })
    return daysList;
  }

  render() {
    return (
      <div className="App">
        <h1>My Calendar</h1>
        <div>
          <h2>{moment(this.state.viewDate).format('MMMM YYYY')}</h2>
        </div>
        {/* <MonthDropDown setMonth={this.setMonth}/> */}
        <Dropdown
          onChange={this.handleChange}
          options={months}
          value={this.state.value}
        />
        <div className="calendarView">
          <button onClick={this.prevMonth}>PREV</button>
          <div className="container">
            <DayNamesList dayNames={this.dayNames}/>
            <DaysList
              renderDays={this.state.daysList}
              viewDate={new Date(this.state.viewDate)}
            />
          </div>
          <button onClick={this.nextMonth}>NEXT</button>
        </div>
        <p>{moment(this.state.viewDate).format('L')}</p>
      </div>
    );
  }

};

const mapStateToProps = (state) => ({
  // Map your state to props
  monthId: state.monthId

});
// const mapDispatchToProps = (dispatch) => ({
//   // Map your dispatch actions
//   /* These functions will go through the actions to the reducer function */
//   storeTopics: (topics) => dispatch(storeTopics(topics)),
// });

export default connect(mapStateToProps, null)(App);
