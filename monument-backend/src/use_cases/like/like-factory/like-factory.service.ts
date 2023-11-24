import { Injectable } from '@nestjs/common';
import { LikeDto } from 'src/core/dtos/like/like.dto';
import { Like } from 'src/core/entities/like.entity';

@Injectable()
export class LikeFactoryService {
    createLikeObject(likeDto: LikeDto): Like {
        const like = new Like();
        like.user = likeDto.userId;
        like.post = likeDto.postId;
        return like;
    }
}
