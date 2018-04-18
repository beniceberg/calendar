import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const months = [
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July'},
  { value: '7', label: 'August' },
  { value: '8', label: 'September'},
  { value: '9', label: 'October'},
  { value: '10', label: 'November'},
  { value: '11', label: 'December'}
];

class MonthDropDown extends Component {
  state = { value: 'July' };

  handleChange = (value) => {
    this.setState({value: value});
    // this.props.setMonth(value);
    this.props.storeMonth(value);
  };

  render () {
    return (
      <Dropdown
        onClick={() => this.props.setMonth(this.state.value)}
        onChange={this.handleChange}
        options={months}
        value={this.state.value}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // Map your dispatch actions
  /* These functions will go through the actions to the reducer function */
  storeMonth: (monthId) => dispatch(Actions.storeMonth(monthId))
});

export default connect(null, mapDispatchToProps)(MonthDropDown);
