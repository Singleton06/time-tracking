
import 'babel-polyfill';
import moment from 'moment';

import CalendarEvent from './model/calendar_event';

const events = new WeakMap();

class CalendarDataSource {

  constructor() {
    events.set(this, []);
  }

  /**
   * @return {CalendarEvent[]}
   */
  getAllEvents() {
    return events.get(this);
  }

  /**
   *
   * @param {Moment} dayToGetEventsFor
   *
   * @return {CalendarEvent[]}
   */
  getEventsForDay(dayToGetEventsFor) {
    const eventsToReturn = [];
    for (let singleEvent in events.get(this)) {
      if(singleEvent.start.isSame(dayToGetEventsFor, 'day')) {
        eventsToReturn.push(singleEvent);
      }
    }

    return eventsToReturn;
  }

  /**
   *
   * @param {AddableCalendarEvent} addableCalendarEvent
   */
  addItemToCalendar(addableCalendarEvent) {
    events.get(this).push(new CalendarEvent(addableCalendarEvent.title, addableCalendarEvent.start, addableCalendarEvent.end));
  }

  /**
   *
   * @param {Moment} dayToGetLastEventFor
   *
   * @returns {CalendarEvent} the last event of the current date.
   */
  getLastEventForDay(dayToGetLastEventFor) {
    if (events.get(this).length == 0)
    {
      return undefined;
    }

    let lastEventOfDay = events.get(this)[0];

    events.get(this).forEach(function(singleEvent) {
      if (singleEvent.end.isSame(dayToGetLastEventFor, 'day')) {
        if (lastEventOfDay && lastEventOfDay.end.isBefore(moment(singleEvent.end))) {
          lastEventOfDay = singleEvent;
        }
      }
    });

    return lastEventOfDay;
  }
}

export default CalendarDataSource;