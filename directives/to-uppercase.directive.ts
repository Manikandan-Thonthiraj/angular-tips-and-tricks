import {
  A,
  Z,
} from '@angular/cdk/keycodes';
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  OnInit,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[toUppercase]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToUppercaseDirective),
      multi: true,
    },
  ],
})
export class ToUppercaseDirective implements ControlValueAccessor {
  /** implements ControlValueAccessorInterface */
  _onChange: (_: any) => void;

  /** implements ControlValueAccessorInterface */
  _touched: () => void;

  constructor( @Self() private _el: ElementRef, private _renderer: Renderer2) { }

  /** Trata as teclas */
  @HostListener('keyup', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    const value = this._el.nativeElement.value.toUpperCase();
    this._renderer.setProperty(this._el.nativeElement, 'value', value);
    this._onChange(value);
    evt.preventDefault();
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this._touched();
  }

  /** Implementation for ControlValueAccessor interface */
  writeValue(value: any): void {
    this._renderer.setProperty(this._el.nativeElement, 'value', value);
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  registerOnTouched(fn: () => void): void {
    this._touched = fn;
  }

  /** Implementation for ControlValueAccessor interface */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._el.nativeElement, 'disabled', isDisabled);
  }
}
