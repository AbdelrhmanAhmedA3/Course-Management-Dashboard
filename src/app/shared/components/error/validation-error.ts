import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { EMPTY, map, switchMap } from 'rxjs';
import { ValidationPipe } from './pipe/validation.pipe';

@Component({
  selector: 'validation-error',
  imports: [ValidationPipe],
  template: `
    @if (isVisible()) {
      <span class="text-red-600">{{ control() | validation: errors() : message() }}</span>
    }
  `,
  styleUrl: './validation-error.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationError {
  control = input.required<AbstractControl | FormControl>();
  message = input<string>();
  private formDir = inject(FormGroupDirective, { optional: true });

  private controlEvent = toSignal(
    toObservable(this.control).pipe(switchMap((res) => res.events)),
  );

  private submitted = toSignal(
    this.formDir?.ngSubmit.pipe(map(() => true)) ?? EMPTY,
    { initialValue: false },
  );

  protected isVisible = computed(() => {
    this.controlEvent();
    const ctrl = this.control();
    return ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted());
  });

  protected errors = computed(() => {
    this.controlEvent();
    console.log(this.control().errors);

    return this.control().errors;
  });
}
