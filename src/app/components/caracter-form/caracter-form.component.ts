import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

const noop = () => { };

@Component({
  selector: 'app-caracter-form',
  templateUrl: './caracter-form.component.html',
  styleUrls: ['./caracter-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CaracterFormComponent,
      multi: true,
    }
  ]
})
export class CaracterFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  caracterForm: FormGroup;

  private onChange: (_) => void = noop;
  private onTouched: () => void = noop;
  private valueChangeSub: Subscription;
  private statusChangeSub: Subscription;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.caracterForm = this.fb.group(
      {
        name: [''],
        ca: [''],
        maxHp: [''],
        hp: [''],
        dext_mod: [''],
        strength_mod: [''],
      }
    );
    this.valueChangeSub = this.caracterForm.valueChanges.subscribe(
      (value) => this.onChange(value),
    );
    this.statusChangeSub = this.caracterForm.statusChanges.subscribe(
      (status) => console.log(status),
    );
  }

  ngOnDestroy(): void {
    if (this.valueChangeSub) {
      this.valueChangeSub.unsubscribe();
    }
    if (this.statusChangeSub) {
      this.statusChangeSub.unsubscribe();
    }
  }

  @HostListener('blur') onBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.caracterForm.setValue(this.sanitizeValue(obj), { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.caracterForm.disable({ emitEvent: false })
    } else {
      this.caracterForm.enable({ emitEvent: false });
    }
  }

  private sanitizeValue(obj) {
    return obj ?
      {
        name: obj.name || '',
        ca: Number(obj.ca) || 0,
        maxHp: Number(obj.maxHp) || 0,
        hp: Number(obj.hp) || 0,
        dext_mod: Number(obj.dext_mod) || 0,
        strength_mod: Number(obj.strength_mod) || 0,
      }
      : {
        name: '',
        ca: '',
        maxHp: '',
        hp: '',
        dext_mod: '',
        strength_mod: '',
      };
  }

}
