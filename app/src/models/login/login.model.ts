export interface UserCredentialsModel {
  username : string;
  password : string;
}

export interface RegisterModel {
  first_name? : string;
  last_name? : string;
  email : string;
  password : string;
}

export interface PasswordModel {
  email : string;
  password : string;
  token : string;
}


