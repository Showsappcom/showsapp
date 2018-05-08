export interface SellerItemObject {
  name : string;
  description : string;
  price : string;
  good_faith_money : string;
  requires_good_faith_money? : boolean;
  latitude? : number;
  longitude? : number;
  address : string;
}

export interface OfferItemObject {
  offer : string;
  accept : boolean;
}


export interface SellerItemModel {
  name : string;
  id : number;
  description : string;
  price : string;
  good_faith_money : string;
  requires_good_faith_money? : boolean;
  latitude? : number;
  longitude? : number;
  address : string;
}



