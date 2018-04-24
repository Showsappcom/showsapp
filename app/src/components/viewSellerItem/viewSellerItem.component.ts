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
   * @type {string} _itemId - provides reference of item id
   */
  public _itemId : string;

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


  }

  public acceptOffer() : void {
    this._negotiationService.acceptOffer({
      offer: '1',
      accept: '1'
    }).takeWhile(() => {
      return this._compActive;
    }).subscribe(( res : any ) => {
      console.log('the res for create item is...', res);
    });
  }


  public counterOffer() : void {
    this._negotiationService.counterOffer({
      offer: '1',
      accept: '1'
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
