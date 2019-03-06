import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSort, MatPaginator, _MatSortHeaderMixinBase } from '@angular/material';

import { Store } from '@ngrx/store';
import { merge, Observable, Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AppState, CaracterPageLoad, caracterPageCaracters, caracterPageTotalCount, caracterPageStale, caracterPageMeta, } from 'src/app/store';
import { CaracterPageRequest, CaracterPageMeta } from 'src/app/model/caracter-page.model';
import { Caracter } from 'src/app/model/caracter.model';
import { CaracterPageDelete } from 'src/app/store/caracter-page/caracter-page.actions';

@Component({
  selector: 'app-caracter-list',
  templateUrl: './caracter-list.component.html',
  styleUrls: ['./caracter-list.component.css']
})
export class CaracterListComponent implements OnInit, OnDestroy, AfterViewInit {

  filterControl: FormControl = new FormControl('');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  page$: Observable<Caracter[]>;
  total$: Observable<number>;
  meta$ : Observable<CaracterPageMeta>;
  columns = ['name', 'hp', 'ca', 'dext_mod', 'strength_mod', 'edit', 'delete'];
  private stalePageSubscription: Subscription;
  private metaPageSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.page$ = this.store.select(caracterPageCaracters);
    this.total$ = this.store.select(caracterPageTotalCount);
    this.meta$ = this.store.select(caracterPageMeta);
    this.stalePageSubscription = this.store.select(caracterPageStale).subscribe(
      (stale) => {
        if (stale) {
          this.loadPage();
        }
      },
    );
    this.metaPageSubscription = this.store.select(caracterPageMeta).subscribe(
      (meta) => {
        if ((meta.dataSize === 0) && (meta.pageOffset >= meta.pageSize)) {
          this.paginator.pageIndex--;
          this.loadPage();
        }
      }
    );
    setTimeout(() => this.loadPage(), 0);
  }

  ngAfterViewInit(): void {
    merge(
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
    if (this.stalePageSubscription) {
      this.stalePageSubscription.unsubscribe();
    }
    if (this.metaPageSubscription) {
      this.metaPageSubscription.unsubscribe();
    }
  }

  newCaracter() {
    this.router.navigate(['caracter-create']);
  }

  deleteCaracter(id: string) {
    this.store.dispatch(new CaracterPageDelete(id));
  }

  editCaracter(id: string) {
    this.router.navigate(['caracter-edit',id]);
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
