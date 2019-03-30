import { Caracter } from './caracter.model';

export interface Group {
    _id?: string;
    name: string;
    members: Caracter[];
}