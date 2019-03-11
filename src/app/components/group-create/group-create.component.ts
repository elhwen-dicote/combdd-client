import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, groupCreateGroup } from 'src/app/store';
import { GroupCreateSet } from 'src/app/store/group-create/group-create.actions';
import { CaracterGroup } from 'src/app/model/caracter-group.model';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  group$ : Observable<CaracterGroup>;
  private formGroupSub: Subscription;
  private storeSub: Subscription;

  columns = ['name'];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [''],
    });
    this.group$ = this.store.select(groupCreateGroup);
    this.formGroupSub = this.formGroup.valueChanges.subscribe(
      (value) => {
        this.store.dispatch(new GroupCreateSet({
          name: value.name,
          members: [],
        }))
      }
    );
    this.storeSub = this.store.select(groupCreateGroup).subscribe(
      (group) => {
        this.formGroup.setValue({
          name: group.name,
        }, {
            emitEvent: false,
          });
      },
    );
  }

  ngOnDestroy(): void {
    if (this.formGroupSub) {
      this.formGroupSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
