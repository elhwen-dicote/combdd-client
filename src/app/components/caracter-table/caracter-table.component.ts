import { Component, OnInit, Input, ViewChild, Output, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, MatPaginator } from '@angular/material';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, map, filter } from 'rxjs/operators';

import { Caracter } from 'src/app/model/caracter.model';
import { PageRequest } from 'src/app/model/page-request.model';
import { PageMeta } from 'src/app/model/page.model';
import { AppState, CaracterPage } from 'src/app/store';
import { TableAction } from 'src/app/util/table-action';

@Component({
  selector: 'app-caracter-table',
  templateUrl: './caracter-table.component.html',
  styleUrls: ['./caracter-table.component.css']
})
export class CaracterTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() columns = ['name', 'hp', 'ca', 'dext_mod', 'strength_mod'];
  @Input() actions = [];
  @Output() action = new EventEmitter<{
    action: string;
    caracter: Caracter;
  }>();

  filterControl: FormControl = new FormControl('');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  caracters$: Observable<Caracter[]>;
  meta$: Observable<PageMeta>;
  paginatorLength$: Observable<number>;
  paginatorPageSize$: Observable<number>;
  paginatorPageIndex$: Observable<number>;
  matSortActive$: Observable<string>;
  matSortDirection$: Observable<string>;

  private metaPageSub: Subscription;
  private controlSub: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new CaracterPage.actions.Load());

    this.caracters$ = this.store.pipe(
      select(CaracterPage.selectors.selectCaracters));
    this.meta$ = this.store.pipe(
      select(CaracterPage.selectors.selectMeta),
      filter(meta => !!meta),
    );
    this.paginatorLength$ = this.meta$.pipe(
      map(meta => meta.totalCount),
    );
    this.paginatorPageSize$ = this.meta$.pipe(
      map(meta => meta.pageSize),
    );
    this.paginatorPageIndex$ = this.meta$.pipe(
      map(meta => meta.pageOffset / meta.pageSize),
    );
    this.matSortActive$ = this.meta$.pipe(
      map(meta => meta.sortBy),
    );
    this.matSortDirection$ = this.meta$.pipe(
      map(meta => meta.sortOrder),
    );

    this.metaPageSub = this.meta$.subscribe((meta) => {
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
    if (this.metaPageSub) {
      this.metaPageSub.unsubscribe();
    }
    if (this.controlSub) {
      this.controlSub.unsubscribe();
    }
  }

  onClick(action: TableAction<Caracter>, caracter: Caracter) {
    this.action.emit({
      action: action.name,
      caracter
    });
  }

  private loadPage() {
    this.store.dispatch(new CaracterPage.actions.LoadRequest(
      new PageRequest(
        this.filterControl.value,
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageSize,
        this.sort.direction ? this.sort.active : '',
        this.sort.direction
      )
    ));
  }

}
