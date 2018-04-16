/**
 * Angular Imports
 */
import { Component } from '@angular/core';


import { BuyerService } from '../../services/buyer.service';

@Component({
  templateUrl: './buyerDashboard.component.html',
  styleUrls: [ './buyerDashboard.component.scss' ]

})


export class BuyerDashboardComponent {


  public calendarOptions : object;

  constructor( private _buyerService : BuyerService) {
    // this._generateSampleData();

  }


  ngOnInit() {

  }


  private _getDataForUser() : void {

  }

  private _generateSampleData() : void {
    this.calendarOptions = {
      height: 'parent',
      fixedWeekCount: false,
      defaultDate: '2016-09-12',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2016-09-01'
        },
        {
          title: 'Long Event',
          start: '2016-09-07',
          end: '2016-09-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-09-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-09-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2016-09-11',
          end: '2016-09-13'
        },
        {
          title: 'Meeting',
          start: '2016-09-12T10:30:00',
          end: '2016-09-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2016-09-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2016-09-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2016-09-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2016-09-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2016-09-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2016-09-28'
        }
      ]
    };
  }


}
