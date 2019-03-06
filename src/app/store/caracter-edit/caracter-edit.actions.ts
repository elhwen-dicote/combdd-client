import { Action } from '@ngrx/store';
import { Caracter } from 'src/app/model/caracter.model';

export enum CaracterEditActionTypes {
  Load = '[CaracterEdit] Load Caracter',
  LoadSuccess = '[CaracterEdit] Load Caracter Success',
  Save = '[CaracterEdit] Save Caracter',
}

export class CaracterEditLoad implements Action {
  readonly type = CaracterEditActionTypes.Load;
  constructor(
    public payload: string,
  ) { }
}

export class CaracterEditLoadSuccess implements Action {
  readonly type = CaracterEditActionTypes.LoadSuccess;
  constructor(
    public payload: Caracter,
  ) { }
}

export class CaracterEditSave implements Action {
  readonly type = CaracterEditActionTypes.Save;
  constructor(
    public payload: Caracter,
  ) { }
}


export type CaracterEditActions = CaracterEditLoad | CaracterEditLoadSuccess | CaracterEditSave;
