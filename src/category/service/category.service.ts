import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Category } from '../entity/category.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryTreeRepository: TreeRepository<Category>,
    ) { }

    getAll(): Promise<Category[]> {
        return this.categoryTreeRepository.findTrees();
    }

    save(category: Category) {
        return this.categoryTreeRepository.save(category);
    }
}
