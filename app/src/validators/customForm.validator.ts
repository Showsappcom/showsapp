import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomFormValidator {

  static IPValidator() : ValidatorFn {

    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      let ipRegex = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);

      if (value !== '' && !ipRegex.test(value)) {
        return { 'ip': true };
      }
      else {
        return null;
      }
    };
  }

  static NumberRangeValidator( min : number, max : number ) : ValidatorFn {

    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      if (!value.toString() || isNaN(value) || /\D/.test(value.toString())) {

        return { 'number': true };
      }
      else if (!isNaN(min) && !isNaN(max)) {
        return value < min || value > max ? { 'number': true } : null;
      }
      else if (!isNaN(min)) {
        return value < min ? { 'number': true } : null;
      }
      else if (!isNaN(max)) {
        return value > max ? { 'number': true } : null;
      }
      else {
        return null;
      }

    };

  }

  static ConfirmPasswordValidator() : ValidatorFn {

    return ( control : AbstractControl ) : { [key : string] : any } => {

      let value, formEl;
      value = control.value;
      formEl = control.root.get('resetPassword');

      if (formEl !== null) {

        if (value === formEl.value) {
          return null;
        }
        else {
          return { 'confirm': true };
        }
      }
    };

  }

  static ValidatePassword() : ValidatorFn {

    return (control : AbstractControl) : { [key : string] : any } => {
      let value, numCount, specChar, min, max, minNum, minChar, formEl, charCount, upperCase, minUpperCase, spaceChar, encodeChar, prohibhitChar, encodeurlChar;
      value = control.value;
      formEl = control.root;

      numCount = value.replace(/[^0-9]/g, '').length;
      charCount = value.replace(/^\[|\!|\"|\#|\$|\'|\(|\)|\*|\,|\\|\-|\.|\/|\:|\;|\<|\=|\>|\?|\@|\[|\]|\^|\_|\`|\{|\||\}|\~|\]/g, '').length;
      upperCase = value.replace(/[^A-Z]/g, '').length;
      spaceChar = (value.match(new RegExp(' ', 'g')) || []).length;
      encodeChar = (value.match(new RegExp(/&/, 'g')) || []).length;
      encodeurlChar = (value.match(new RegExp(/%/, 'g')) || []).length;
      prohibhitChar = (value.match(new RegExp(/\+/, 'g')) || []).length;
      value = control.value;
      if (value !== undefined || value !== '') {
        specChar = value.length - charCount;
      }
      if (formEl.get('minimumLength') !== null) {
        min = formEl.get('minimumLength').value;

      }
      if (formEl.get('maximumLength') !== null) {
        max = formEl.get('maximumLength').value;

      }
      if (formEl.get('minimumNumber') !== null) {
        minNum = formEl.get('minimumNumber').value;

      }
      if (formEl.get('minimumSpecial') !== null) {
        minChar = formEl.get('minimumSpecial').value;
      }
      if (formEl.get('minimumUpper') !== null) {
        minUpperCase = formEl.get('minimumUpper').value;
      }

      if (value.length > max || value.length < min) {
        return { 'password': true };
      }
      else if (numCount < minNum) {
        return { 'password': true };
      }
      else if (specChar < minChar) {
        return { 'password': true };
      }
      else if (upperCase < minUpperCase) {
        return { 'password': true };
      }
      else if (spaceChar > 0) {
        return { 'password': true };
      }
      else if (encodeChar > 0) {
        return { 'password': false };
      }
      else if (encodeurlChar > 0) {
        return { 'password': false };
      }
      else if (prohibhitChar > 0) {
        return { 'password': false };
      }
      else {
        return null;
      }

    };

  }

  static DynamicDateFormatValidator( formElName : string ) : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let formatFormEl;
      let format;
      if (control.parent) {
        formatFormEl = control.parent.controls[ formElName ];
      }

      if (formatFormEl) {
        format = formatFormEl.value;
      }

      return this._validateDateFormat(format, control.value);
    };
  }

  static DateFormatValidator( format : string ) : ValidatorFn {

    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      return this._validateDateFormat(format, value);
    };

  }

  static _validateDateFormat( format : string, value : string ) {
    let result = null;

    if (value !== '') {
      switch (format) {

        case 'yyyy-mm-dd':
          result = /^(19|20|21)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value.toString()) ? null : { 'date': true };
          break;

        case 'dd mm yyyy':
          result = /^(0[1-9]|[12][0-9]|3[01])\s(0[1-9]|1[012])\s(19|20|21)\d\d$/.test(value.toString()) ? null : { 'date': true };
          break;

        case 'mm/dd/yy':
          result = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/([0-9][0-9])$/.test(value.toString()) ? null : { 'date': true };
          break;

        case 'dd/mm/yy':
          result = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/([0-9][0-9])$/.test(value.toString()) ? null : { 'date': true };
          break;

        default: // default is yyy-mm-dd
          result = /^(19|20|21)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value.toString()) ? null : { 'date': true };
          break;
      }
    }

    return result;
  }

  static TimeFormatValidator( format : string ) : ValidatorFn {

    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      let result = null;
      format = format.toLowerCase();
      if (value && value !== '') {
        switch (format) {

          case 'hh:mm:ss am/pm':
            result = /^(0?[1-9]|1[012])(:[0-5]\d)(:[0-5]\d)\s[AP][M]$/.test(value.toString()) ? null : { 'time': true };
            break;

          case 'hh:mm:ss':
            result = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5]\d)$/.test(value.toString()) ? null : { 'time': true };
            break;

          case 'hh:mm:ss:ms':
            result = /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5]\d)(:[0-9][0-9]?[0-9]?)$/.test(value.toString()) ? null : { 'time': true };
            break;

          case 'hh:mm am/pm':
            result = /^(0?[1-9]|1[012])(:[0-5]\d)\s[AP][M]$/.test(value.toString()) ? null : { 'time': true };
            break;

          case 'hh:mm':
            result = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value.toString()) ? null : { 'time': true };
            break;

          default: // default is hh:mm:ss am/pm
            result = /^(0?[1-9]|1[012])(:[0-5]\d)(:[0-5]\d)\s[AP][M]$/.test(value.toString()) ? null : { 'time': true };
            break;
        }
      }

      return result;

    };

  }

  static durationValidator( control : any ) {

    let value = control.value;

    if (value >= 0 && value <= 59) {
      // console.log('valeeee', value);
      return null;
    }
    else {
      // console.log('valeeee123', value);
      return { 'invalid': true };
    }

  }

  static NtpValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      let ipRegex = new RegExp(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);

      if (value !== '' && !ipRegex.test(value)) {
        return { 'domain': true };
      }
      else {
        return null;
      }
    };
  }

  static MinMaxValidator( min : number, max : number ) : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value;
      value = control.value;
      if (!isNaN(min) && !isNaN(max)) {
        return value.length < min || value.length > max ? { 'number': true } : null;
      }
    };
  }

  static DuplicateNameValidator( items : Array<any> ) : ValidatorFn {

    return ( control : AbstractControl ) : { [key : string] : any } => {
        let value = control.value;
        if (items.length !== 0) {
          for (let i = 0; i < items.length; ++i) {
            if (value === items[i]['name'] && !items[i]['isEditing']) {
              return { 'duplicate': true };
            }
           }
        }
        return null;

      };
  }

  static EmailValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      let ipRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      if (value !== '' && !ipRegex.test(value)) {
        return { 'email': true };
      }
      else {
        return null;
      }
    };
  }

  static UserFirstNameValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      let nameRegex = new RegExp(/^([a-zA-Z]){0,32}$/);

      if (value !== '' && !nameRegex.test(value)) {
        return { 'firstName': true };
      }
      else {
        return null;
      }
    };
  }

  static UserNameValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value, avoidCharacters;
       value = control.value;
      let nameRegex = new RegExp(/^[^\\.][ a-zA-Z_\/\'\\-\\.'0-9]{0,32}$/);
      avoidCharacters = (value.match(new RegExp(/\./, 'g')) || []).length;

      if (value !== '' && !nameRegex.test(value)) {
        return { 'userName': true };
      }
      else if (value[value.length - 2] === '.') {
        value = value.slice(0, -1);
        return { 'userName': false };
      }
      else {
        return null;
      }
    };
  }

  static NumberValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      let ipRegex = new RegExp(/^\d*$/);

      if (value !== '' && !ipRegex.test(value)) {
        return { 'number': true };
      }
      else {
        return null;
      }
    };
  }

  static DoubleValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value;
      let ipRegex = new RegExp(/^-?\d*(\.\d+)?$/);

      if (value !== '' && !ipRegex.test(value)) {
        return { 'double': true };
      }
      else {
        return null;
      }
    };
  }

  static PhoneNumberValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value ;
      let ipRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);

      if (value !== '' && !ipRegex.test(value)) {
        return { 'phoneNumber': true };
      }
      else {
        return null;
      }
    };
  }

  static InternationalPhoneNumberValidator() : ValidatorFn {
    return ( control : AbstractControl ) : { [key : string] : any } => {
      let value = control.value ;
      let ipRegex = new RegExp(/^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$/);

      if (value !== '' && !ipRegex.test(value)) {
        return { 'internationalPhoneNumber': true };
      }
      else {
        return null;
      }
    };
  }
}
