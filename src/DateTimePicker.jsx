import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment'
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import ClearIcon from 'material-ui/svg-icons/content/clear'

export default class DateTimePicker extends Component {
  static propTypes = {
    format: PropTypes.string,
    timePickerDelay: PropTypes.number,
    okLabel: PropTypes.string,
    defaultTime: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    fieldName: PropTypes.string,
    showCurrentDateByDefault: PropTypes.bool,
    returnMomentDate: PropTypes.bool,
    clearIcon: PropTypes.node,

    // styles
    className: PropTypes.string,

    // DatePicker
    autoOkDatePicker: PropTypes.bool,
    onDateSelected: PropTypes.func,
    onDatePickerShow: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    openToYearSelection: PropTypes.bool,
    datePickerMode: PropTypes.oneOf(['portrait', 'landscape']),
    disableYearSelection: PropTypes.bool,
    hideCalendarDate: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    openToYearSelection: PropTypes.bool,
    maxDate: PropTypes.oneOf([PropTypes.object, PropTypes.string, PropTypes.number]),
    minDate: PropTypes.oneOf([PropTypes.object, PropTypes.string, PropTypes.number]),

    // TimePicker
    onTimeSelected: PropTypes.func,
    onTimePickerShow: PropTypes.func,
    timePickerBodyStyle: PropTypes.object,
    timeFormat: PropTypes.oneOf(['ampm', '24hr']),
    autoOkTimePicker: PropTypes.bool,
    timePickerDialogStyle: PropTypes.object,
    minutesStep: PropTypes.number,
    name: PropTypes.string,
  }

  static defaultProps = {
    name: 'datepicker',
    format: 'MMM DD, YYYY hh:mm A',
    timePickerDelay: 150,
    className: 'datetime-container',
    textFieldClassName: 'datetime-input',
    defaultTime: null,
    autoOkDatePicker: true,
    fieldName: 'timePicker',
    datePickerMode: 'portrait',
    openToYearSelection: false,
    disableYearSelection: false,
    hideCalendarDate: false,
    firstDayOfWeek: 1,
    timePickerBodyStyle: {},
    timeFormat: 'ampm',
    autoOkTimePicker: false,
    timePickerDialogStyle: {},
    minutesStep: 1,
    showCurrentDateByDefault: false,
    returnMomentDate: false,
    clearIcon: <ClearIcon />,
    onFocus: PropTypes.func,

    // functions
    onChange: () => { },
    onFocus: () => { },
    onTimePickerShow: () => { },
    onDatePickerShow: () => { },
    onDateSelected: () => { },
    onTimeSelected: () => { },
    shouldDisableDate: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      dateTime: props.defaultTime ? moment(this.props.defaultTime) : null,
    }
  }

  handleFocus = (event) => {
    event.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  
  /* 
    * Get current selected date by user
    @returns { Object } moment or vanilla date object
  */
  getDate = () => {
    if (!this.state.dateTime) {
      return null;
    }

    return this.props.returnMomentDate
      ? this.state.dateTime
      : this.state.dateTime.toDate()
  }

  getDateOrCurrentTime = () => {
    return this.state.dateTime 
      ? this.state.dateTime.toDate() 
      : new Date();
  }

  getDateOrNull = (time) => {
    return time
      ? moment(time).toDate()
      : null
  }

  openDatePicker = e => {
    e.preventDefault()
    this.refs.datePicker.show();
  }

  selectDate = (date) => {
    const currentDateTime = moment(this.getDateOrCurrentTime());
    const dateTime = moment(date) 
      .set('hours', currentDateTime.hours()) // fill time unites
      .set('minutes', currentDateTime.minutes())

    this.setState({ dateTime });

    this.props.onDateSelected(this.getDate())
    // show timepicker
    setTimeout(() => this.refs.timePicker.show(), this.props.timePickerDelay)
  }

  selectTime = (date) => {
    const { dateTime } = this.state;

    dateTime.hours(date.getHours())
    dateTime.minutes(date.getMinutes())

    this.setState({ dateTime }, () => {
      this.props.onTimeSelected(this.getDate());
      this.props.onChange(this.getDate())
    })
  }

  getDisplayTime = () => {
    const { dateTime } = this.state;
    const defaultTime = this.props.showCurrentDateByDefault 
      ? moment().format(this.props.format) 
      : ''

    return dateTime
      ? dateTime.format(this.props.format)
      : defaultTime
  }

  clearState = () => {
    this.setState({ dateTime: null });
    this.props.onChange(null)
  }

  render() {
    const { 
      handleFocus, clearIcon, maxDate, minDate, autoOkDatePicker, firstDayOfWeek, textFieldClassName,
      datePickerMode, disableYearSelection, onDatePickerShow, onDatePickerDismiss, shouldDisableDate,
      hideCalendarDate, openToYearSelection, timePickerBodyStyle, onTimePickerShow, timeFormat,
      okLabel, autoOkTimePicker, timePickerDialogStyle, minutesStep,
      ...other 
    } = this.props;

    return (
      <span className={this.props.className}>
        <TextField
          onFocus={this.handleFocus}
          className={textFieldClassName}
          onClick={this.openDatePicker}
          value={this.getDisplayTime()}
          {...other}
        />

        <IconButton onClick={this.clearState}>
          { clearIcon }
        </IconButton>

        <DatePickerDialog
          ref="datePicker"
          container='dialog'
          initialDate={this.getDateOrCurrentTime()}
          maxDate={this.getDateOrNull(maxDate)}
          minDate={this.getDateOrNull(minDate)}
          okLabel={okLabel}
          autoOk={autoOkDatePicker}
          firstDayOfWeek={firstDayOfWeek}
          onAccept={this.selectDate}
          mode={datePickerMode}
          disableYearSelection={disableYearSelection}
          onShow={onDatePickerShow}
          onDismiss={onDatePickerDismiss}
          shouldDisableDate={shouldDisableDate}
          hideCalendarDate={hideCalendarDate}
          openToYearSelection={openToYearSelection}
        />

        <TimePickerDialog
          ref="timePicker"
          defaultTime={this.getDateOrCurrentTime()}
          onAccept={this.selectTime}
          bodyStyle={timePickerBodyStyle}
          onShow={onTimePickerShow}
          format={timeFormat}
          okLabel={okLabel}
          autoOk={autoOkTimePicker}
          style={timePickerDialogStyle}
          minutesStep={minutesStep}
        />
      </span>
    );
  }
}
