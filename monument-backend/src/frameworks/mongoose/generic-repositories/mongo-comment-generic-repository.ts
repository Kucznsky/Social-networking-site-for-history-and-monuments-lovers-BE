import { Model } from "mongoose";
import { ICommentGenericRepository } from "src/core/abstracts/comment-generic-repository.abstract";

export class MongoCommentGenericRepository<T> implements ICommentGenericRepository<T> {
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

    getByPostId(postId: string): Promise<T> {
        return this.model.find({post: postId}).populate(this._populateOnFind).exec() as Promise<T>;
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