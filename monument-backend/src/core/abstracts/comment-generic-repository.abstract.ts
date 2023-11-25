import { IGenericRepository } from "./generic-repository.abstract";

export abstract class ICommentGenericRepository<T> extends IGenericRepository<T>{
    abstract getByPostId(postId: string);
}