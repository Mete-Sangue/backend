import { Test, TestingModule } from '@nestjs/testing';
import { ReceptorService } from './receptor.service';

describe('ReceptorService', () => {
  let service: ReceptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceptorService],
    }).compile();

    service = module.get<ReceptorService>(ReceptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
