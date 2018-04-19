import React, { Component } from 'react';
import './App.css';

import moment from 'moment';

import { DaysList } from './components/DaysList';
import { DayNamesList } from './components/DayNamesList';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import right from './assets/right-arrow.svg';

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

const years = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]

class App extends Component {

  constructor (props) {
    super(props);
    this.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.current = new Date();
    this.state = {
      currentDate: this.current,
      viewDate: this.current.setDate(1),
      daysList: [],
      monthValue: 'Month',
      yearValue: 'Year',
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

  handleMonthChange = (value) => {
    this.setState({monthValue: value.value});
    const monthId = months.indexOf(value.value);
    this.setMonth(monthId);
  };

  handleYearChange = (value) => {
    console.log(value.value)
    this.setState({yearValue: value.value.toString()});
    const yearId = value.value;
    this.setYear(yearId);
  };

  setMonth = async (monthId) => {
    const viewDate = await new Date(this.state.viewDate).setMonth(monthId);
    this.setState({
      viewDate,
    });
    this.renderDays();
  }

  setYear = async (yearId) => {
    const viewDate = await new Date(this.state.viewDate).setFullYear(yearId)
    this.setState({
      viewDate,
    });
    this.renderDays();
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
        <div className="dropdowns">
          <Dropdown
            onChange={this.handleMonthChange}
            options={months}
            value={this.state.monthValue}
          />
          <Dropdown
            onChange={this.handleYearChange}
            options={years}
            value={this.state.yearValue}
          />
        </div>
        <div className="calendarView">
          <img
            src={right}
            className="leftLogo"
            alt="logo"
            onClick={this.prevMonth}
          />
          <div className="container">
            <DayNamesList dayNames={this.dayNames}/>
            <DaysList
              renderDays={this.state.daysList}
              viewDate={new Date(this.state.viewDate)}
            />
          </div>
          <img
            src={right}
            className="rightLogo"
            alt="logo"
            onClick={this.nextMonth}
          />
        </div>
      </div>
    );
  }

};

export default App;
