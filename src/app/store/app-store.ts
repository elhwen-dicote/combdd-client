import { MetaReducer, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import * as _CaracterPage from './caracter-page';
import * as _CaracterCreate from './caracter-create';
import * as _CaracterEdit from './caracter-edit';
import * as _GroupPage from './group-page/';
import * as _GroupCreate from './group-create';
import * as _GroupEdit from './group-edit';

export interface AppState {
  caracterPage: _CaracterPage.State;
  caracterCreate: _CaracterCreate.State;
  caracterEdit: _CaracterEdit.State;
  groupCreate: _GroupCreate.State;
  groupPage: _GroupPage.State;
  groupEdit: _GroupEdit.State;
}

export const reducers: ActionReducerMap<AppState> = {
  caracterPage: _CaracterPage.reducer,
  caracterCreate: _CaracterCreate.reducer,
  caracterEdit: _CaracterEdit.reducer,
  groupCreate: _GroupCreate.reducer,
  groupPage: _GroupPage.reducer,
  groupEdit: _GroupEdit.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export namespace CaracterPage {
  export namespace actions {
    export import ActionTypes = _CaracterPage.ActionTypes;
    export import LoadRequest = _CaracterPage.LoadRequest;
    export import Load = _CaracterPage.Load;
    export import LoadSuccess = _CaracterPage.LoadSuccess;
    export import LoadFailure = _CaracterPage.LoadFailure;
    export import Delete = _CaracterPage.Delete;
    export import DeleteSuccess = _CaracterPage.DeleteSuccess;
    export import DeleteFailure = _CaracterPage.DeleteFailure;
  }
  export namespace selectors {
    const selectCaracterPage = createFeatureSelector<AppState, _CaracterPage.State>('caracterPage');
    export const selectCaracters = createSelector(selectCaracterPage, _CaracterPage.selectors.caracters);
    export const selectLoading = createSelector(selectCaracterPage, _CaracterPage.selectors.loading);
    export const selectMeta = createSelector(selectCaracterPage, _CaracterPage.selectors.meta);
    export const selectPage = createSelector(selectCaracterPage, _CaracterPage.selectors.page);
    export const selectRequest = createSelector(selectCaracterPage, _CaracterPage.selectors.request);
  }
}

export namespace CaracterCreate {
  export namespace actions {
    export import ActionTypes = _CaracterCreate.ActionTypes;
    export import Set = _CaracterCreate.Set;
    export import Reset = _CaracterCreate.Reset;
    export import Save = _CaracterCreate.Save;
  }
  export namespace selectors {
    const selectCaracterCreate = createFeatureSelector<AppState, _CaracterCreate.State>('caracterCreate');
    export const selectCaracter = createSelector(selectCaracterCreate, _CaracterCreate.selectors.caracter);
  }
}

export namespace CaracterEdit {
  export namespace actions {
    export import ActionTypes = _CaracterEdit.ActionTypes;
    export import Load = _CaracterEdit.Load;
    export import LoadSuccess = _CaracterEdit.LoadSuccess;
    export import Save = _CaracterEdit.Save;
  }
  export namespace selectors {
    const selectCaracterEdit = createFeatureSelector<AppState, _CaracterEdit.State>('caracterEdit');
    export const selectCaracter = createSelector(selectCaracterEdit, _CaracterEdit.selectors.caracter);
  }
}

export namespace GroupPage {

  // group-page actions
  export namespace actions {
    export import ActionTypes = _GroupPage.ActionTypes;
    export import LoadRequest = _GroupPage.LoadRequest;
    export import Load = _GroupPage.Load;
    export import LoadSuccess = _GroupPage.LoadSuccess;
    export import LoadFailure = _GroupPage.LoadFailure;
    export import Delete = _GroupPage.Delete;
    export import DeleteSuccess = _GroupPage.DeleteSuccess;
    export import DeleteFailure = _GroupPage.DeleteFailure;
  }

  // group-page selectors
  export namespace selectors {
    const selectGroupPage = createFeatureSelector<AppState, _GroupPage.State>('groupPage');
    export const selectLoading = createSelector(selectGroupPage, _GroupPage.selectors.loading);
    export const selectRequest = createSelector(selectGroupPage, _GroupPage.selectors.request);
    export const selectGroups = createSelector(selectGroupPage, _GroupPage.selectors.groups);
    export const selectMeta = createSelector(selectGroupPage, _GroupPage.selectors.meta);
  }

}

export namespace GroupCreate {

  // group-create actions
  export namespace actions {
    export import ActionTypes = _GroupCreate.ActionTypes;
    export import Set = _GroupCreate.Set;
    export import Reset = _GroupCreate.Reset;
    export import Save = _GroupCreate.Save;
  }

  // group-create selectors
  export namespace selectors {
    const selectGroupCreate = createFeatureSelector<AppState, _GroupCreate.State>('groupCreate');
    export const selectGroup = createSelector(selectGroupCreate, _GroupCreate.selectors.group);
    export const selectMembers = createSelector(selectGroupCreate, _GroupCreate.selectors.members);
  }
}

export namespace GroupEdit {
  export namespace actions {
    export import ActionTypes = _GroupEdit.ActionTypes;
    export import Load = _GroupEdit.Load;
    export import LoadSuccess = _GroupEdit.LoadSuccess;
    export import Save = _GroupEdit.Save;
  }
  export namespace selectors {
    const selectGroupEdit = createFeatureSelector('groupEdit');
    export const selectGroup = createSelector(selectGroupEdit, _GroupEdit.selectors.group);
  }
}

