import { Action } from '@ngrx/store';
import { Caracter } from 'src/app/model/caracter.model';

export enum CaracterCreateActionTypes {
  Set = '[CaracterCreate] Set Caracter',
  Reset = '[CaracterCreate] Reset Form',
  Save = '[CaracterCreate] Save Caracter',
}

export class CaracterCreateSet implements Action {
  readonly type = CaracterCreateActionTypes.Set;
  constructor(
    public payload: Partial<Caracter>,
  ) { }
}

export class CaracterCreateReset implements Action {
  readonly type = CaracterCreateActionTypes.Reset;
}

export class CaracterCreateSave implements Action {
  readonly type = CaracterCreateActionTypes.Save;
  constructor(
    public payload: Caracter
  ) { }
}

export type CaracterCreateAction = CaracterCreateSet | CaracterCreateReset | CaracterCreateSave;
