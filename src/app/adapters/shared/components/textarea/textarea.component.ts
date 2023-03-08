import {
  Component,
  forwardRef,
  Injector,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export type AutoSize = {
  minRows?: number;
  maxRows?: number;
};

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextareaComponent),
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;
  @Input() formControl?: FormControl;
  @Input() formControlName!: string;

  @Input() autosize: string | boolean | AutoSize = '';

  @Input() placeholder: string = '';

  onChange: (value: string) => void = () => {};

  constructor(private injector: Injector) {}

  get control(): FormControl<any> {
    return (
      this.formControl ??
      (this.controlContainer.control!.get(this.formControlName) as FormControl)
    );
  }

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    const { setDisabledState } = this.formControlDirective.valueAccessor ?? {};
    if (setDisabledState) setDisabledState(isDisabled);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }
}
