import { Model } from "mongoose";
import { IUserGenericRepository } from "src/core/abstracts/user-generic-repository.abstract";

export class MongoUserGenericRepository<T> implements IUserGenericRepository<T> {
    private model: Model<T>;
    private _populateOnFind: string[];
  
    constructor(repository: Model<T>, populateOnFind: string[] = []) {
      this.model = repository;
      this._populateOnFind = populateOnFind;
    }
  
    getAll(){
      return this.model.find().populate(this._populateOnFind).exec();
    }
  
    getById(id: string): Promise<T> {
      return this.model.findById(id).populate(this._populateOnFind).exec() as Promise<T>;
    }

    getByEmail(userEmail: string): Promise<T> {
        return this.model.findOne({email: userEmail}).populate(this._populateOnFind).exec() as Promise<T>;
    }

    getByUserName(userName: string): Promise<T> {
      return this.model.findOne({userName: userName}).populate(this._populateOnFind).exec() as Promise<T>;
    }

    create(item: T): Promise<T> {
      return this.model.create(item);
    }
  
    update(id: string, item: T): Promise<T> {
      return this.model.findByIdAndUpdate(id, item).exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id).exec();
    }
  }