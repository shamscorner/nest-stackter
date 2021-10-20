import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(categoryId: number) {
    super(`Category with id ${categoryId} not found`);
  }
}
