import { Component, OnInit, Input, ViewChild, Output, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import { Observable, Subscription, merge } from 'rxjs';
import { Caracter } from 'src/app/model/caracter.model';
import { CaracterPageMeta, CaracterPageRequest } from 'src/app/model/caracter-page.model';
import { FormControl } from '@angular/forms';
import { MatSort, MatPaginator } from '@angular/material';
import { AppState, caracterPageCaracters, caracterPageMeta, caracterPageStale, CaracterPageLoad } from 'src/app/store';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

interface Action {
  name: string;
  header: string;
  icon: string;
  isEnabled?: boolean | ((c: Caracter) => boolean);
}

@Component({
  selector: 'app-caracter-table',
  templateUrl: './caracter-table.component.html',
  styleUrls: ['./caracter-table.component.css']
})
export class CaracterTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() columns = ['name', 'hp', 'ca', 'dext_mod', 'strength_mod'];
  @Input() actions = [];
  @Output() action = new EventEmitter<{ action: string, caracter: Caracter }>();

  filterControl: FormControl = new FormControl('');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  caracters$: Observable<Caracter[]>;
  meta$: Observable<CaracterPageMeta>;
  private stalePageSub: Subscription;
  private metaPageSub: Subscription;
  private controlSub: Subscription;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.caracters$ = this.store.select(caracterPageCaracters);
    this.meta$ = this.store.select(caracterPageMeta);

    this.stalePageSub = this.store.select(caracterPageStale).subscribe(
      (stale) => {
        if (stale) {
          this.loadPage();
        }
      }
    );

    this.metaPageSub = this.meta$.subscribe(
      (meta) => {
        if ((meta.dataSize === 0) && (meta.totalCount > 0) && (meta.pageOffset >= meta.pageSize)) {
          this.paginator.pageIndex--;
          this.loadPage();
        }
      }
    );

    setTimeout(() => this.loadPage(), 0);
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
    if (this.stalePageSub) {
      this.stalePageSub.unsubscribe();
    }
    if (this.metaPageSub) {
      this.metaPageSub.unsubscribe();
    }
    if (this.controlSub) {
      this.controlSub.unsubscribe();
    }
  }

  onClick(action: Action, caracter: Caracter) {
    this.action.emit({
      action: action.name,
      caracter
    });
  }

  isDisabled(action: Action, caracter: Caracter) {
    let enabled = true;
    if (action.isEnabled) {
      if (typeof action.isEnabled === 'boolean') {
        enabled = action.isEnabled;
      } else {
        enabled = action.isEnabled(caracter);
      }
    }
    return !enabled;
  }

  private loadPage() {
    this.store.dispatch(new CaracterPageLoad(
      new CaracterPageRequest(
        this.filterControl.value,
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageSize,
        this.sort.direction ? this.sort.active : '',
        this.sort.direction
      )
    ));
  }

}
