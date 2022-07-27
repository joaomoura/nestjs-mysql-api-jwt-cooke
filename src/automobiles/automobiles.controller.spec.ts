import { Test, TestingModule } from '@nestjs/testing';
import { AutomobilesController } from './automobiles.controller';
import { AutomobilesService } from './automobiles.service';

describe('AutomobilesController', () => {
  let controller: AutomobilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomobilesController],
      providers: [AutomobilesService],
    }).compile();

    controller = module.get<AutomobilesController>(AutomobilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
