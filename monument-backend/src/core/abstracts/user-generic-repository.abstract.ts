export abstract class IUserGenericRepository<T> {
    abstract getAll();
    abstract getById(id: string): Promise<T>;
    abstract getByEmail(email: string): Promise<T>;
    abstract create(item: T): Promise<T>;
    abstract update(id: string, item: T): Promise<T>;
    abstract delete(id: string);
  }