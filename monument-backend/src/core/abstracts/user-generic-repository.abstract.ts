import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IUserGenericRepository<T> extends IGenericRepository<T>{
    abstract getByEmail(email: string): Promise<T>;
  }