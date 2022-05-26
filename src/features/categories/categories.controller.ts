import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Role } from '../../authorization/role.enum';
import { RoleGuard } from '../../authorization/role.guard';
import { FindOneParams } from '../../utils/dto/find-one-params.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('categories')
@ApiExtraModels(FindOneParams)
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
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
  @UseGuards(RoleGuard(Role.Admin))
  update(@Param() { id }: FindOneParams, @Body() category: UpdateCategoryDto) {
    return this.categoriesService.update(+id, category);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  remove(@Param() { id }: FindOneParams) {
    return this.categoriesService.remove(+id);
  }

  @Post(':id/restore')
  @UseGuards(RoleGuard(Role.Admin))
  restoreDeleted(@Param() { id }: FindOneParams) {
    return this.categoriesService.restoreDeleted(+id);
  }
}
