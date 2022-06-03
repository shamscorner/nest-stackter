import { Test, TestingModule } from '@nestjs/testing';
import { OptimizeController } from './optimize.controller';

describe('OptimizeController', () => {
  let controller: OptimizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptimizeController],
    }).compile();

    controller = module.get<OptimizeController>(OptimizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
