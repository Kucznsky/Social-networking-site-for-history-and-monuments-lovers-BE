import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('like')
@UseGuards(AuthGuard('jwt'))
export class LikeController {}
