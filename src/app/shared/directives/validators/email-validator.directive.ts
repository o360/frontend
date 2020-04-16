import {
  Directive,
  forwardRef
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import * as EmailValidator from 'email-validator';

@Directive({
  selector: '[email][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidatorDirective),
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  public validate(c: AbstractControl): ValidationErrors {
    return EmailValidator.validate(c.value)
      ? null
      : { email: true };
  }
}
