import { PaginationDto } from './dto/pagination.dto';

export const getPaginationProps = (paginationDto: PaginationDto) => {
  if (Object.keys(paginationDto).length === 0) {
    return {
      page: 1,
      limit: 20,
      skippedItems: 0,
    };
  }

  const page = Number(paginationDto.page);
  const limit = Number(paginationDto.limit);
  const skippedItems = (page - 1) * limit;

  return {
    page,
    limit: limit > 20 ? 20 : limit,
    skippedItems,
  };
};
