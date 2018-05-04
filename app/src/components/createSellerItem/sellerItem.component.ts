/**
 * Angular Imports
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Constants
 */
import {APP_SETUP} from '../../configurations/app.configuration'

/**
 * Custom Services
 */
import { SellerItemService } from '../../services/sellerItem.service';

/**
 * Custom Validators
 */
import {CustomFormValidator} from '../../validators/customForm.validator';

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
   * Provide a reference for if an item was created
   */
  public itemCreated : boolean = false;

  /**
   * Provide a reference for the item link
   */
  public itemLink : string;
  /**
   * @type {string} _itemId - provides reference of item id
   */
  private _itemId : string;

  /**
   * @param {FormBuilder} _fb, form builder provider
   * @param {ActivatedRoute} _route, route provider
   * @param {Router} _router, provides router
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

    });


  }

  private _clearSubs() : void {
    this._compActive = false;
  }


  private _generateForm() : void {

    this.itemFormControl = this._fb.group({
      name: [
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
        [
          Validators.required,
          CustomFormValidator.NumberRangeValidator(1, 1000000)

        ]
      ],
      good_faith_money: [
        '0'
      ],
      longitude: [
        '0'
      ],
      latitude: [
        '0'
      ]

    });

    this.formGenerated = true;

  }

  public processItemAction() : void {
    if (this.createItem) {

      this._sellerItemService.saveItem(this.itemFormControl.value).takeWhile(() => {
        return this._compActive;
      }).subscribe(( res : any ) => {
        console.log('the res for create item is...', res);
        this.itemCreated = true;
        this.itemLink = APP_SETUP.domain+'/item/' + res[ 'url' ];
        // this.close();
      });

    } else {
      console.log('I will edit item action ;......');

    }
  }

  public close() : void {
    this._router.navigate([ 'app/main' ]);

  }


}
