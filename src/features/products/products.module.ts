import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './commands/handlers/create-product.handler';
import { FindAllProductsHandler } from './queries/handlers/find-all-products.handler';
import { FindProductHandler } from './queries/handlers/find-product.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CqrsModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CreateProductHandler,
    FindAllProductsHandler,
    FindProductHandler,
  ],
})
export class ProductsModule {}
