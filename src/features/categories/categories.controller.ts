import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { FindOneParams } from '../../utils/dto/find-one-params.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('categories')
@ApiExtraModels(FindOneParams)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoriesService.create(category);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/with-deleted')
  findAllWithDeleted() {
    return this.categoriesService.findAllWithDeleted();
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() { id }: FindOneParams, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.update(+id, category);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    return this.categoriesService.remove(+id);
  }

  @Post(':id/restore')
  restoreDeleted(@Param() { id }: FindOneParams) {
    return this.categoriesService.restoreDeleted(+id);
  }
}
