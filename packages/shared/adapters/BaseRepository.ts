export interface IBaseRepository<T> {
    findById(id: string): Promise<T>;
    update(id: string, data: Partial<T>): Promise<void>
    create(data: T): Promise<void>
    delete(id: string): Promise<void>
} 