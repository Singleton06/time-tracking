import 'fullcalendar';
import 'fullcalendarCSS';
import 'babel-polyfill';
import moment from 'moment';

import CalendarDataSource from './calendar_data_source';

const calendarDataSource = new WeakMap();
const $calendarElement = new WeakMap();

class Calendar {
  constructor() {
    calendarDataSource.set(this, new CalendarDataSource());
  }

  /**
   * Initializes the calendar portion of the page.
   *
   * @param {jQuery} $calendarElementToRenderOn
   *    The jQuery element that the calendar should be rendered on.
   */
  initializeCalendar($calendarElementToRenderOn) {
    $calendarElement.set(this, $calendarElementToRenderOn);
    $calendarElement.get(this).fullCalendar({
      defaultView: 'basicDay',
      height: 'parent',
    });
  }

  /**
   * Adds the event to the calendar.
   *
   * @param {AddableCalendarEvent} addableCalendarItem
   *    The event to add to the calendar.
   */
  addItemToCalendar(addableCalendarEvent) {
    console.log('adding from calendar.js');
    calendarDataSource.get(this).addItemToCalendar(addableCalendarEvent);
    $calendarElement.get(this).fullCalendar('renderEvent', {
      title: addableCalendarEvent.title,
      start: addableCalendarEvent.start,
      end: addableCalendarEvent.end,
    });
  }

  /**
   *
   * @param {Moment} dayToGetLastEventFor
   *
   * @returns {CalendarEvent}
   */
  getLastEventForDay(dayToGetLastEventFor) {
    return calendarDataSource.get(this).getLastEventForDay(dayToGetLastEventFor);
  }
}

export default Calendar;
