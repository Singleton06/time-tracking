import 'babel-polyfill';

import $ from 'jquery';
import 'appCSS';
import Calendar from './calendar/calendar';
import AddEventComponent from './add_event/add_event_component';

const calendar = new Calendar();

function init() {
  const calendarDivContainer = $('<div/>').addClass('calendar-container');
  calendarDivContainer.append($('<div/>').attr('id', 'calendar'));

  $('body').append(calendarDivContainer);
  calendar.initializeCalendar($('#calendar'));

  const addEventContainer = $('<div/>').addClass('add-event-container');
  $('body').append(addEventContainer);
  new AddEventComponent(addEventContainer, calendar);
}

$(document).ready(init());
