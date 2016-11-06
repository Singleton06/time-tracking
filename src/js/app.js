import 'babel-polyfill';

import $ from 'jquery';
import moment from 'moment';
import 'fullcalendar';
import 'fullcalendarCSS';
import 'appCSS';

function initCalendar() {
  $('#calendar').fullCalendar({
    defaultView: 'basicDay',
  });
}

function addOnButtonClickForAddButton() {
  $('#add-button').click(() => {
    $('#calendar').fullCalendar('renderEvent', {
      title: 'testing title',
      start: moment().toDate(),
      end: moment().add(1, 'hour').toDate(),
    });
  });
}

function init() {
  $('body').append($('<div/>').attr('id', 'calendar'));
  initCalendar();
  addOnButtonClickForAddButton();
}

$(document).ready(init());


