import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../service/category.service';
import { CategoryController } from './category.controller';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        { provide: CategoryService, useValue: {} }
      ]
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
