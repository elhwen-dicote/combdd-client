import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, CaracterEditLoad, caracterEditCaracter } from 'src/app/store';
import { CaracterEditSave } from 'src/app/store/caracter-edit/caracter-edit.actions';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Caracter } from 'src/app/model/caracter.model';
import { Location } from '@angular/common';

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
    private location:Location,
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
      this.store.dispatch(new CaracterEditLoad(params.get('id')));
    });
    this.storeSub = this.store.select(caracterEditCaracter).subscribe(
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
      this.store.dispatch(new CaracterEditSave({
        _id: this.caracter._id,
        ...this.formGroup.value.caracter,
      }));
    }
    this.router.navigate(['/caracter-list']);
  }

  reset() {
    this.formGroup.setValue({caracter:this.caracter});
  }

  cancel() {
    this.location.back();
  }

}
