import { Pipe, PipeTransform, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Pipe({
  name: 'validation',
  standalone: true,
})
export class ValidationPipe implements PipeTransform {
  formGroup = inject(FormGroupDirective, { optional: true })?.control;
  transform(control: any, errors: any, customMessage?: string): string {
    if (!errors) return '';

    if (customMessage) {
      return customMessage;
    }

    if (
      errors instanceof Object &&
      errors[Object.keys(errors)[0]] instanceof Object &&
      errors[Object.keys(errors)[0]].hasOwnProperty('message') &&
      errors[Object.keys(errors)[0]].message
    ) {
      return errors[Object.keys(errors)[0]].message;
    }

    const controlName =
      (control as any)._name ??
      (this.formGroup?.controls ? Object.keys(this.formGroup.controls).find(
        (name) => this.formGroup?.get(name) === control,
      ) : 'Field');

    return `${controlName || 'Field'} is invalid`;
  }
}
