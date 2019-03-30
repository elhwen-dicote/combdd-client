import {
  createFeatureSelector,
  createSelector} from '@ngrx/store';
import { State as CaracterPageState, selectCaracterPageCaracters, selectCaracterPageTotalCount, selectCaracterPageStale, selectCaracterPageMeta } from './caracter-page/caracter-page.reducer';
import { CaracterPageEffects } from './caracter-page/caracter-page.effects';
import { State as CaracterCreateState, selectCaracterCreateCaracter } from './caracter-create/caracter-create.reducer';
import { CaracterCreateEffects } from './caracter-create/caracter-create.effects';
import { State as CaracterEditState, selectCaracterEditCaracter } from './caracter-edit/caracter-edit.reducer';
import { CaracterEditEffects } from './caracter-edit/caracter-edit.effects';
import { GroupCreateEffects } from './group-create/group-create.effects';
import * as _GroupPage from './group-page/';
import { GroupPageEffects } from './group-page/group-page.effects';
import * as appStore from './app-store';
import { GroupEditEffects } from './group-edit/group-edit.effects';

export * from './app-store';

export const effects = [
  CaracterPageEffects,
  CaracterCreateEffects,
  CaracterEditEffects,
  GroupCreateEffects,
  GroupPageEffects,
  GroupEditEffects,
];

// caracter-page actions
export { CaracterPageLoad, } from './caracter-page/caracter-page.actions';

// caracter-page selectors
const selectCaracterPage = createFeatureSelector<appStore.AppState, CaracterPageState>('caracterPage');
export const caracterPageCaracters = createSelector(
  selectCaracterPage,
  selectCaracterPageCaracters);
export const caracterPageTotalCount = createSelector(
  selectCaracterPage,
  selectCaracterPageTotalCount,
);
export const caracterPageStale = createSelector(
  selectCaracterPage,
  selectCaracterPageStale,
);
export const caracterPageMeta = createSelector(
  selectCaracterPage,
  selectCaracterPageMeta,
);


// caracter-create actions
export { CaracterCreateSet, CaracterCreateReset, CaracterCreateSave } from './caracter-create/caracter-create.actions';

// caracter-create selectors
const selectCaracterCreate = createFeatureSelector<appStore.AppState, CaracterCreateState>('caracterCreate');
export const caracterCreateCaracter = createSelector(
  selectCaracterCreate,
  selectCaracterCreateCaracter,
);

// caracter-edit actions
export { CaracterEditLoad, CaracterEditLoadSuccess } from './caracter-edit/caracter-edit.actions'

// caracter-edit selectors
const selectCaracterEdit = createFeatureSelector<appStore.AppState, CaracterEditState>('caracterEdit');
export const caracterEditCaracter = createSelector(
  selectCaracterEdit,
  selectCaracterEditCaracter,
);
