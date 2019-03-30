import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatSort, MatPaginator } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, shareReplay } from 'rxjs/operators';

import { Group, PageMeta, PageRequest } from 'src/app/model';
import { AppState, GroupPage } from 'src/app/store';

interface Action {
  name: string;
  header: string;
  icon: string;
  isEnabled?: boolean | ((c: Group) => boolean);
}

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css']
})
export class GroupTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() columns = ['name'];
  @Input() actions: Action[] = [];
  @Output() action = new EventEmitter<{
    action: string;
    group: Group;
  }>();

  filterControl: FormControl = new FormControl('');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  groups$: Observable<Group[]>;
  meta$: Observable<PageMeta>;

  private metaPageSub: Subscription;
  private controlSub: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new GroupPage.actions.Load());
    this.groups$ = this.store.pipe(
      select(GroupPage.selectors.selectGroups),
    );
    this.meta$ = this.store.pipe(
      select(GroupPage.selectors.selectMeta),
      shareReplay(1),
    );
    this.metaPageSub = this.meta$.subscribe(meta => {
      if (meta) {
        this.filterControl.setValue(meta.filter, {
          emitEvent: false,
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.controlSub = merge(
      this.filterControl.valueChanges.pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        }),
      ),
      this.sort.sortChange,
      this.paginator.page,
    ).subscribe(() => {
      this.loadPage();
    });
  }

  ngOnDestroy(): void {
    if (this.controlSub) {
      this.controlSub.unsubscribe();
    }
    if (this.metaPageSub) {
      this.metaPageSub.unsubscribe();
    }
  }

  onClick(action: Action, group: Group) {
    this.action.emit({
      action: action.name,
      group
    });
  }

  isDisabled(action: Action, group: Group) {
    let enabled = true;
    if (action.isEnabled) {
      if (typeof action.isEnabled === 'boolean') {
        enabled = action.isEnabled;
      } else {
        enabled = action.isEnabled(group);
      }
    }
    return !enabled;
  }

  membersAsString(group: Group): string {
    const members = group.members;
    let result = `${members.length} membres: ${members.map(member => member.name).join(', ')}`;
    if (result.length > 40) {
      result = result.substr(0,37) + '...';
    }
    return result;
  }

  private loadPage() {
    this.store.dispatch(new GroupPage.actions.LoadRequest(
      new PageRequest(
        this.filterControl.value,
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
      ),
    ));
  }

}
