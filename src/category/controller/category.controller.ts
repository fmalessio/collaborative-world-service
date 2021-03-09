import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Category } from '../entity/category.entity';
import { CategoryService } from '../service/category.service';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get('all')
    getAll(@Res() res: Response) {
        this.categoryService.getAll()
            .then((data: Category[]) => res.status(HttpStatus.OK).json(data))
            .catch(error => { return Promise.reject(new BadRequestException(error)) });
    }

    @Post()
    save(@Body() category: Category, @Res() res: Response) {
        this.categoryService.save(category)
            .then((data: Category) => res.status(HttpStatus.OK).json(data))
            .catch(error => { return Promise.reject(new BadRequestException(error)) });
    }

}
