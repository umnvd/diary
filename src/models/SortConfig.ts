export interface SortOption {
    title: string;
    value: string;
}

export const sortOptions: SortOption[] = [
    {title: 'По заголовку', value: 'title'},
    {title: 'По дате создания', value: 'ts'},
];

export default interface SortConfig {
    option: string;
    order: boolean; // true - ascending, false - descending
}