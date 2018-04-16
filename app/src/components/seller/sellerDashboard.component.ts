/**
 * Angular Imports
 */
import { Component } from '@angular/core';

/**
 * Custom Services
 */
import { SellerService } from '../../services/seller.service';


/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as BaseActions from '../../actions/base';


import { SELLER_ITEM_LIST as SellerItems } from '../../configurations/mocks/mockItemList';

@Component({
  templateUrl: './sellerDashboard.component.html',
  styleUrls: [ './sellerDashboard.component.scss' ]

})


export class SellerDashboardComponent {

  public sellersItems : any;
  public offerList : any;
  public itemSelected : object = null;

  constructor( private _store : Store<fromRoot.State>,
               private _sellerService : SellerService ) {

  }


  ngOnInit() {

    this._getSellersItems();

  }

  ngOnDestroy() {

  }


  private _addListener() : void {

  }

  private _getSellersItems() : void {
    let offerList = [];
    this.sellersItems = SellerItems.splice(0);
    this.sellersItems.map(( node ) => {
      offerList = [
        ...offerList,
        ...node.offers.map(( offer ) => {
          return { ...offer, objectId: node.id, title: node.title };

        })
      ];
    });

    this.offerList = offerList;

    console.log('offerList:::', this.offerList);


  }


}
