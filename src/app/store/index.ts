import { CaracterPageEffects } from './caracter-page/caracter-page.effects';
import { CaracterCreateEffects } from './caracter-create/caracter-create.effects';
import { CaracterEditEffects } from './caracter-edit/caracter-edit.effects';
import { GroupCreateEffects } from './group-create/group-create.effects';
import { GroupPageEffects } from './group-page/group-page.effects';
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
