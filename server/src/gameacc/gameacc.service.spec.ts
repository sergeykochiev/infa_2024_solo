import { Test, TestingModule } from '@nestjs/testing';
import { GameAccountService } from './gameacc.service';

describe('UidService', () => {
  let service: GameAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameAccountService],
    }).compile();

    service = module.get<GameAccountService>(GameAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
