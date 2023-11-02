import { Test, TestingModule } from '@nestjs/testing';
import { UserFactoryService } from './user-factory.service';

describe('UserFactoryService', () => {
  let service: UserFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFactoryService],
    }).compile();

    service = module.get<UserFactoryService>(UserFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
