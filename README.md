# Material UI Date & Time picker

> Wrapper for [Material UI](http://material-ui.com) Time and Date picker component

# [Demo](https://dmtrkovalenko.github.io/material-ui-datetimepicker/)
Component, that joins Material UI`s pickers into the one component, one input and 2 dialogs, appearing one by one. 

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

class Demo extends React.Component {
  state = {
    dateTime: null
  }

  setDate = (dateTime) => this.setState({ dateTime })

  render() {
    return (
      <DateTimePicker onChange={this.setDate} />
    );
  }
}
```

### Advanced 
Note that each of this props applied by default

```jsx
<DateTimePicker
  format='MMM DD, YYYY hh:mm A'
  timePickerDelay={150}
  returnMomentDate={false} // if true will return moment object
  className='datetime-container'
  textFieldClassName='datetime-input'
  defaultTime={null} // will accept Date or moment
  fieldName='picker' // form value name
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
/>
```

## Contributing
For information about how to contribute, see the [CONTRIBUTING](https://github.com/dmtrKovalenko/material-ui-datetimepicker/blob/master/CONTRIBUTE.md) file.

## LICENSE
The project is licensed under the terms of [MIT license](https://github.com/dmtrKovalenko/material-ui-datetimepicker/blob/master/LICENSE)
