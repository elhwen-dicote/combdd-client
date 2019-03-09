import { Caracter } from './caracter.model';

export interface CaracterGroup {
    id?: string;
    name: string;
    members: Caracter[];
}