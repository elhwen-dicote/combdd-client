export interface PageMeta {
    filter: string;
    totalCount: number;
    pageOffset: number;
    pageSize: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc' | '';
    dataSize: number;
}

export interface Page<T> {
    page: T[];
    meta: PageMeta;
}
