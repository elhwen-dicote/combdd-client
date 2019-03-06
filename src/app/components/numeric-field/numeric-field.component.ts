import { Component, OnInit, OnDestroy, Input, HostBinding, Optional, Self, ElementRef, ViewChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';

const intRe = /^[-\+]?\d+$/;

@Component({
  selector: 'app-numeric-field',
  templateUrl: './numeric-field.component.html',
  styleUrls: ['./numeric-field.component.css'],
  providers: [
    //   {
    //     provide: NG_VALUE_ACCESSOR,
    //     useExisting: NumericComponent,
    //     multi: true,
    //   },
    {
      provide: MatFormFieldControl,
      useExisting: NumericFieldComponent,
    }
  ],
})
export class NumericFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private static nextId = 0;

  // Input... value, disabled
  @Input()
  get value() {
    return this._value;
  }
  set value(value: number | '') {
    if (value !== this._value) {
      this.writeValue(value);
      this._onChange(value);
      this._onTouched();
      this.stateChanges.next();
    }
  }
  private _value: number | '';

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(ph: string) {
    this._placeholder = ph;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  stateChanges = new Subject<void>();
  focused = false;
  get empty() {
    return this._value === '';
  }
  errorState = false;
  controlType = 'app-numeric';

  @HostBinding() id = `app-numeric-${NumericFieldComponent.nextId++}`;
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @HostBinding('attr.aria-describedby') describedBy = '';

  // element input numeric
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  // Etat ControlValueAccessor
  private _onChange: (value: number | '') => void = (value: number | '') => { };
  private _onTouched: () => void = () => { };

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elt: ElementRef,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.fm.monitor(this.elt.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    })
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elt.nativeElement);
  }

  increment() {
    if (this.value !== '') {
      this.value++;
    } else {
      this.value = 1;
    }
  }

  decrement() {
    if (this.value !== '') {
      this.value--;
    } else {
      this.value = -1;
    }
  }

  onInput(elt: HTMLInputElement) {
    const newValue = this._check(elt.value);
    if (newValue !== null) {
      this._value = newValue;
      this._onChange(newValue);
    } else {
      elt.value = this.value.toString(10);
    }
  }

  onBlur() {
    this._onTouched();
  }

  // implementation ControlValueAccessor
  writeValue(obj: any) {
    this._value = (typeof obj === 'number') ? obj : (Number(obj) || '');
    this.input.nativeElement.value = this._value.toString(10);
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // implementation MatFormFieldControl
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if (event.target !== this.input.nativeElement) {
      this.input.nativeElement.focus();
    }
  }

  private _check(newVal: string): number {
    let rval = null;
    if (newVal === '') {
      rval = newVal;
    }
    if (intRe.test(newVal.trim())) {
      rval = Number(newVal);
    }
    return rval;
  }

}
