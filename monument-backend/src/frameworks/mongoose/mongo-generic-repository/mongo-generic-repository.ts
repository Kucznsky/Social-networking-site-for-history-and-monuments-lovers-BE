import { Model } from "mongoose";
import { IGenericRepository } from "src/core/abstracts/generic-repository.abstract";

export class MongoGenericRepository<T> implements IGenericRepository<T> {
    private model: Model<T>;
    private _populateOnFind: string[];
  
    constructor(repository: Model<T>, populateOnFind: string[] = []) {
      this.model = repository;
      this._populateOnFind = populateOnFind;
    }
  
    getAll(): Promise<T[]> {
      return this.model.find().populate(this._populateOnFind).exec();
    }
  
    get(id: string): Promise<T> {
      return this.model.findById(id).populate(this._populateOnFind).exec() as Promise<T>;
    }
  
    create(item: T): Promise<T> {
      return this.model.create(item);
    }
  
    update(id: string, item: T) {
      return this.model.findByIdAndUpdate(id, item);
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
  }