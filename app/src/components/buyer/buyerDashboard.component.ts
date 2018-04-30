/**
 * Angular Imports
 */
import { ActivatedRoute } from "@angular/router";
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Services
 */
import { BuyerService } from '../../services/buyer.service';
/**
 * Models/Interfaces
 */
import { SellerItemModel } from '../../models/items/item.model';

@Component({
  templateUrl: './buyerDashboard.component.html',
  styleUrls: [ './buyerDashboard.component.scss' ]

})


export class BuyerDashboardComponent {


  /**
   * @type {boolean} _compActive - provides reference when the comp is active
   */
  private _compActive : boolean = true;


  /**
   * @type {string} _itemId - provides reference of seller id
   */
  private _sellerId : string;

  /**
   * @type {string} _slugId - provides reference of slub id
   */
  private _slugId : string;

  /**
   * @type {boolean} dataReturned - provides reference if data ws returned
   */
  public dataReturned : boolean = false;

  /**
   * @type {boolean} errorGettingData - provides reference if data returned with an error
   */
  public errorGettingData : boolean = false;


  /**
   * @type {SellerItemModel} sellerItem - provides reference for the seller item model
   */
  public sellerItem : SellerItemModel;


  /**
   * @type {FormGroup} offerControl - provides reference for the seller item model
   */
  public offerControl : FormGroup;


  public spinnerColour : string = 'primary';
  public spinnerValue : string = '0';

  /**
   * @param {BuyerService} _buyerService, buyer item service
   * @param {FormBuilder} _fb, form builder provider
   * @param {ActivatedRoute} _route, route provider
   */
  constructor( private _buyerService : BuyerService,
               private _fb : FormBuilder,
               private _route : ActivatedRoute ) {

  }


  ngOnInit() {

    console.log('i will init here');
    this._determineOptions();
    this._generateForm();

  }

  private _generateForm() : void {

    this.offerControl = this._fb.group({
      offer: [
        '',
        [ Validators.required ]
      ]

    });

    this._formChangeHandler();


  }


  private _formChangeHandler() : void {

    this.offerControl.valueChanges.takeWhile(() => {
      return this._compActive;
    }).subscribe(val => {
      console.log('this val changed....', val);
      this.spinnerValue = this._buyerService.getProbability(this.sellerItem.price, val.offer)


    });

  }

  private _getDataForUser() : void {
    console.log('i will get data here');

    if (this._sellerId && this._sellerId.length > 0 && this._slugId && this._slugId.length > 0) {
      this._buyerService.getSellerData(this._sellerId, this._slugId).takeWhile(() => {
        return this._compActive;
      }).subscribe(( data : any ) => {
        console.log('the data is::::::::::::::::::');
        console.log('the data is::::::::::::::::::');
        console.log('the data is::::::::::::::::::');
        console.log('the data is:::', data);
        console.log('the data is::::::::::::::::::');
        console.log('the data is::::::::::::::::::');
        console.log('the data is::::::::::::::::::');
        this.sellerItem = data;
        this.dataReturned = true;
      });
    }

  }

  private _determineOptions() : void {


    this._route.params.takeWhile(() => {
      return this._compActive;
    }).subscribe(( params ) => {
      console.log('the params are::::::::', params);
      this._sellerId = params[ 'sellerId' ];
      this._slugId = params[ 'slugId' ];

      this._getDataForUser();

    });


  }

  public sendOffer() : void {
    this._buyerService.sendOffer().takeWhile(() => {

    }).subscribe(( data ) => {
      console.log('the data is :::', data);

    });
  }


}
