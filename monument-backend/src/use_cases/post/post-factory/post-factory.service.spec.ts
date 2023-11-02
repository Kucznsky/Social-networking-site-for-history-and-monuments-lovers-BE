import { Test, TestingModule } from '@nestjs/testing';
import { PostFactoryService } from './post-factory.service';

describe('PostFactoryService', () => {
  let service: PostFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostFactoryService],
    }).compile();

    service = module.get<PostFactoryService>(PostFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
