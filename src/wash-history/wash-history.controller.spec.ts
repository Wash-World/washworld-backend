import { Test, TestingModule } from '@nestjs/testing';
import { WashHistoryController } from './wash-history.controller';

describe('WashHistoryController', () => {
  let controller: WashHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashHistoryController],
    }).compile();

    controller = module.get<WashHistoryController>(WashHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
