export abstract class IGenericRepository<T> {
    abstract getAll();
    abstract get(id: string): Promise<T>;
    abstract create(item: T): Promise<T>;
    abstract update(id: string, item: T): Promise<T>;
    abstract delete(id: string);
  }