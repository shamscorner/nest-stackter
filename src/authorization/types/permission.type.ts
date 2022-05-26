import { CategoriesPermission } from '../../features/categories/enums/categoriesPermission.enum';
import { ProductsPermission } from '../../features/products/enums/productsPermission.enum';

export const Permission = {
  ...ProductsPermission,
  ...CategoriesPermission,
};

export type Permission = ProductsPermission | CategoriesPermission;
