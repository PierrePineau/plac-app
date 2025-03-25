interface CrudInterface<T> {
    endpoint: string;
    data: T[];
    getEndpoint: (params?: any) => string;
    setEndpoint: (newEndpoint: string) => void;
    fetchData: (filters: any) => Promise<T[]>;
    getOneById: (id: string) => T | undefined;
    create: (item: Partial<T>) => Promise<T | null>;
    update: (id: string | number, item: Partial<T>) => Promise<T | null>;
    delete: (id: string | number) => Promise<void>;
}