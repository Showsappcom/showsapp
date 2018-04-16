import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * The validation class for scheduling feature
 * The angular reactive form uses the validation methods for each FormGroup
 * @export
 * @class ScheduleValidator
 */
export class ScheduleValidator {

 /**
  * Custom validator for daily recurrent event. Checks the everyXDays value
  * @static
  * @param {AbstractControl} form 
  * @returns {ValidatorFn} 
  * @memberof ScheduleValidator
  */
 static everyXDaysValidation(form : FormGroup) : ValidatorFn {

   let numberRegex = new RegExp(/^[1-9]\d*$/);
   if (form.parent && form.parent.controls['recurrence'].value === 'daily') {
     if (form.value.days === 'everyXDays') {

       if (form.get('everyXDays').value && numberRegex.test(form.get('everyXDays').value)) {
         return null;
       } else {
         form.get('everyXDays').setErrors({ required: true });
       }
     } else {
       form.get('everyXDays').setErrors(null);
       return null;
     }
   }
   return null;
  }

/**
 * To check the end date selections are valid
 * @static
 * @param {AbstractControl} form 
 * @returns {ValidatorFn} 
 * @memberof ScheduleValidator
 */
static endDateValidation(form : FormGroup) : ValidatorFn {

  if (form.parent && form.parent.controls['recurrence'].value !== 'once') {
    if (form.value.dateType === 'datevalue') {
      if (form.get('dateSelected').value) {
        return null;
      } else {
        form.get('dateSelected').setErrors({ required: true });
      }
    } else if (form.value.dateType === 'occurrenceEnd') {
      if (form.get('occurenceNumber').value) {
        return null;
      } else {
        form.get('occurenceNumber').setErrors({ required: true });
      }
    }    
   
  }
  return null;
}

/**
 * To check the week recurrence is valid
 * @static
 * @param {FormGroup} form 
 * @returns {ValidatorFn} 
 * @memberof ScheduleValidator
 */
static weekValidation(form : FormGroup) : ValidatorFn {
 return null;
}

/**
 * Checks the monthly recurrence is valid form
 * @static
 * @param {FormGroup} form 
 * @returns {ValidatorFn} 
 * @memberof ScheduleValidator
 */
static monhlyEventValidation(form : FormGroup) : ValidatorFn {
  let numberRegex = new RegExp(/^(1[0-2]|[1-9])$/);
  if (form.parent && form.parent.controls['recurrence'].value === 'monthly') {
    
    if (form.value.monthlyType === 'everyXMonths') {

      if (form.get('xDays').value && form.get('xMonths').value) {
        return null;
      } else if (!form.get('xDays').value) {
        form.get('xDays').setErrors({ required: true });
      } else {
        form.get('xMonths').setErrors({ required: true });
      }
      
    } else if (form.value.monthlyType === 'weekDay') {
      if (form.get('monthNumber').value && numberRegex.test(form.get('monthNumber').value)) {
        return null;
      } else {
        form.get('monthNumber').setErrors({ required: true });
      }
    }

  }
  return null;
 }

 /**
  * Checks the yearly recurrence is valid form
  * @static
  * @param {FormGroup} form 
  * @returns {ValidatorFn} 
  * @memberof ScheduleValidator
  */
  static yearlyEventValidation(form : FormGroup) : ValidatorFn {

    let monthsRegex = new RegExp(/^(1[0-2]|[1-9])$/);
    let monthDatesRegex = new RegExp(/^(3[01]|[12][0-9]|[1-9])$/);

    if (form.parent && form.parent.controls['recurrence'].value === 'yearly') {

      if (form.get('everyXYears').value && form.get('everyXYears').value) {
        if (form.value.yearOccurence === 'month') {
          if (form.get('monthDate').value && monthDatesRegex.test(form.get('monthDate').value)) {
            return null;
          } else {
            form.get('monthDate').setErrors({ required: true });
          }
        } else if (form.value.yearOccurence === 'date') {
          if (form.get('monthNumber').value && monthsRegex.test(form.get('monthNumber').value)) {
            return null;
          } else {
            form.get('monthNumber').setErrors({ required: true });
          }
        }
      } else {
        form.get('everyXYears').setErrors({ required: true });
      }
      
    }
    return null;
 } 
}

