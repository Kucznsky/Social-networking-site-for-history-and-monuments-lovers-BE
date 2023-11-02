import { Test, TestingModule } from '@nestjs/testing';
import { LikeFactoryService } from './like-factory.service';

describe('LikeFactoryService', () => {
  let service: LikeFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeFactoryService],
    }).compile();

    service = module.get<LikeFactoryService>(LikeFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
