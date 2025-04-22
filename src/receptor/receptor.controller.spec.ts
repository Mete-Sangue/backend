import { Test, TestingModule } from '@nestjs/testing';
import { ReceptorController } from './receptor.controller';
import { ReceptorService } from './receptor.service';

describe('ReceptorController', () => {
  let controller: ReceptorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptorController],
      providers: [ReceptorService],
    }).compile();

    controller = module.get<ReceptorController>(ReceptorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
