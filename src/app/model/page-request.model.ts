export class PageRequest {
    constructor(
        public filter: string = '',
        public pageOffset: number = 0,
        public pageSize: number = 3,
        public sortBy: string = '',
        public sortOrder: 'asc' | 'desc' | '' = '',
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

    static readIndex(index: string): PageRequest {
        const [filter, pageOffset, pageSize, sortBy, sortOrder] = index.split('\u{0000}');
        return new PageRequest(
            filter,
            parseInt(pageOffset, 10),
            parseInt(pageSize, 10),
            sortBy,
            ((sortOrder === 'desc') ? 'desc' : (sortOrder === 'asc') ? 'asc' : ''),
        );
    }

}

export const defaultPageRequest = new PageRequest();
