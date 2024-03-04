import { Test, TestingModule } from '@nestjs/testing';
import { GameAccountController } from './gameacc.controller';

describe('GameAccountController', () => {
  let controller: GameAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameAccountController],
    }).compile();

    controller = module.get<GameAccountController>(GameAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
