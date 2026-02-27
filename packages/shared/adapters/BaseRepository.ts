import type { THttpResponse } from "../types";

export interface IBaseRepository<T, K> {
    findById(id: string): Promise<K | null>;
    update(id: string, data: Partial<T>): Promise<K>
    create(data: T): Promise<K>
    delete(id: string): Promise<void>
} 