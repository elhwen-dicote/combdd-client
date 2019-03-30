import { Action } from '@ngrx/store';
import { Group, Page, PageRequest } from 'src/app/model';

export enum ActionTypes {
  Load = '[GroupPage] Start Loading GroupPage',
  LoadSuccess = '[GroupPage] Load GroupPage Success',
  LoadFailure = '[GroupPage] Load GroupPage Failure',
  LoadRequest = '[GroupPage] Request Loading GroupPage',
  Delete = '[Group Page] Delete Group',
  DeleteSuccess = '[Group Page] DeleteGroup Success',
  DeleteFailure = '[Group Page] DeleteGroup Failure',
}

export class Load implements Action {
  readonly type = ActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ActionTypes.LoadSuccess;
  constructor(
    public payload: Page<Group>,
  ) { }
}

export class LoadFailure implements Action {
  readonly type = ActionTypes.LoadFailure;
  constructor(
    public payload: any,
  ) { }
}

export class LoadRequest implements Action {
  readonly type = ActionTypes.LoadRequest;
  constructor(
    public payload: PageRequest,
  ) { }
}

export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(
    public payload: string,
  ) { }
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(
    public payload: string,
  ) { }
}

export class DeleteFailure implements Action {
  readonly type = ActionTypes.DeleteFailure;
  constructor(
    public payload: any,
  ) { }
}

export type AnyAction = LoadRequest | Load | LoadSuccess | LoadFailure | Delete | DeleteSuccess | DeleteFailure;
