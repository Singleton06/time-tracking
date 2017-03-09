class AddableCalendarEvent {
  /**
   * Constructs a new AddableCalendarEvent.
   *
   * @param {String} title
   *    The title of the event to add to the calendar.
   * @param {Date} start
   *    The start date of the event.
   * @param {Date} end
   *    The date that the event ends.
   */
  constructor(title, start, end) {
    this.title = title;
    this.start = start;
    this.end = end;
  }
}

export default AddableCalendarEvent;