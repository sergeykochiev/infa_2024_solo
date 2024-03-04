import { Test, TestingModule } from '@nestjs/testing';
import { UserUidService } from './useruid.service';

describe('UidService', () => {
  let service: UserUidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUidService],
    }).compile();

    service = module.get<UserUidService>(UserUidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
