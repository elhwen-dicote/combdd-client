import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState, GroupPage } from 'src/app/store';
import { Group } from 'src/app/model';
import { TableAction } from 'src/app/util/table-action';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  columns = ['name', 'members', 'edit', 'delete'];
  actions: TableAction<Group>[] = [
    new TableAction<Group>('edit', '', 'edit'),
    new TableAction<Group>('delete', '', 'delete'),
  ];

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onAction({ action, group }: {
    action: string;
    group: Group;
  }): void {
    switch (action) {
      case 'delete': {
        this.deleteGroup(group._id);
      } break;

      case 'edit': {
        this.editGroup(group._id);
      } break;

      default:
        break;
    }

  }

  newGroup() {
    this.router.navigate(['group-create']);
  }

  deleteGroup(id: string): void {
    this.store.dispatch(new GroupPage.actions.Delete(id));
  }

  editGroup(id: string) {
    this.router.navigate(['group-edit', id])
  }

}
