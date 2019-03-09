import { Action } from '@ngrx/store';
import { CaracterGroup } from 'src/app/model/caracter-group.model';

export enum GroupCreateActionTypes {
  Set = '[GroupCreate] Set Group',
  Reset = '[GroupCreate] Reset Form',
}

export class GroupCreateSet implements Action {
  readonly type = GroupCreateActionTypes.Set;
  constructor(
    public payload: Partial<CaracterGroup>,
  ) { }
}

export class GroupCreateReset implements Action {
  readonly type = GroupCreateActionTypes.Reset;
}

export type GroupCreateActions = GroupCreateSet | GroupCreateReset;

