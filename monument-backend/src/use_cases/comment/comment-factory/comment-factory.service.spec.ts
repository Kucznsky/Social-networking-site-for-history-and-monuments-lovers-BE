import { Test, TestingModule } from '@nestjs/testing';
import { CommentFactoryService } from './comment-factory.service';

describe('CommentFactoryService', () => {
  let service: CommentFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentFactoryService],
    }).compile();

    service = module.get<CommentFactoryService>(CommentFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
