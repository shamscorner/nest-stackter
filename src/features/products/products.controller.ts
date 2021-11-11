import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthenticationGuard } from '../../authentication/jwt-authentication.guard';
import { RequestWithUser } from '../../authentication/request-with-user.interface';
import { GetProductDto } from './dto/get-product.dto';
import { PaginatedResultDto } from '../../utils/dto/paginated-result.dto';
import { Product } from './entities/product.entity';

@Controller('products')
@UseGuards(JwtAuthenticationGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: RequestWithUser,
  ): Promise<Product> {
    const user = request.user;
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  async findAll(
    @Query() { ownerId, page = 1, limit = 20 }: GetProductDto,
  ): Promise<PaginatedResultDto<Product>> {
    return this.productsService.findAll(ownerId, { page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() request: RequestWithUser,
  ) {
    const user = request.user;
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
