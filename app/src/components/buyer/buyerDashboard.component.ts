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



  constructor( private _buyerService : BuyerService) {

  }


  ngOnInit() {

    console.log('i will init here');
  }


  private _getDataForUser() : void {
    console.log('i will get data here');

  }



}
