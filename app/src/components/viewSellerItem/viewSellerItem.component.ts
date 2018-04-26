/**
 * Angular Imports
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Custom Services
 */
import { SellerService } from '../../services/seller.service';
import { NegotiationService } from '../../services/negotiation.service';


/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as BaseActions from '../../actions/base';


import { SELLER_ITEM_LIST as SellerItems } from '../../configurations/mocks/mockItemList';

@Component({
  templateUrl: './viewSellerItem.component.html'
})


export class ViewSellerItemComponent {


  /**
   * @type {boolean} _compActive - provides reference when the comp is active
   */
  private _compActive : boolean = true;

  /**
   * @type {boolean} dataReturned - provides reference when the data is returned
   */
  public dataReturned: boolean = false;
  /**
   * @type {string} _itemId - provides reference of item id
   */
  public _itemId : string;

  public item : object = {
    address: '',
    description: '',
    title: '',
    price: '',
    offers: [],
    url: ''
  };

  /**
   * @param {FormBuilder} _fb, form builder provider
   * @param {ActivatedRoute} _route, route provider
   * @param {Router} _router, provides router
   * @param {NegotiationService} _negotiationService, negotiation item service
   * @param {SellerService} _sellerService, seller service
   * @param {Store<fromRoot.State>} _store, store provider
   */
  constructor( private _fb : FormBuilder,
               private _route : ActivatedRoute,
               private _router : Router,
               private _negotiationService : NegotiationService,
               private _sellerService : SellerService,
               private _store : Store<fromRoot.State> ) {

  }


  ngOnInit() {

    this._determineItem();

  }


  ngOnDestroy() {

    this._clearSubs();
  }


  private _clearSubs() : void {
    this._compActive = false;
  }


  private _determineItem() : void {


    this._route.params.takeWhile(() => {
      return this._compActive;
    }).subscribe(( params ) => {
      console.log('the params are::::::::', params);
      this._itemId = params[ 'id' ];

      this._getOffers();

    })


  }

  private _getOffers() : void {
    this._sellerService.getSellerItem(this._itemId).takeWhile(() => {
      return this._compActive;
    }).subscribe(( data : any ) => {

      console.log('the item is:::', data);
      this.item[ 'price' ] = data[ 'price' ];
      this.item[ 'title' ] = data[ 'name' ];
      this.dataReturned = true;
    })


  }

  public acceptOffer( id : string ) : void {
    this._negotiationService.acceptOffer({
      offer: id,
      accept: true
    }).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {
      console.log('the res for create item is...', res);
    });
  }


  public declineOffer( id : string ) : void {
    this._negotiationService.declineOffer({
      offer: id,
      accept: false
    }).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {
      console.log('the res for create item is...', res);
    });
  }


  public close() : void {
    this._router.navigate([ 'app/main' ]);

  }


}
