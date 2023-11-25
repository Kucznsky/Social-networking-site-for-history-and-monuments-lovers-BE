import { IGenericRepository } from "./generic-repository.abstract";

export abstract class ILikeCommentGenericRepository<T> extends IGenericRepository<T>{
    abstract getByPostId(postId: string);
}