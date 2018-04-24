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

  }


  private _getDataForUser() : void {

  }



}
