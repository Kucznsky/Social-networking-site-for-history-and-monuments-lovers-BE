import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { User } from "src/core/entities/user.entity";

@Injectable()

export class UserUseCase {
    constructor(
        private dataServices: IDataServices,
      ) {}

    register(user: User) {
        try {
            const createdPost = this.dataServices.users.create(user)
            return createdPost
        } catch (error) {
            throw error
        }
    };
}
