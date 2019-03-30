import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState, } from 'src/app/store';
import { Caracter } from 'src/app/model/caracter.model';
import { CaracterPageDelete } from 'src/app/store/caracter-page/caracter-page.actions';
import { Action } from '../caracter-table/caracter-table.component';

@Component({
  selector: 'app-caracter-list',
  templateUrl: './caracter-list.component.html',
  styleUrls: ['./caracter-list.component.css']
})
export class CaracterListComponent implements OnInit {

  columns = ['name', 'hp', 'ca', 'dext_mod', 'strength_mod', 'edit', 'delete'];
  actions: Action[] = [
    new Action('edit', '', 'edit'),
    new Action('delete', '', 'delete'),
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
