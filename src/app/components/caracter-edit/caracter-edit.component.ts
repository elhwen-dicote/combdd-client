import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, CaracterEdit, } from 'src/app/store';
import { Caracter } from 'src/app/model/caracter.model';

@Component({
  selector: 'app-caracter-edit',
  templateUrl: './caracter-edit.component.html',
  styleUrls: ['./caracter-edit.component.css']
})
export class CaracterEditComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  private caracter: Caracter;
  private paramsSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      caracter: {
        name: '',
        ca: 0,
        maxHp: 0,
        hp: 0,
        dext_mod: 0,
        strength_mod: 0,
      },
    });
    this.paramsSub = this.route.paramMap.subscribe((params) => {
      this.store.dispatch(new CaracterEdit.actions.Load(params.get('id')));
    });
    this.storeSub = this.store.select(CaracterEdit.selectors.selectCaracter).subscribe(
      (caracter) => {
        this.caracter = caracter;
        this.formGroup.setValue({ caracter }, { emitEvent: false });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
  }

  saveCaracter() {
    if (this.caracter._id) {
      this.store.dispatch(new CaracterEdit.actions.Save({
        _id: this.caracter._id,
        ...this.formGroup.value.caracter,
      }));
    }
    this.router.navigate(['/caracter-list']);
  }

  reset() {
    this.formGroup.setValue({ caracter: this.caracter });
  }

  cancel() {
    this.location.back();
  }

}
