import { Test, TestingModule } from '@nestjs/testing';
import { AutomobilesService } from './automobiles.service';

describe('AutomobilesService', () => {
  let service: AutomobilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomobilesService],
    }).compile();

    service = module.get<AutomobilesService>(AutomobilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
