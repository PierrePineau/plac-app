interface CrudInterface<T> {
    data: T[] | [];
    fetchData: (filters: any) => Promise<void>;
    getOneById: (id: string | number) => T | undefined;
    create: (data: Partial<T>) => Promise<T | null>;
    update: (id: number | string, data: Partial<T>) => Promise<T | null>;
    delete: (id: number | string) => Promise<void>;
}