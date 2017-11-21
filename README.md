# Material UI Date & Time picker

> Wrapper for [Material UI](http://material-ui.com) Time and Date picker component

# [Demo](https://dmtrkovalenko.github.io/material-ui-datetimepicker/)
Component, that joins Material UI`s pickers into the one component, one input and 2 dialogs, appearing one by one. 

We are recommending to use your custom wrapper outside of this component to store your custom props, and not pass Dialogs each time you use this package, because it should be solved in one of next material-ui versions

### Dependencies

* **Material UI** (Don`t use this package without material-ui, please)
* **React** 

### Getting Started
Here is a quick example to get you started, it's all you need:

```sh
npm install material-ui-datetimepicker
``` 

### Simple usage

```jsx
import React from 'react';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

class Demo extends React.Component {
  state = {
    dateTime: null
  }

  setDate = (dateTime) => this.setState({ dateTime })

  render() {
    return (
      <DateTimePicker 
        onChange={this.setDate}
        DatePicker={DatePickerDialog}
        TimePicker={TimePickerDialog}
      />
    );
  }
}
```

### Advanced 
Note that each of this props applied by default

```jsx
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

<DateTimePicker
  value={new Date()} // picker value moment/string/number/js Date
  format='MMM DD, YYYY hh:mm A'
  timePickerDelay={150}
  returnMomentDate={false} // if true will return moment object
  className='datetime-container'
  textFieldClassName='datetime-input'
  name='picker' // form value name
  datePickerMode='portrait' // or landscape
  openToYearSelection={false} 
  disableYearSelection={false}
  hideCalendarDate={false}
  firstDayOfWeek={1}
  minutesStep={1}
  showCurrentDateByDefault={false}
  clearIcon={<ClearIcon />} // set null to not render nothing
  // available callbacks
  onChange={() => {}}
  onTimePickerShow={() => {}}
  onDatePickerShow={() => {}}
  onDateSelected={() => {}}
  onTimeSelected={() => {}}
  shouldDisableDate={() => {}}
  DatePicker={DatePickerDialog}
  TimePicker={TimePickerDialog}
  // styles
  clearIconStyle={{ }}
  textFieldStyle={{ }}
  style={{ }} // root
  timePickerBodyStyle={{ }}
/>
```
### Customizing input
You can apply any of material ui [Text Field](http://www.material-ui.com/#/components/text-field) props to the root.

```jsx
<DateTimePicker
  floatingLabelFixed	
  floatingLabelText="Get my date"
  floatingLabelFocusStyle={{ marginTop: '10px' }}
  disabled={false}
  errorText='Required'
  id="some-id"
  fullWidth={false}
/>
```
## Contributing
For information about how to contribute, see the [CONTRIBUTING](https://github.com/dmtrKovalenko/material-ui-datetimepicker/blob/master/CONTRIBUTE.md) file.

## LICENSE
The project is licensed under the terms of [MIT license](https://github.com/dmtrKovalenko/material-ui-datetimepicker/blob/master/LICENSE)