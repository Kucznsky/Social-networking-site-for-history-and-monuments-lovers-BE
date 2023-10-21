import { Post } from "../entities/post.entity";

export abstract class ICRMServices {
    abstract postAdded(post: Post): Promise<boolean>;
  }