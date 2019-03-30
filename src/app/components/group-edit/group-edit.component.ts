import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from 'src/app/model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, GroupEdit } from 'src/app/store';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit,OnDestroy {

  formGroup: FormGroup;
  private group: Group;
  private paramsSub: Subscription;
  private storeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router:Router,
    private location:Location,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      group: {
        name: '',
        members: [],
      }
    });

    this.paramsSub = this.route.paramMap.subscribe(
      params => {
        this.store.dispatch(new GroupEdit.actions.Load(params.get('id')));
      }
    );
    this.storeSub = this.store.pipe(
      select(GroupEdit.selectors.selectGroup),
    ).subscribe(
      group => {
        this.group = group;
        this.formGroup.setValue({ group }, { emitEvent: false, });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  saveGroup() {
    if (this.group._id) {
      this.store.dispatch(new GroupEdit.actions.Save({
        _id:this.group._id,
        ...this.formGroup.value.group,
      }));
    }
    this.router.navigate(['group-list']);
  }

  reset() {
    this.formGroup.setValue({group:this.group});
  }

  cancel() {
    this.location.back();
  }

}
