import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState, CaracterPage, } from 'src/app/store';
import { Caracter } from 'src/app/model/caracter.model';
import { TableAction } from 'src/app/util/table-action';

@Component({
  selector: 'app-caracter-list',
  templateUrl: './caracter-list.component.html',
  styleUrls: ['./caracter-list.component.css']
})
export class CaracterListComponent implements OnInit {

  columns = ['name', 'hp', 'ca', 'dext_mod', 'strength_mod', 'edit', 'delete'];
  actions: TableAction<Caracter>[] = [
    new TableAction<Caracter>('edit', '', 'edit'),
    new TableAction<Caracter>('delete', '', 'delete'),
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
    this.store.dispatch(new CaracterPage.actions.Delete(id));
  }

  editCaracter(id: string) {
    this.router.navigate(['caracter-edit', id]);
  }

}
