import 'babel-polyfill';
import AddableCalendarEvent from './../calendar/events/addable_calendar_event';
import moment from 'moment';
import $ from 'jquery';

const $fromLastEventContainer = new WeakMap();
const $specifyDateRangeContainer = new WeakMap();

class AddAppointmentComponent {
  /**
   * @param {jQuery} parent
   * @param {Calendar} calendar
   */
  constructor(parent, calendar) {
    const $addEventContainer = $('<div/>').addClass('add-event-fields');
    $addEventContainer.append(getGeneralEventQuestions());

    const eventLogTypeLabel = $('<label/>').text('Event Log Type: ');
    $addEventContainer.append(eventLogTypeLabel).append(getEventLogTypeSelect());
    $addEventContainer.find('#log-event-type-select').on('change', onLogEventTypeSelectionChange);

    $fromLastEventContainer.set(this, getFromLastEventContent());
    $addEventContainer.append($fromLastEventContainer.get(this));

    $specifyDateRangeContainer.set(this, getTimeRangeEntryContent());
    $specifyDateRangeContainer.get(this).toggle(false);
    $addEventContainer.append($specifyDateRangeContainer.get(this));

    $addEventContainer.append($('<button/>').attr('id', 'add-button').text('Add Event'));

    parent.append($addEventContainer);
    addOnButtonClickForAddButton(calendar);
  }
};

function getGeneralEventQuestions() {
  return $(`
<div id="general-questions">
    <p class="field">
      <label>Event Name:</label>
      <input id="event-name" />
    </p>
</div>
`);
}

function onLogEventTypeSelectionChange() {
  const value = $(this).find(':selected').val();
  if(value === 'DATE_RANGE') {
    $('#time-range-entry-fields-container').toggle(true);
    $('#from-last-entry-fields-container').toggle(false);
  } else if(value === 'FROM_LAST') {
    $('#time-range-entry-fields-container').toggle(false);
    $('#from-last-entry-fields-container').toggle(true);
  }
}

function getFromLastEventContent() {
  return $(`
<div id="from-last-entry-fields-container">
    <p class="field">
      <label>Duration (from end of last entry):</label>
      <input id="from-last-entry-duration" />
    </p>
</div>
`);
}

function getTimeRangeEntryContent() {
  return $(`
<div id="time-range-entry-fields-container">
    <p class="field">
      <label>Begin Time:</label>
      <input id="begin-time" />
    </p>
    <p class="field">
      <label>End Time:</label>
      <input id="end-time" />
    </p>
</div>
`);
}

function getEventLogTypeSelect() {
  return `
<select id='log-event-type-select'>
  <option value="FROM_LAST">From Last Event</option>
  <option value="DATE_RANGE">Specify Date Range</option>
</select>`
}

/**
 *
 * @param {Calendar} onEventAdd
 */
function addOnButtonClickForAddButton(calendar) {
  $('#add-button').click(() => {
    const title = $('#event-name').val();
    let beginDate = moment();
    let endDate = moment();

    const selectedValue = $('#log-event-type-select').find(':selected').val();
    if(selectedValue === 'DATE_RANGE') {

    } else if(selectedValue === 'FROM_LAST') {
      let lastEvent = calendar.getLastEventForDay(moment());
      if (!lastEvent) {
        beginDate = moment();
      } else {
        console.log(lastEvent);
        beginDate = lastEvent.end.clone().add('minute', 1);
      }

      const durationFromLastAppointment = $('#from-last-entry-duration').val();
      endDate = beginDate.clone().add(durationFromLastAppointment, 'minutes');
    }

    calendar.addItemToCalendar(new AddableCalendarEvent(title, beginDate.toDate(), endDate.toDate()));
  });
}

/**
 *
 * @param {jQuery} field
 * @param {String} label
 */
function createFieldWithLabel(field, label) {
  return $('<p/>').append($('<label/>').text(label)).append(field);
}

export default AddAppointmentComponent;
