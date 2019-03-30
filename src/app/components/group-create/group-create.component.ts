import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Group } from 'src/app/model/group.model';
import { Caracter } from 'src/app/model/caracter.model';
import { GroupCreate, AppState } from 'src/app/store';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  group$: Observable<Group>;
  private group: Group;
  private formGroupSub: Subscription;
  private storeSub: Subscription;

  columns = ['name'];
  caractersColumns = ['name', 'hp', 'add'];
  actions = [
    {
      name: 'add',
      header: 'Ajouter',
      icon: 'add',
      isDisabled: (c) => false,
    }
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private location: Location,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [''],
    });
    this.group$ = this.store.pipe(
      select(GroupCreate.selectors.selectGroup),
      tap((group) => {
        this.group = group;
      }),
    );
    this.formGroupSub = this.formGroup.valueChanges.subscribe(
      (value) => {
        this.store.dispatch(new GroupCreate.actions.Set({
          name: value.name,
          members: this.group.members,
        }))
      }
    );
    this.storeSub = this.store.pipe(
      select(GroupCreate.selectors.selectGroup),
    ).subscribe(
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

  onAction({ action, caracter }: { action: string, caracter: Caracter }): void {
    switch (action) {
      case 'add':
        this.addMember(caracter, this.group);
        break;

      default:
        break;
    }
  }

  saveGroup() {
    this.store.dispatch(new GroupCreate.actions.Save(this.group));
  }

  cancel() {
    this.location.back();
  }

  reset() {
    this.store.dispatch(new GroupCreate.actions.Reset());
  }

  private addMember(caracter: Caracter, group: Group) {
    const members = group.members;
    if (!members.some((c) => c._id === caracter._id)) {
      this.store.dispatch(new GroupCreate.actions.Set({
        members: [...members, caracter],
      }));
    }
  }

}
