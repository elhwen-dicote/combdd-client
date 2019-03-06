import { Caracter } from './caracter.model';

export interface CaracterPageMeta {
    filter: string;
    totalCount: number;
    pageOffset: number;
    pageSize: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc' | '';
    dataSize: number;
}

export interface CaracterPage {
    page: Caracter[];
    meta: CaracterPageMeta;
}

export class CaracterPageRequest {
    constructor(
        public filter: string = '',
        public pageOffset: number = 0,
        public pageSize: number = 0,
        public sortBy: string = '',
        public sortOrder: 'asc' | 'desc' | '' = 'asc',
    ) { }

    buildIndex() {
        return [
            this.filter,
            this.pageOffset,
            this.pageSize,
            this.sortBy,
            this.sortOrder
        ].join('\u0000');
    }

    static readIndex(index: string): CaracterPageRequest {
        const [filter, pageOffset, pageSize, sortBy, sortOrder] = index.split('\u{0000}');
        return new CaracterPageRequest(
            filter,
            parseInt(pageOffset, 10),
            parseInt(pageSize, 10),
            sortBy,
            ((sortOrder === 'desc') ? 'desc' : (sortOrder === 'asc') ? 'asc' : ''),
        );
    }
}
