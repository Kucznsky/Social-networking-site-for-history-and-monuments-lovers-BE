import { Test, TestingModule } from '@nestjs/testing';
import { DataServiceService } from './data-service.service';

describe('DataServiceService', () => {
  let service: DataServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataServiceService],
    }).compile();

    service = module.get<DataServiceService>(DataServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
