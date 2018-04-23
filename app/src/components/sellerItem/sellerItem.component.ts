/**
 * Angular Imports
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Custom Services
 */
import { SellerItemService } from '../../services/sellerItem.service';


/**
 * Store
 */
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as BaseActions from '../../actions/base';


import { SELLER_ITEM_LIST as SellerItems } from '../../configurations/mocks/mockItemList';

@Component({
  templateUrl: './sellerItem.component.html'
})


export class SellerItemComponent {


  /**
   * @type {boolean} _compActive - provides reference when the comp is active
   */
  private _compActive : boolean = true;


  /**
   * @type {boolean} createItem - provides reference if template used for create item.
   */
  public createItem : boolean = true;

  /**
   * @type {boolean} formGenerated - provides reference if form group generated
   */
  public formGenerated : boolean = false;


  /**
   * Provide a reference for the reactive form group
   */
  public itemFormControl : FormGroup;

  /**
   * @type {string} _itemId - provides reference of item id
   */
  public _itemId : string;

  /**
   * @param {FormBuilder} _fb, form builder provider
   * @param {ActivatedRoute} _route, route provider
   * @param {SellerItemService} _sellerItemService, seller item service
   * @param {Store<fromRoot.State>} _store, store provider
   */
  constructor( private _fb : FormBuilder,
               private _route : ActivatedRoute,
               private _router : Router,
               private _sellerItemService : SellerItemService,
               private _store : Store<fromRoot.State> ) {

  }


  ngOnInit() {

    this._generateForm();
    this._determineOptions();

  }


  ngOnDestroy() {

    this._clearSubs();
  }


  private _determineOptions() : void {

    this._route.data.takeWhile(() => {
      return this._compActive;
    }).subscribe(( data ) => {

      console.log('the data is:::::', data);
      this.createItem = data[ 'create' ];


    });

    this._route.params.takeWhile(() => {
      return this._compActive;
    }).subscribe(( params ) => {
      console.log('the params are::::::::', params);
      this._itemId = params[ 'id' ];

    })


  }

  private _clearSubs() : void {
    this._compActive = false;
  }


  private _generateForm() : void {

    this.itemFormControl = this._fb.group({
      productName: [
        '',
        [ Validators.required ]
      ],
      description: [
        '',
        [ Validators.required ]
      ],
      address: [
        '',
        [ Validators.required ]
      ],
      price: [
        '',
        [ Validators.required ]
      ],
      goodFaithMoney: [
        ''
      ]
    });

    this.formGenerated = true;

  }

  public processItemAction() : void {
    if (this.createItem) {
      console.log('I will save item action ;......')

    } else {
      console.log('I will edit item action ;......')

    }
  }

  public close() : void {
    this._router.navigate([ 'app/main' ]);

  }

}
