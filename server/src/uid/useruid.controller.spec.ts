import { Test, TestingModule } from '@nestjs/testing';
import { UserUidController } from './useruid.controller';

describe('UserUidController', () => {
  let controller: UserUidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserUidController],
    }).compile();

    controller = module.get<UserUidController>(UserUidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
