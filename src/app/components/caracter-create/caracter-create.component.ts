import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, CaracterCreate, } from 'src/app/store';

@Component({
  selector: 'app-caracter-create',
  templateUrl: './caracter-create.component.html',
  styleUrls: ['./caracter-create.component.css']
})
export class CaracterCreateComponent implements OnInit {
  formGroup: FormGroup;
  private formSubscription: Subscription;
  private storeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      caracter: {
        name: [''],
        ca: [0],
        maxHp: [0],
        hp: [0],
        dext_mod: [0],
        strength_mod: [0],
      }
    });
    this.formSubscription = this.formGroup.valueChanges.subscribe(
      (value) => {
        this.store.dispatch(new CaracterCreate.actions.Set(value.caracter));
      }
    );
    this.storeSubscription = this.store.select(CaracterCreate.selectors.selectCaracter).subscribe(
      (caracter) => {
        this.formGroup.setValue({ caracter }, { emitEvent: false, });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  saveCaracter() {
    this.store.dispatch(new CaracterCreate.actions.Save(this.formGroup.value.caracter));
    this.router.navigate(['/caracter-list']);
  }

  reset() {
    this.store.dispatch(new CaracterCreate.actions.Reset());
  }

  cancel() {
    this.location.back();
  }

}
