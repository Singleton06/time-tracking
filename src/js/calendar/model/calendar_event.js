import moment from 'moment';
/**
 * Represents a persisted event on the calendar.
 */
class CalendarEvent {

  /**
   *
   * @param {Moment|Date} start
   * @param {Moment|Date} end
   * @param {String|Date} title
   */
  constructor(title, start, end) {
    this.start = moment(start);
    this.end = moment(end);
    this.title = title;
  }
}

export default CalendarEvent;
