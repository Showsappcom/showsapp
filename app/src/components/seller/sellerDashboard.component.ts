/**
 * Angular Imports
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Custom Services
 */
import { ModalsEvent } from '../../services/modalsEvent.service';
import { SellerService } from '../../services/seller.service';
import { ToastEvent } from '../../services/toastEvent.service';


/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';


/**
 * Constants
 */
import { COMMON_CONSTANTS as COMMON_CONST } from '../../configurations/constants/common.constant';

@Component({
  templateUrl: './sellerDashboard.component.html',
  styleUrls: [ './sellerDashboard.component.scss' ]

})


export class SellerDashboardComponent {

  /**
   * @type {boolean} _compActive- provides a reference if the comp is active
   */
  private _compActive : boolean = true;

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

  /**
   * @type {object} _objectToDelete- provides a reference to what to delete
   */
  private _objectToDelete : object;

  constructor( private _modalEvent : ModalsEvent,
               private _router : Router,
               private _sellerService : SellerService,
               private _store : Store<fromRoot.State>,
               private _toastEvent : ToastEvent
  ) {

  }


  ngOnInit() {

    console.log('INIT IS HERE......');
    this._getSellersItems();
    this._setupModalListener();

  }

  ngOnDestroy() {

    this._clearSubs();

  }

  private _setupModalListener() : void {
    this._modalEvent.on().takeWhile(() => {
      return this._compActive;
    }).subscribe(( event : any ) => {

      if (event[ 'action' ] === 'delete') {
        console.log('the event is::::', event);
        this.archiveItem(this._objectToDelete[ 'id' ], this._objectToDelete[ 'index' ]);
      }

    });

  }

  private _clearSubs() {
    this._compActive = false;
  }


  private _getSellersItems() : void {
    let offerList = [];
    // let temp = JSON.parse(JSON.stringify(SellerItems));

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

    this._sellerService.getSellerData().takeWhile(() => {
      return this._compActive;
    }).subscribe(( data : any ) => {
      console.log('@@@@@@@@@@@@@@@::::::');
      console.log('@@@@@@@@@@@@@@@::::::');
      console.log('the data is::::::', data.results);
      console.log('@@@@@@@@@@@@@@@::::::');
      console.log('@@@@@@@@@@@@@@@::::::');
      this.sellersItems = data.results;

    });
    // this.offerList = offerList;
    this.dataReturned = true;
    this.errorGettingData = false;

    this.offerList = offerList;
    console.log('offerList:::', this.offerList);


  }


  public openConfirmationModal( id : string, index : number ) : void {

    this._objectToDelete = {
      id: id,
      index: index
    };

    this._modalEvent.fire({
      action: COMMON_CONST.POPOVER.OPEN,
      type: 'DeleteConfirmation'
    });

  }

  public archiveItem( id : string, index : number ) : void {


    this._sellerService.archiveItem(id).takeWhile(() => {
      return this._compActive;
    }).subscribe(( data : any ) => {

      console.log('the response is::::', data);
      this.sellersItems.splice(index, 1);
      this._modalEvent.fire({ action: COMMON_CONST.POPOVER.CLOSE, type: 'DeleteConfirmation' });


    });
  }

  public navigateTo( id : string ) : void {
    this._router.navigate([ '/app/product/' + id ]);

  }

  public addItem() : void {
    this._router.navigate([ '/app/create' ]);
  }

  // public clipBoardCopied(url: string) : void {
  //   // let linkText = document.getElementById('item-'+id);
  //
  //   /* Select the text field */
  //
  //
  //   /* Copy the text inside the text field */
  //   document.execCommand("Copy");
  //
  //   this._toastEvent.fire({
  //     type: 'info',
  //     message: 'link copied to clipboard'
  //   })
  // }

}
