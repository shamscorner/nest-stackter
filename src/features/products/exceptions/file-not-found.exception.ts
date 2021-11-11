import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(fileId: string) {
    super(`Product with id ${fileId} not found`);
  }
}
