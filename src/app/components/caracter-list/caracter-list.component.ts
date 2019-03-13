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
export class CaracterListComponent implements OnInit {

  columns = ['name', 'hp', 'ca', 'dext_mod', 'strength_mod', 'edit', 'delete'];
  actions = [
    {
      name: 'edit',
      header: '',
      icon: 'edit',
    }, {
      name: 'delete',
      header: '',
      icon: 'delete',
    },
  ];


  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onAction({ action, caracter }: { action: string, caracter: Caracter }) {
    switch (action) {
      case 'delete':
        this.deleteCaracter(caracter._id);
        break;

      case 'edit':
        this.editCaracter(caracter._id);
        break;

      default:
        break;
    }
  }

  newCaracter() {
    this.router.navigate(['caracter-create']);
  }

  deleteCaracter(id: string) {
    this.store.dispatch(new CaracterPageDelete(id));
  }

  editCaracter(id: string) {
    this.router.navigate(['caracter-edit', id]);
  }

}
