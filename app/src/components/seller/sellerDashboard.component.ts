/**
 * Angular Imports
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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




  /**
   * @type {boolean} dataReturned- provides an item list
   */
  public dataReturned : boolean = false;

  /**
   * @type {boolean} errorGettingData- boolean to determine if error happened
   */
  public errorGettingData : boolean = false;

  /**
   * @type {any} offerList- provides an offer list
   */
  public offerList : any;

  /**
   * @type {any} sellerItems- provides an item list
   */
  public sellersItems : any;


  constructor( private _router : Router,
               private _sellerService : SellerService,
               private _store : Store<fromRoot.State>
  ) {

  }


  ngOnInit() {

    console.log('INIT IS HERE......');
    this._getSellersItems();

  }

  ngOnDestroy() {

  }


  private _addListener() : void {

  }

  private _getSellersItems() : void {
    let offerList = [];
    // let temp = JSON.parse(JSON.stringify(SellerItems));
    this.sellersItems = [];

    // console.log('the sellers items are ::::', this.sellersItems, SellerItems);
    // this.sellersItems.forEach(( node ) => {
    //   offerList = [
    //     ...offerList,
    //     ...node.offers.forEach(( offer ) => {
    //       return { ...offer, objectId: node.id, title: node.title };
    //
    //     })
    //   ];
    // });

    // this.offerList = offerList;
    this.dataReturned = true;
    this.errorGettingData = false;

    this.offerList = offerList;
    console.log('offerList:::', this.offerList);


  }


  public addItem() : void {
    this._router.navigate([ '/app/create' ]);
  }


}
